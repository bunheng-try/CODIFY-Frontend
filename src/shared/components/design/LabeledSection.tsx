import { cn } from "@/lib/utils";

interface LabeledSectionProps {
    label?: string;
    children: React.ReactNode;
    className?: string;
}

export const LabeledSection: React.FC<LabeledSectionProps> = ({ label, children, className }) => (
    <div className={cn("flex flex-col gap-1", className)}>
        {label && <span className="text-gray-600 text-sm">{label}</span>}
        {children}
    </div>
);