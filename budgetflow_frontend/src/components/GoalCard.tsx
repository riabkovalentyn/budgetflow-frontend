import Image from "next/image";
import { Goal } from "./types/types";

const GoalCard = ({ goal }: { goal: Goal }) => {
    return (
        <div className="border rounded p-4 flex items-center gap-4">
            <Image src={goal.image} alt={goal.title} width={64} height={64} />
            <div>
                <h2 className="font-semibold">{goal.title}</h2>
                <p className="text-sm text-gray-600">{goal.description}</p>
            </div>
        </div>
    );
};

export default GoalCard;