export interface Goal{
    id?: string;
    title: string;
    description: string;
    image: string;
}

export interface GoalCardProps {
    goal: Goal;
}

export interface Transaction {
    date: string;
    amount: number;
    description: string;
}

export type BankProvider = {
    id: string;
    name: string;
};

export type BankConnection = {
    id: string;
    providerId: string;
    providerName: string;
    status: "connected" | "pending" | "error" | "disconnected";
    lastSyncedAt?: string | null;
};

export type SyncSchedule = {
    enabled: boolean;
    intervalHours: number;
    nextRunAt?: string | null;
};


