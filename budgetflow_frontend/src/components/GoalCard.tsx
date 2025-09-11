import Image from "next/image";
import { Goal } from "./types/types";

const GoalCard = ({ goal }: { goal: Goal }) => {
    return (
        <div className="border border-black/5 rounded-xl p-4 flex items-center gap-4 bg-white hover:shadow-sm transition-shadow">
            <Image className="rounded-md" src={goal.image} alt={goal.title} width={64} height={64} />
            <div>
                <h2 className="font-semibold text-gray-900">{goal.title}</h2>
                <p className="text-sm text-gray-600">{goal.description}</p>
            </div>
        </div>
    );
};

export default GoalCard;