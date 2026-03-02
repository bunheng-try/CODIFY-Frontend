interface Props {
    starterCode: string;
    setStarterCode: (v: string) => void;
}

const ChallengeStartCodeTab = ({
    starterCode,
    setStarterCode,
}: Props) => {
    return (
        <div className="space-y-4">

            {/* Title */}
            <div>
                <h3 className="text-sm font-semibold">
                    Starter Code
                </h3>
                <p className="text-xs text-gray-500">
                    This code will be shown to students when they start the challenge.
                </p>
            </div>

            {/* Code Editor */}
            <textarea
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
                placeholder={`ex:\nfunction solve() {\n  // your code here\n}`}
                rows={12}
                className="w-full font-mono border rounded-md px-3 py-2 text-sm bg-gray-50"
            />
        </div>
    );
};

export default ChallengeStartCodeTab;
