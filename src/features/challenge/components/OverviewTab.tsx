import type { ChallengeDto } from "../apis/challenge.api";

interface Props {
    draft: ChallengeDto;
    updateField: <K extends keyof ChallengeDto>(
        key: K,
        value: ChallengeDto[K]
    ) => void;
}

export default function OverviewTab({
    draft,
    updateField,
}: Props) {
    return (
        <div className="max-w-4xl space-y-8">

            {/* ---------- BASIC INFO SECTION ---------- */}
            <section className="space-y-6">

                <div>
                    <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                        Basic Information
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                        Define the core details of the coding challenge.
                    </p>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Challenge Title
                    </label>
                    <input
                        type="text"
                        value={draft.title}
                        onChange={(e) =>
                            updateField("title", e.target.value)
                        }
                        placeholder="e.g. Two Sum Problem"
                        className="
              w-full
              rounded-md
              border
              border-[hsl(var(--border))]
              bg-[hsl(var(--background))]
              px-3 py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[hsl(var(--primary))]
            "
                    />
                </div>

                {/* Language */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Programming Language
                    </label>
                    <select
                        value={draft.language}
                        onChange={(e) =>
                            updateField("language", e.target.value)
                        }
                        className="
              w-full
              rounded-md
              border
              border-[hsl(var(--border))]
              bg-[hsl(var(--background))]
              px-3 py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[hsl(var(--primary))]
            "
                    >
                        <option value="">Select language</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>

            </section>

            {/* ---------- DESCRIPTION SECTION ---------- */}
            <section className="space-y-4">

                <div>
                    <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                        Problem Description
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                        Clearly explain the task and requirements for the user.
                    </p>
                </div>

                <textarea
                    value={draft.description}
                    onChange={(e) =>
                        updateField("description", e.target.value)
                    }
                    placeholder="Write the full problem statement..."
                    rows={10}
                    className="
            w-full
            rounded-md
            border
            border-[hsl(var(--border))]
            bg-[hsl(var(--background))]
            px-3 py-3
            text-sm
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-[hsl(var(--primary))]
          "
                />

            </section>

        </div>
    );
}