export enum LocalSeoWorkStatus {
  GMB_FULL_OPTIMIZATION = 'Gmb Full Optimization',
  GMB_OFF_PAGE = 'Gmb Off Page',
  PAID_CITATIONS = 'Paid Citations',
  GEO_FENCING = 'Geo Fencing',
  Google_STACKING = 'Google Stacking',
  Google_GUARANTEE = 'Google Guarantee'
}

export enum PaidMarketingWorkStatus {
  FACEBOOK = 'Facebook',
  GOOGLE = 'Google',
  OTHERS = 'Others'
}

export enum SocialMediaWorkStatus {
  NO_OF_GOOGLE_REVIEWS = 'No of Google Reviews',
  NO_OF_FACEBOOK_REVIEWS = 'No of Facebook Reviews',
  LIKES_FOLLOWERS = 'Likes/Followers',
  NO_OF_GMB_REVIEWS = 'No of GMB Reviews',
  FACEBOOK_POSTING = 'Facebook Posting',
  INSTAGRAM_POSTING = 'Instagram Posting',
  OTHERS_POSTING = 'Others Posting',
  VIDEO_CREATION = 'Video Creation',
  SMO_PACKAGE = 'SMO Package'
}

export enum WebSeoWorkStatus {
  ON_PAGE = 'On Page',
  BACK_LINKS = 'Backlinks',
  EXTRA_LINKS = 'Extra Backlinks',
  PAID_GUEST_POSTING = 'Paid Guest Posting',
  MONTHLY_SEO = 'Monthly SEO'
}

export enum WordPressWorkStatus {
  ECOMMERCE = 'E-Commerce',
  REDESIGN_WEBSITE = 'Redesign Website',
  ON_PAGE_WEBSITE = 'One Page Website',
  FULL = 'Full Website',
  BUY_DOMAIN_HOSTING = 'Buy Domain/Hosting',
  LOGO_CREATION = 'Logo Creation'
}

export enum WriterWorkStatus {
  ON_PAGE = 'ON PAGE',
  BLOG = 'BLOG'
}

export enum CustomDevWorkStatus {
  SOFTWARE_DEVELOPMENT = 'Software Development',
  WEBSITE_DEVELOPMENT = 'Website Development',
  APP_DEVELOPMENT = 'App Development',
  CUSTOMIZATION = 'Customization',
  AUTOMATION = 'Automation'
}

export type WorkStatus =
  | LocalSeoWorkStatus
  | PaidMarketingWorkStatus
  | WordPressWorkStatus
  | WriterWorkStatus
  | SocialMediaWorkStatus
  | WebSeoWorkStatus
  | CustomDevWorkStatus

// Arrays for each enum
export const LocalSeoWorkStatusValues: LocalSeoWorkStatus[] = Object.values(LocalSeoWorkStatus)
export const PaidMarketingWorkStatusValues: PaidMarketingWorkStatus[] = Object.values(PaidMarketingWorkStatus)
export const SocialMediaWorkStatusValues: SocialMediaWorkStatus[] = Object.values(SocialMediaWorkStatus)
export const WebSeoWorkStatusValues: WebSeoWorkStatus[] = Object.values(WebSeoWorkStatus)
export const WordPressWorkStatusValues: WordPressWorkStatus[] = Object.values(WordPressWorkStatus)
export const WriterWorkStatusValues: WriterWorkStatus[] = Object.values(WriterWorkStatus)
export const CustomDevWorkStatusValues: CustomDevWorkStatus[] = Object.values(CustomDevWorkStatus)

export const WorkStatusValues: string[] = [
  ...LocalSeoWorkStatusValues,
  ...PaidMarketingWorkStatusValues,
  ...SocialMediaWorkStatusValues,
  ...WebSeoWorkStatusValues,
  ...WordPressWorkStatusValues,
  ...WriterWorkStatusValues,
  ...CustomDevWorkStatusValues
]
