import { useParams, useOutletContext } from "react-router-dom";
import { useChallenge } from "../hooks/useChallengeQuery";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import MainPanel from "@/shared/components/layout/mainPanel/MainPanel";
import { BasePanelHeader } from "@/shared/components/layout/mainPanel/BasePanelHeader";

interface OutletContext {
    onEdit: (id: number) => void;
}

export const ChallengeDetailPanel = () => {
    const { challengeId } = useParams<{ challengeId: string }>();
    const id = challengeId ? Number(challengeId) : null;

    const { data: challenge, isLoading, isError } = useChallenge(id);
    const [showStarter, setShowStarter] = useState(false);

    const { onEdit } = useOutletContext<OutletContext>();

    if (isLoading)
        return <MainPanel emptyState={<div className="p-6">Loading challenge...</div>} />;
    if (isError || !challenge)
        return <MainPanel emptyState={<div className="p-6 text-red-500">Failed to load challenge</div>} />;

    return (
        <MainPanel
            header={
                <BasePanelHeader
                    left={<h1 className="text-lg font-bold truncate">{challenge.title}</h1>}
                    right={
                        <div className="flex gap-2">
                            <Button size="default" variant="outline" onClick={() => onEdit(challenge.id)}>
                                Edit
                            </Button>
                            <Button size="default" variant="default" onClick={() => console.log("Try It clicked")}>
                                Try It
                            </Button>
                        </div>
                    }
                />
            }
        >
            <div className="p-6 flex flex-col gap-4 text-sm text-[hsl(var(--foreground))]">
                {/* Description */}
                <div>{challenge.description}</div>

                {/* Info */}
                <div className="flex flex-wrap gap-6 text-[hsl(var(--muted-foreground))]">
                    <span>
                        <strong>Language:</strong> {challenge.language}
                    </span>
                    <span>
                        <strong>Created:</strong> {new Date(challenge.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                        <strong>Updated:</strong> {new Date(challenge.updatedAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Starter Code */}
                {challenge.starterCode && (
                    <div>
                        <div className="flex items-center gap-2">
                            <strong>Starter Code:</strong>
                            <Button size="default" variant="outline" onClick={() => setShowStarter((s) => !s)}>
                                {showStarter ? "Hide" : "Show"}
                            </Button>
                        </div>
                        {showStarter && (
                            <pre className="mt-1 p-4
                            bg-[#1e1e1e] text-[#d4d4d4]
                            rounded-md shadow
                            overflow-auto
                            text-xs font-mono
                            border border-[#333]
                            scrollbar-thin scrollbar-thumb-[#3c3c3c] scrollbar-track-[#1e1e1e]">
                                {challenge.starterCode}
                            </pre>
                        )}
                    </div>
                )}
            </div>
        </MainPanel>
    );
};