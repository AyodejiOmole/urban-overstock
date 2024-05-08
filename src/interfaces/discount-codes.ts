export interface IDiscountCode {
    id: number
    code: string
    percentage: number
    status: string
    createdAt: string
    updatedAt: string
}

export type IDiscountCodes = IDiscountCode[];