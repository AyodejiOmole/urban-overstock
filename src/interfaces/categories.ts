export interface ICategory {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ICategories = ICategory[];
