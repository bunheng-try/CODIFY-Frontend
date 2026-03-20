import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Panel, PanelContent } from "@/shared/components/design/Panel"
import { PanelHeader } from "@/shared/components/design/PanelHeader"
import MenuTabs, { type TabItem } from "@/shared/components/menu_tabs/MenuTabs"
import { WrapIcon } from "@/shared/components/ui/wrapIcon"
import { ChevronRight, ChevronLeft, Play } from "lucide-react"
import TestResults from "./TestResults"
import CustomRunner from "./CustomRunner"

type Tab = "tests" | "custom"

export default function ResultPanel() {
    const [activeTab, setActiveTab] = useState<Tab>("tests")
    const [collapsed, setCollapsed] = useState(false)

    const tabs: TabItem<Tab>[] = [
        { key: "tests", label: "Tests Result" },
        { key: "custom", label: "Custom" }
    ]

    return (
        <Panel className={`border-t bg-[hsl(var(--workspace))] transition-all duration-300}`}>
            <PanelHeader
                topLeft={
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <WrapIcon icon={collapsed ? ChevronLeft : ChevronRight} />
                        </Button>
                        <span className="text-sm font-medium">Results</span>
                    </div>
                }
                topRight={
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log("Run Code")}
                        className="text-[hsl(var(--primary))]"
                    >
                        <WrapIcon icon={Play} /> RunCode
                    </Button>
                }
                tabs={
                    <MenuTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                }
            />
            <PanelContent>
                <div className="p-4">
                    {activeTab === "tests" && <TestResults />}
                    {activeTab === "custom" && <CustomRunner />}
                </div>
            </PanelContent>
        </Panel>
    )
}
