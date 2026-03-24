import { useCreateChallenge } from "../hooks/useChallengeQuery";
import { useNavigate } from "react-router-dom";

export const useCreateNewChallenge = () => {
    const createChallenge = useCreateChallenge();
    const navigate = useNavigate();

    const createNewChallenge = async () => {
        try {
            const newChallenge = await createChallenge.mutateAsync({
                title: "Untitled Challenge",
                description: "",
                starterCode: "",
                language: "c",
                difficulty: "MEDIUM"
            });

            navigate(`/challenge-library/challenges/${newChallenge.id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return {
        createNewChallenge,
        isCreating: createChallenge.isPending,
        error: createChallenge.error,
    };
};