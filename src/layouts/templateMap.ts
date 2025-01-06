import christmasTemplate from '../pages/view-email-logs/templates/christmas'
import NewYearTemplate from 'src/pages/view-email-logs/templates/newYear'

// Define the type for templates with the salutation prop
type TemplateWithProps = (props: { salutation: string }) => JSX.Element

const templateMap: Record<string, TemplateWithProps> = {
  newYear: NewYearTemplate,
  christmas: christmasTemplate
}

export default templateMap
