export enum TicketStatus {
  NOT_STARTED_YET = 'Not Started Yet',
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  HOLD = 'Hold'
}

export const TicketStatusValues: TicketStatus[] = Object.values(TicketStatus)
