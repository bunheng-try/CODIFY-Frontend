interface Props {
    name: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteDialog = ({ name, onConfirm, onCancel }: Props) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[350px]">
                <h3 className="font-semibold text-lg">
                    Delete Challenge?
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                    Are you sure you want to delete <b>{name}</b>?
                </p>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        className="border px-4 py-2 rounded"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
