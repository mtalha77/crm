import NewsletterTemplate from '../pages/templates/newsletter'
import PostChristmasTemplate from '../pages/templates/postChristmas'

import PromotionalTemplate from '../pages/templates/promotional'

const templateMap: Record<string, React.FC> = {
  newsletter: NewsletterTemplate,
  promotional: PromotionalTemplate,
  postChristmas: PostChristmasTemplate
}

export default templateMap
