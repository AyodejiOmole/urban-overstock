export interface INotification {
  id: number
  userId: number
  title: string
  body: string
  metadataType: string
  metadata: Metadata
  createdAt: string
  updatedAt: string
  viewed: boolean
}
  
export interface Metadata {
  orderId: number
}
  
export type INotifications = INotification[];