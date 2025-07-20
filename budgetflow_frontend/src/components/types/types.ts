export interface Goal{
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


