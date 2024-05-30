export interface IGraphDetails {
    graph: Graph[]
    revenueDifference: RevenueDifference
}

export interface Graph {
    month: string
    revenue: number
    sales: number
}

export interface RevenueDifference {
    todayRevenue: number
    yesterdayRevenue: number
    percentageDifference: number
}