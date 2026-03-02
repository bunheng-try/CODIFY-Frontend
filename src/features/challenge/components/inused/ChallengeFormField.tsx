// components/ChallengeFormFields.tsx
import { useState, useEffect } from "react";
import type { Challenge, ChallengeDto } from "../../apis/challenge.api";

interface Props {
    initialData?: Challenge;
    onSubmit: (dto: ChallengeDto) => void;
    loading?: boolean;
}

export default function ChallengeFormFields({
    initialData,
    onSubmit,
    loading,
}: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [starterCode, setStarterCode] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setLanguage(initialData.language);
            setStarterCode(initialData.starterCode);
        }
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit({
            title,
            description,
            language,
            starterCode,
        });
    };

    return (
        <div className="p-6 space-y-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full border rounded p-2"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border rounded p-2"
            />

            <input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Language"
                className="w-full border rounded p-2"
            />

            <textarea
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
                placeholder="Starter Code"
                className="w-full border rounded p-2"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded"
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
}