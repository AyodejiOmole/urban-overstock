export interface INotification {
  id: number
  userId: number
  title: string
  body: string
  metadataType: string
  metadata: Metadata
  createdAt: string
  updatedAt: string
}
  
export interface Metadata {
  orderId: number
}
  
export type INotifications = INotification[];