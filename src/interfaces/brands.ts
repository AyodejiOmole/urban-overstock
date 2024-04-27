export interface IBrand {
    id: number;
    name: string;
    description: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export type IBrands = IBrand[];