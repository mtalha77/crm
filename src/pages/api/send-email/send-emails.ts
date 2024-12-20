import { NextApiRequest, NextApiResponse } from 'next/types'
import sgMail from '@sendgrid/mail'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import templateMap from 'src/layouts/templateMap'
import EmailLogModel from 'src/backend/schemas/emailLog.schema'
import BusinessModel from 'src/backend/schemas/business.schema'
import templateMetadata from 'src/layouts/templateMetadata'

// Define the type of the template names
type TemplateName = keyof typeof templateMetadata

// Load the SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const loadReactTemplate = (templateName: TemplateName, salutation: string) => {
  try {
    const TemplateComponent = templateMap[templateName]

    if (!TemplateComponent) {
      throw new Error(`Template ${templateName} not found`)
    }

    // Convert the React component to HTML, including the salutation
    return ReactDOMServer.renderToString(React.createElement(TemplateComponent, { salutation }))
  } catch (error: any) {
    console.error(`Failed to load template ${templateName}:`, error.message)
    throw new Error(`Template ${templateName} not found or failed to load`)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { recipients, template } = req.body

      // Validate inputs
      if (!recipients || !Array.isArray(recipients) || !template || !(template in templateMetadata)) {
        return res.status(400).json({ message: 'Invalid data or template' })
      }

      const emailPromises = recipients.map(async (recipient: { business_name?: string; business_email: string }) => {
        try {
          // Use "Dear," if business_name is not provided
          const salutation = recipient.business_name ? `Dear ${recipient.business_name},` : 'Dear,'

          // Load and render the React template to HTML with salutation
          const templateContent = loadReactTemplate(template as TemplateName, salutation)

          // Send the email
          await sgMail.send({
            to: recipient.business_email,
            from: process.env.SENDGRID_FROM_EMAIL || '',
            subject: templateMetadata[template as TemplateName]?.subject || `Exclusive Update: ${template}`,
            html: templateContent
          })

          // Log the template in EmailLogModel
          const businessRecord = await BusinessModel.findOne({ business_email: recipient.business_email })
          const isExternal = !businessRecord

          await EmailLogModel.create({
            business_id: isExternal ? null : businessRecord._id,
            email: recipient.business_email,
            is_external: isExternal,
            sent_templates: [{ template_name: template, sent_at: new Date() }]
          })
        } catch (logError: any) {
          console.error(`Failed to log email for ${recipient.business_email}:`, logError.message)
        }
      })

      await Promise.all(emailPromises)

      return res.status(200).json({ message: 'Emails sent and logged successfully!' })
    } catch (error: any) {
      console.error('Error sending emails:', error.message)

      return res.status(500).json({ message: 'Failed to send emails', error: error.message })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
