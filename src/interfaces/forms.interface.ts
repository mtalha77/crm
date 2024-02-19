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
  work_status: string
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
  due_date: Date
  total_payment: number
  advance_payment: number
  remaining_payment: number
  client_reporting_date?: Date
}

export interface LocalSeoDetails {
  gmbUrl?: string
  notes?: string
}
export interface CommonFormType {
  business: BusinessDetails
  saleDepart: SaleDepartDetails
  ticketDetails: TicketDetails
}
export interface LocalSeoFormType extends CommonFormType {
  localSeoDetails: LocalSeoDetails
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
    work_status: ''
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
    due_date: new Date(),
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    client_reporting_date: new Date()
  },
  localSeoDetails: {
    gmbUrl: '',
    notes: ''
  }
}
