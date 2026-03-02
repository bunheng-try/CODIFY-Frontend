import MainPanel from "@/shared/components/layout/mainPanel/MainPanel";
import { useCreateChallenge } from "../../hooks/useChallengeQuery";
import { BasePanelHeader } from "@/shared/components/layout/mainPanel/BasePanelHeader";
import ChallengeFormFields from "./ChallengeFormField";


export default function CreateChallengePanel({ onClose }: { onClose: () => void }) {
    const createMutation = useCreateChallenge();

    return (
        <MainPanel
            header={
                <BasePanelHeader
                    left={<h2 className="font-semibold text-lg">Create Challenge</h2>}
                    right={
                        <button onClick={onClose} className="text-sm">
                            Cancel
                        </button>
                    }
                />
            }
        >
            <ChallengeFormFields
                loading={createMutation.isPending}
                onSubmit={(dto) =>
                    createMutation.mutate(dto, {
                        onSuccess: () => onClose(),
                    })
                }
            />
        </MainPanel>
    );
}