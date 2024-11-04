import dayjs from 'dayjs'

export interface BusinessDetails {
  business_name: string
  business_email: string
  business_number?: string
  business_hours?: string
  state?: string
  country?: string
  zip_code?: string
  street?: string
  website_url?: string
  social_profile?: string
  gmb_url?: string
  client_name?: string
}

export interface SaleDepartDetails {
  fronter?: string
  fronter_id?: string
  closer: string
  closer_id: string
  sale_type: string
}

export interface TicketDetails {
  priority: string
  remaining_price_date?: Date | null

  // due_date: Date
  total_payment: number
  advance_payment: number
  remaining_payment: number
  client_reporting_date?: Date | null
  ticket_notes?: string
  client_reporting_notes?: string
  created_at: Date
  otherSales: boolean
}

export interface CustomDevDetails {
  notes?: string
  work_status: string
  service_name?: string
  service_area?: string
}
export interface LocalSeoDetails {
  notes?: string
  work_status: string
  gmb_access_email?: string
  service_name?: string
  service_area?: string
}

export interface WordPressDetails {
  service_name?: string
  service_area?: string
  referral_website?: string
  notes?: string
  work_status: string
}

export interface WebSeoDetails {
  notes?: string
  work_status: string
  service_name?: string
  service_location?: string
  key_words?: string
  login_credentials?: string
  console_access?: string
  analytics_access?: string
  no_of_backlinks?: string
  no_of_posts?: string
  no_of_blogs?: string
}

export interface PaidMarketingDetails {
  service_name?: string
  location?: string
  ad_account_access?: string
  budget?: string
  budget_price?: number | null
  clients_objectives?: string
  notes?: string
  work_status: string
  platform_name?: string
}

export interface SocialMediaDetails {
  service_name?: string
  facebook_url?: string
  login_credentials?: string
  notes?: string
  work_status: string
  platform_name?: string
  no_of_likes?: string
  no_of_gmb_reviews?: string
  no_of_posts?: string
}

export interface WriterDetails {
  notes?: string
  task_details?: string
  work_status?: string
  platform_name?: string
  total_number_for_writers_depart?: number // New field
  total_number_of_words_writers_depart?: number // New field
  keywords_for_writers_depart?: string // New field
}

export interface DesignerDetails {
  work_status: string
  notes?: string
  task_details?: string
}

export interface CommonFormType {
  business: BusinessDetails
  saleDepart: SaleDepartDetails
  ticketDetails: TicketDetails
}
export interface CustomDevFormType extends CommonFormType {
  customDevDetails: CustomDevDetails
}

export interface LocalSeoFormType extends CommonFormType {
  localSeoDetails: LocalSeoDetails
}

export interface WriterFormType extends CommonFormType {
  writerFormTypeDetails: WriterDetails
}

export interface DesignerFormType extends CommonFormType {
  designerFormTypeDetails: DesignerDetails
}

export interface WordPressFormType extends CommonFormType {
  wordPressDetails: WordPressDetails
}

export interface WebSeoFormType extends CommonFormType {
  webSeoDetails: WebSeoDetails
}

export interface PaidMarketingFormType extends CommonFormType {
  paidMarketingDetails: PaidMarketingDetails
}

export interface SocialMediaFormType extends CommonFormType {
  socialMediaFormTypeDetails: SocialMediaDetails
}

export const customDevDefaultValues: CustomDevFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    // due_date: new Date(),
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
  customDevDetails: {
    notes: '',
    work_status: ''
  }
}

export const localSeoDefaultValues: LocalSeoFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    // due_date: new Date(),
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
  localSeoDetails: {
    notes: '',
    work_status: '',
    gmb_access_email: ''
  }
}

export const writerDefaultValues: WriterFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
  writerFormTypeDetails: {
    notes: '',
    task_details: '',
    work_status: '',
    platform_name: '',
    total_number_for_writers_depart: 0, // Default value for new field
    total_number_of_words_writers_depart: 0, // Default value for new field
    keywords_for_writers_depart: '' // Default value for new field
  }
}

export const designerDefaultValues: DesignerFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
  designerFormTypeDetails: {
    work_status: '',
    notes: '',
    task_details: ''
  }
}

export const wordPressDefaultValues: WordPressFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    // due_date: new Date(),
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
  wordPressDetails: {
    service_name: '',
    service_area: '',
    referral_website: '',
    notes: '',
    work_status: ''
  }
}

export const webSeoDefaultValues: WebSeoFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    // due_date: new Date(),
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
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

export const paidMarketingDefaultValues: PaidMarketingFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    // due_date: new Date(),
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
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

export const socialMediaDefaultValues: SocialMediaFormType = {
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
    gmb_url: '',
    client_name: ''
  },
  saleDepart: {
    fronter: '',
    fronter_id: '',
    closer: '',
    closer_id: '',
    sale_type: ''
  },
  ticketDetails: {
    priority: '',
    remaining_price_date: null,
    created_at: new Date(),

    // due_date: new Date(),
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: dayjs(new Date()).add(1, 'month').toDate(),
    ticket_notes: '',
    client_reporting_notes: '',
    otherSales: false
  },
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
