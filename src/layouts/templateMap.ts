import christmasTemplate from '../pages/templates/christmas'
import NewYearTemplate from 'src/pages/templates/newYear'

// Define the type for templates with the salutation prop
type TemplateWithProps = (props: { salutation: string }) => JSX.Element

const templateMap: Record<string, TemplateWithProps> = {
  newYear: NewYearTemplate,
  christmas: christmasTemplate
}

export default templateMap
