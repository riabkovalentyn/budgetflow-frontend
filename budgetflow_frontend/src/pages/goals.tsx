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
        <div>
            <h1 className="text-2xl font-semibold mb-4">Goals</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((goal, index) => (
                    <GoalCard key={index} goal={goal} />
                ))}
            </div>
        </div>
    );
};

export default Goals;