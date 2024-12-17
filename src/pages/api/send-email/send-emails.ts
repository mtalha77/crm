import { NextApiRequest, NextApiResponse } from 'next/types'
import sgMail from '@sendgrid/mail'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import templateMap from 'src/pages/templates/templateMap'

// Load the SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const loadReactTemplate = (templateName: string, props: any = {}) => {
  try {
    const TemplateComponent = templateMap[templateName]

    if (!TemplateComponent) {
      throw new Error(`Template ${templateName} not found`)
    }

    // Convert the React component to HTML
    return ReactDOMServer.renderToString(React.createElement(TemplateComponent, props))
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
      if (!recipients || !Array.isArray(recipients) || !template) {
        return res.status(400).json({ message: 'Invalid data or template' })
      }

      // Load and render the React template to HTML
      const templateContent = loadReactTemplate(template)

      // Map emails with the rendered HTML content
      const emails = recipients.map(business => ({
        to: business.business_email,
        from: process.env.SENDGRID_FROM_EMAIL || '',
        subject: `Exclusive Update: ${template}`,
        html: `
          <p>Dear ${business.business_name},</p>
          ${templateContent}
          <p>Best regards,<br>RankOrbit Team</p>
        `
      }))

      // Send emails
      await Promise.all(emails.map(email => sgMail.send(email)))

      return res.status(200).json({ message: 'Emails sent successfully!' })
    } catch (error: any) {
      console.error('Error sending emails:', error.message)

      return res.status(500).json({ message: 'Failed to send emails', error: error.message })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
