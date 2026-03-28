import type { ChallengeDto, ChallengeLevel, Languages } from "../../apis/challenge.api";
import { SectionContainer } from "@/shared/components/design/SectionContainer";
import { LabeledSection } from "@/shared/components/design/LabeledSection";
import { EditableField } from "@/shared/components/design/EditableField";

interface Props {
    draft: ChallengeDto;
    updateField: <K extends keyof ChallengeDto>(key: K, value: ChallengeDto[K]) => void;
}

export default function OverviewTab({ draft, updateField }: Props) {
    const difficultyOptions: ChallengeLevel[] = ["EASY", "MEDIUM", "HARD"];

    const languageOptions: { label: string; value: Languages }[] = [
        { label: "C", value: "c" },
        { label: "JavaScript", value: "javascript" },
        { label: "Python", value: "python" },
    ];

    return (
        <div className="space-y-8">

            {/* ---------- BASIC INFO SECTION ---------- */}
            <SectionContainer title="Basic Information">
                <LabeledSection label="Challenge Title">
                    <EditableField
                        value={draft.title}
                        onChange={(val) => updateField("title", val)}
                        placeholder="e.g. Two Sum Problem"
                    />
                </LabeledSection>

                <LabeledSection label="Programming Language" className="mt-4">
                    <select
                        value={draft.language}
                        onChange={(e) => updateField("language", e.target.value)}
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
                        {languageOptions.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </LabeledSection>

                <LabeledSection label="Difficulty" className="mt-4">
                    <select
                        value={draft.difficulty}
                        onChange={(e) => updateField("difficulty", e.target.value as ChallengeLevel)}
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
                        <option value="">Select difficulty</option>
                        {difficultyOptions.map((level) => (
                            <option key={level} value={level}>
                                {level.charAt(0) + level.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </LabeledSection>
            </SectionContainer>

            {/* ---------- DESCRIPTION SECTION ---------- */}
            <SectionContainer title="Problem Description">
                <LabeledSection>
                    <EditableField
                        value={draft.description}
                        onChange={(val) => updateField("description", val)}
                        placeholder="Write the full problem statement..."
                        multiline
                        className="min-h-40"
                    />
                </LabeledSection>
            </SectionContainer>

        </div>
    );
}