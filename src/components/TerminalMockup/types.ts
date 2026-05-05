export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'backlog' | 'in_progress' | 'review' | 'done'

export interface Ticket {
  id: string
  title: string
  status: Status
  priority: Priority
  tags: string[]
  agent?: string
  agentActive?: boolean
  branch?: string
}

export interface Column {
  id: string
  title: string
  tickets: Ticket[]
}