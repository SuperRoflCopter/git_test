export interface User {
    id: number,
    name: string
}

export interface Task {
    id: number,
    label: string,
    interval: string,
    startDate: Date,
}

export type Interval = 'daily' | 'weekly' | 'monthly' | undefined