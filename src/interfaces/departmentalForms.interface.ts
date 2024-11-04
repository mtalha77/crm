import {
  BusinessDetails,
  DesignerDetails,
  LocalSeoDetails,
  PaidMarketingDetails,
  SocialMediaDetails,
  WebSeoDetails,
  WordPressDetails,
  WriterDetails
} from './forms.interface'

export interface DTicketDetails {
  priority: string
  due_date: Date
}

export interface DLocalSeoFormType extends DTicketDetails {
  localSeoDetails: LocalSeoDetails
  business: BusinessDetails
}

export interface DWordPressFormType extends DTicketDetails {
  wordPressDetails: WordPressDetails
  business: BusinessDetails
}

export interface DWebSeoFormType extends DTicketDetails {
  webSeoDetails: WebSeoDetails
  business: BusinessDetails
}

export interface DPaidMarketingFormType extends DTicketDetails {
  paidMarketingDetails: PaidMarketingDetails
  business: BusinessDetails
}

export interface DSocialMediaFormType extends DTicketDetails {
  socialMediaFormTypeDetails: SocialMediaDetails
  business: BusinessDetails
}

export interface DWriterFormType extends DTicketDetails {
  writerFormTypeDetails: WriterDetails
  business: BusinessDetails
}

export interface DDesignerFormType extends DTicketDetails {
  designerFormTypeDetails: DesignerDetails
  business: BusinessDetails
}

export const dLocalSeoDefaultValues: DLocalSeoFormType = {
  priority: '',
  due_date: new Date(),
  localSeoDetails: {
    notes: '',
    work_status: ''
  },
  business: {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: '',
    gmb_url: ''
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
  },
  business: {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: '',
    gmb_url: ''
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
  },
  business: {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: '',
    gmb_url: ''
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
  },
  business: {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: '',
    gmb_url: ''
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
  },
  business: {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: '',
    gmb_url: ''
  }
}

export const dWriterDefaultValues: DWriterFormType = {
  priority: '',
  due_date: new Date(),
  writerFormTypeDetails: {
    notes: '',
    task_details: '',
    work_status: '',
    total_number_for_writer_ticket: 0,
    total_number_of_words_writer_: 0,
    key_words: '',
    platform_name: ''
  },
  business: {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: '',
    gmb_url: ''
  }
}

export const dDesignerDefaultValues: DDesignerFormType = {
  priority: '',
  due_date: new Date(),
  designerFormTypeDetails: {
    notes: '',
    task_details: ''
  },
  business: {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: '',
    gmb_url: ''
  }
}
