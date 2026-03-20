import { ResizablePanel, ResizablePanelContainer, ResizablePanelDivider } from "@/shared/components/layout/ResizablePanel";
import { Outlet } from "react-router-dom";
import { ChallengeLibraryBar } from "../components/ChallengeLibraryBar";
import { useCreateNewChallenge } from "../hooks/useCreateChallenge";

export const ChallengeLibraryPage = () => {
    const { isCreating, createNewChallenge } = useCreateNewChallenge();

    const handleCreateChallenge = async () => {
        console.log("creating")
        try {
            await createNewChallenge();
        } catch (err) {
            console.error("Failed to create challenge:", err);
        }
    };

    return (
        <ResizablePanelContainer direction="horizontal" className="flex-1">

            {/* MAIN BAR */}
            <ResizablePanel defaultSize={35} minSize={25} maxSize={45}>
                <ChallengeLibraryBar
                    onCreateChallenge={handleCreateChallenge}
                />
            </ResizablePanel>

            <ResizablePanelDivider />

            {/* MAIN PANEL */}
            <ResizablePanel defaultSize={65} minSize={55} maxSize={75}>
                {isCreating ? (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        Creating new challenge...
                    </div>
                ) : (
                    <Outlet />
                )}
            </ResizablePanel>

        </ResizablePanelContainer>
    );
};