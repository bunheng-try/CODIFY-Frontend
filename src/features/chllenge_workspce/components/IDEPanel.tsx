import React, { useState } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { useWorkspaceStore } from "../stores/useWorkspaceStore";
import { Button } from "@/shared/components/ui/button";
import { Panel, PanelContent, PanelFooter } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Code, RefreshCw } from "lucide-react";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";

interface IDEPanelProps {
    challengeId?: number;
    language?: string;
}

const IDEPanel: React.FC<IDEPanelProps> = ({ challengeId, language = "typescript" }) => {
    const code = useWorkspaceStore((s) =>
        challengeId ? s.codes[challengeId] ?? "" : ""
    );

    const setCode = useWorkspaceStore((s) => s.setCode);

    const resetCode = useWorkspaceStore((s) => s.resetCode);
    const [line, setLine] = useState(1);
    const [column, setColumn] = useState(1);
    const [eol, setEol] = useState("LF");

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.onDidChangeCursorPosition((e) => {
            setLine(e.position.lineNumber);
            setColumn(e.position.column);
        });

        const model = editor.getModel();
        if (model) {
            setEol(model.getEOL() === "\n" ? "LF" : "CRLF");
        }
    };


    return (
        <Panel className="h-full bg-[hsl(var(--panel))] border-l border-[hsl(var(--border))]">
            <PanelHeader
                topLeft={
                    <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]">
                        <WrapIcon icon={Code} />
                        {"Lnaguage: "}{language.toUpperCase()}
                    </div>
                }
                topRight={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-[hsl(var(--muted-foreground))]"
                        onClick={() => resetCode(challengeId!)}
                    >
                        <WrapIcon icon={RefreshCw} />
                        Reset
                    </Button>
                }
            />

            <PanelContent>
                <Editor
                    height="100%"
                    defaultLanguage={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(challengeId!, value || "")}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        automaticLayout: true,
                    }}
                    onMount={handleEditorMount}
                />
            </PanelContent>

            <PanelFooter className="flex justify-end items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                <div>UTF-8</div>
                <div>{eol}</div>
                <div>Ln {line}, Col {column}</div>
            </PanelFooter>
        </Panel>
    );
};

export default IDEPanel;