import NewsletterTemplate from './newsletter'
import PostChristmasTemplate from './post-christmas'
import PromotionalTemplate from './promotional'

const templateMap: Record<string, React.FC> = {
  newsletter: NewsletterTemplate,
  promotional: PromotionalTemplate,
  postChristmas: PostChristmasTemplate
}

export default templateMap
