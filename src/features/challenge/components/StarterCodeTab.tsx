"use client";

import { useEffect, useState } from "react";
import Editor, { type OnChange } from "@monaco-editor/react";
import type { ChallengeDto } from "../apis/challenge.api";
import { SectionContainer } from "@/shared/components/design/SectionContainer";
import { LabeledSection } from "@/shared/components/design/LabeledSection";

interface Props {
    draft: ChallengeDto;
    updateField: <K extends keyof ChallengeDto>(
        key: K,
        value: ChallengeDto[K]
    ) => void;
}

export default function StarterCodeTab({ draft, updateField }: Props) {
    const [language, setLanguage] = useState<string>("javascript");

    useEffect(() => {
        switch (draft.language.toLowerCase()) {
            case "python":
                setLanguage("python");
                break;
            case "c":
                setLanguage("c");
                break;
            case "cpp":
            case "c++":
                setLanguage("cpp");
                break;
            case "java":
                setLanguage("java");
                break;
            default:
                setLanguage("javascript");
        }
    }, [draft.language]);

    const handleChange: OnChange = (value) => {
        updateField("starterCode", value || "");
    };

    return (
        <SectionContainer title="Starter Code">
            <LabeledSection>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                    Provide starter code for users to begin solving the challenge.
                </p>
                <div className="border border-[hsl(var(--border))] rounded-md overflow-hidden">
                    <Editor
                        height="500px"
                        language={language}
                        value={draft.starterCode}
                        onChange={handleChange}
                        theme="vs-dark"
                        options={{
                            fontFamily: "Fira Code, monospace",
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 2,
                            lineNumbers: "on",
                            roundedSelection: false,
                            scrollBeyondLastColumn: 0,
                            cursorBlinking: "blink",
                            wordWrap: "on",
                            renderLineHighlight: "all",
                        }}
                    />
                </div>
            </LabeledSection>
        </SectionContainer>
    );
}