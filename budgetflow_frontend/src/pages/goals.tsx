import GoalCard from "@/components/GoalCard";
import type { Goal } from "@/components/types/types";

const demoGoals: Goal[] = [
    {
        title: "Emergency Fund",
        description: "Save 3 months of expenses",
        image: "/vercel.svg",
    },
    {
        title: "Vacation",
        description: "Trip to the mountains",
        image: "/vercel.svg",
    },
];

const Goals = () => {
    const goals = demoGoals;
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Goals</h1>
                <p className="text-sm text-gray-600">Your savings targets in one place</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((goal, index) => (
                    <GoalCard key={index} goal={goal} />
                ))}
            </div>
        </div>
    );
};

export default Goals;