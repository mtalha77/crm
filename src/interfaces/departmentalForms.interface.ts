import {
  LocalSeoDetails,
  PaidMarketingDetails,
  SocialMediaDetails,
  WebSeoDetails,
  WordPressDetails
} from './forms.interface'

export interface DTicketDetails {
  priority: string
  due_date: Date
}

export interface DLocalSeoFormType extends DTicketDetails {
  localSeoDetails: LocalSeoDetails
}

export interface DWordPressFormType extends DTicketDetails {
  wordPressDetails: WordPressDetails
}

export interface DWebSeoFormType extends DTicketDetails {
  webSeoDetails: WebSeoDetails
}

export interface DPaidMarketingFormType extends DTicketDetails {
  paidMarketingDetails: PaidMarketingDetails
}

export interface DSocialMediaFormType extends DTicketDetails {
  socialMediaFormTypeDetails: SocialMediaDetails
}

export const dLocalSeoDefaultValues: DLocalSeoFormType = {
  priority: '',
  due_date: new Date(),
  localSeoDetails: {
    notes: '',
    work_status: ''
  }
}

export const dWordPressDefaultValues: DWordPressFormType = {
  priority: '',
  due_date: new Date(),
  wordPressDetails: {
    service_name: '',
    service_area: '',
    referral_website: '',
    notes: '',
    work_status: ''
  }
}

export const dWebSeoDefaultValues: DWebSeoFormType = {
  priority: '',
  due_date: new Date(),
  webSeoDetails: {
    service_name: '',
    notes: '',
    work_status: '',
    service_location: '',
    key_words: '',
    login_credentials: '',
    console_access: '',
    analytics_access: '',
    no_of_backlinks: '',
    no_of_posts: '',
    no_of_blogs: ''
  }
}

export const dPaidMarketingDefaultValues: DPaidMarketingFormType = {
  priority: '',
  due_date: new Date(),
  paidMarketingDetails: {
    service_name: '',
    location: '',
    ad_account_access: '',
    budget: '',
    budget_price: 0,
    clients_objectives: '',
    notes: '',
    work_status: '',
    platform_name: ''
  }
}

export const dSocialMediaDefaultValues: DSocialMediaFormType = {
  priority: '',
  due_date: new Date(),
  socialMediaFormTypeDetails: {
    service_name: '',
    facebook_url: '',
    login_credentials: '',
    notes: '',
    work_status: '',
    platform_name: '',
    no_of_likes: '',
    no_of_gmb_reviews: '',
    no_of_posts: ''
  }
}
