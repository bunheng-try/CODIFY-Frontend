interface Props {
    title: string;
    setTitle: (v: string) => void;

    description: string;
    setDescription: (v: string) => void;

    language: string;
    setLanguage: (v: string) => void;

    errors: any;
}

const DescriptionTab = ({
    title,
    setTitle,
    description,
    setDescription,
    language,
    setLanguage,
    errors,
}: Props) => {
    return (
        <div className="space-y-4">

            {/* Title */}
            <div>
                <label className="text-sm font-medium">
                    Title *
                </label>
                <input
                    placeholder="ex: Implement Binary Search"
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="text-sm font-medium">
                    Description *
                </label>
                <textarea
                    placeholder="What student needs to implement..."
                    rows={5}
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Language */}
            <div>
                <label className="text-sm font-medium">
                    Language *
                </label>
                <select
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">Select Language</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                </select>

                {errors.language && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.language}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DescriptionTab;
