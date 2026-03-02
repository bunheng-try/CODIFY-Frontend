import MainPanel from "@/shared/components/layout/mainPanel/MainPanel";
import { useChallenge, useUpdateChallenge } from "../../hooks/useChallengeQuery";
import { BasePanelHeader } from "@/shared/components/layout/mainPanel/BasePanelHeader";
import ChallengeFormFields from "./ChallengeFormField";

export default function EditChallengePanel({
    challengeId,
    onClose,
}: {
    challengeId: number;
    onClose: () => void;
}) {
    const { data, isLoading } = useChallenge(challengeId);
    const updateMutation = useUpdateChallenge();

    if (isLoading || !data) return <div>Loading...</div>;

    return (
        <MainPanel
            header={
                <BasePanelHeader
                    left={<h2 className="font-semibold text-lg">Edit Challenge</h2>}
                    right={
                        <button onClick={onClose} className="text-sm">
                            Cancel
                        </button>
                    }
                />
            }
        >
            <ChallengeFormFields
                initialData={data}
                loading={updateMutation.isPending}
                onSubmit={(dto) =>
                    updateMutation.mutate(
                        { id: challengeId, dto },
                        { onSuccess: () => onClose() }
                    )
                }
            />
        </MainPanel>
    );
}