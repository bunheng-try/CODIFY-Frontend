interface Props {
    points: number;
    setPoints: (v: number) => void;

    difficulty: string;
    setDifficulty: (v: string) => void;

    category: string;
    setCategory: (v: string) => void;

    aiEvaluation: boolean;
    setAiEvaluation: (v: boolean) => void;

    errors: any;
}

const ChallengeSettingTab = ({
    points,
    setPoints,
    difficulty,
    setDifficulty,
    category,
    setCategory,
    aiEvaluation,
    setAiEvaluation,
    errors,
}: Props) => {
    return (
        <div className="space-y-6">

            {/* Points */}
            <div>
                <label className="text-sm font-medium">
                    Points *
                </label>
                <input
                    type="number"
                    placeholder="0-100"
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    value={points}
                    onChange={(e) =>
                        setPoints(Number(e.target.value))
                    }
                />
                {errors.points && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.points}
                    </p>
                )}
            </div>

            {/* Difficulty + Category */}
            <div className="grid grid-cols-2 gap-4">

                {/* Difficulty */}
                <div>
                    <label className="text-sm font-medium">
                        Difficulty *
                    </label>
                    <select
                        className="w-full border rounded-md px-3 py-2 mt-1"
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(e.target.value)
                        }
                    >
                        <option value="">Select</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    {errors.difficulty && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.difficulty}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="text-sm font-medium">
                        Category *
                    </label>
                    <input
                        placeholder="ex: Array"
                        className="w-full border rounded-md px-3 py-2 mt-1"
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    />

                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.category}
                        </p>
                    )}
                </div>
            </div>

            {/* AI Evaluation */}
            <div>
                <p className="text-sm font-semibold mb-2">
                    Enable AI Evaluation
                </p>

                <div className="flex justify-between items-center border rounded-md px-4 py-3">
                    <div>
                        <p className="font-medium text-sm">
                            AI Evaluation
                        </p>
                        <p className="text-xs text-gray-500">
                            Automatically evaluate submissions with AI
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={aiEvaluation}
                        onChange={() =>
                            setAiEvaluation(!aiEvaluation)
                        }
                        className="w-5 h-5"
                    />
                </div>
            </div>

            {/* Rubric */}
            <button className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-gray-50">
                📎 Add Rubric
            </button>
        </div>
    );
};

export default ChallengeSettingTab;
