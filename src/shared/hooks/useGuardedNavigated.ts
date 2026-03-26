import { useNavigate } from "react-router-dom";
import { useUnsavedChangesStore } from "../store/UnsavedChangesStore";

export function useGuardedNavigate() {
    const navigate = useNavigate();
    const {
        hasUnsavedChanges,
        setPendingPath,
        setDialogOpen,
    } = useUnsavedChangesStore();

    const guardedNavigate = (path: string) => {
        if (hasUnsavedChanges) {
            setPendingPath(null);
            setPendingPath(path);
            setDialogOpen(true);
            return;
        }

        navigate(path);
    };

    return guardedNavigate;
}