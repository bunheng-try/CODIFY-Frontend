"use client";

import { useEffect, useState } from "react";
import Editor, { type OnChange } from "@monaco-editor/react";
import type { ChallengeDto } from "../apis/challenge.api";

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
        // Map your challenge language to Monaco language
        switch (draft.language.toLowerCase()) {
            case "python":
                setLanguage("python");
                break;
            case "c":
                setLanguage("c");
                break;
            default:
                setLanguage("javascript");
        }
    }, [draft.language]);

    const handleChange: OnChange = (value) => {
        updateField("starterCode", value || "");
    };

    return (
        <div className="max-w-6xl space-y-6">
            <div>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                    Starter Code
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                    Provide starter code for users to begin solving the challenge.
                </p>
            </div>

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
        </div>
    );
}