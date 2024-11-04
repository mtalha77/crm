import { DTicketDetails } from './departmentalForms.interface'
import {
  DesignerDetails,
  LocalSeoDetails,
  PaidMarketingDetails,
  SocialMediaDetails,
  WebSeoDetails,
  WordPressDetails,
  WriterDetails
} from './forms.interface'

export interface ChildLocalSeoFormType extends DTicketDetails {
  localSeoDetails: LocalSeoDetails
}

export interface ChildWordPressFormType extends DTicketDetails {
  wordPressDetails: WordPressDetails
}

export interface ChildWebSeoFormType extends DTicketDetails {
  webSeoDetails: WebSeoDetails
}

export interface ChildPaidMarketingFormType extends DTicketDetails {
  paidMarketingDetails: PaidMarketingDetails
}

export interface ChildSocialMediaFormType extends DTicketDetails {
  socialMediaFormTypeDetails: SocialMediaDetails
}

export interface ChildWriterFormType extends DTicketDetails {
  writerFormTypeDetails: WriterDetails
}

export interface ChildDesignerFormType extends DTicketDetails {
  designerFormTypeDetails: DesignerDetails
}

export const ChildLocalSeoDefaultValues: ChildLocalSeoFormType = {
  priority: '',
  due_date: new Date(),
  localSeoDetails: {
    notes: '',
    work_status: ''
  }
}

export const ChildWriterDefaultValues: ChildWriterFormType = {
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
  }
}

export const ChildDesignerDefaultValues: ChildDesignerFormType = {
  priority: '',
  due_date: new Date(),
  designerFormTypeDetails: {
    notes: '',
    task_details: ''
  }
}

export const ChildWordPressDefaultValues: ChildWordPressFormType = {
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

export const ChildWebSeoDefaultValues: ChildWebSeoFormType = {
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

export const ChildPaidMarketingDefaultValues: ChildPaidMarketingFormType = {
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

export const ChildSocialMediaDefaultValues: ChildSocialMediaFormType = {
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
