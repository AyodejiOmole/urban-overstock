export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  balance: number;
  status: 'blocked' | 'active';
  created: Date;
}
