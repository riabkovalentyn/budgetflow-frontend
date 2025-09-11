import GoalCard from "@/components/GoalCard";
import type { Goal } from "@/components/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { goalsApi, errorMessage } from "@/lib/api";
import { useState } from "react";

const Goals = () => {
    const qc = useQueryClient();
    const goalsQ = useQuery({
        queryKey: ["goals"],
        queryFn: async () => (await goalsApi.list()).items as Goal[],
    });

    const createM = useMutation({
        mutationFn: async (g: { title: string; description: string; image: string }) => goalsApi.create(g),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
    });

    const [formOpen, setFormOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("/vercel.svg");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Goals</h1>
                    <p className="text-sm text-gray-600">Your savings targets in one place</p>
                </div>
                <button
                    onClick={() => setFormOpen((v) => !v)}
                    className="inline-flex h-10 items-center justify-center gap-2 px-4 rounded-lg bg-black text-white hover:bg-black/90"
                >
                    {formOpen ? "Close" : "Add goal"}
                </button>
            </div>

            {formOpen && (
                <form
                    className="rounded-xl border border-black/5 bg-white p-4 grid sm:grid-cols-3 gap-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!title.trim()) return;
                        createM.mutate({ title, description, image });
                        setTitle("");
                        setDescription("");
                        setImage("/vercel.svg");
                        setFormOpen(false);
                    }}
                >
                    <input
                        className="h-10 w-full px-3 rounded-lg border border-black/20 bg-white text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black/40 shadow-inner"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="h-10 w-full px-3 rounded-lg border border-black/20 bg-white text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black/40 shadow-inner"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center gap-2 px-4 rounded-lg bg-black text-white hover:bg-black/90 font-medium"
                        disabled={createM.isPending}
                    >
                        Save goal
                    </button>
                </form>
            )}

            {goalsQ.isLoading && <p>Loading...</p>}
            {goalsQ.error && <p className="text-red-600">{errorMessage(goalsQ.error)}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goalsQ.data?.map((goal) => (
                    <GoalCard key={goal.id ?? goal.title} goal={goal} />
                ))}
            </div>
        </div>
    );
};

export default Goals;
