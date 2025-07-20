import Image from "next/image";
import { Goal } from "./types/types";

const GoalCard = ({ goal }: { goal: Goal }) => {
    return (
        <div>
            <Image src={goal.image} alt={goal.title} width={150} height={100} />
            <h2>{goal.title}</h2>
            <p>{goal.description}</p>
        </div>
    );

};

export default GoalCard;