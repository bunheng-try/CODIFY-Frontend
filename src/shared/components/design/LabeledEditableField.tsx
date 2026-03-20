import { EditableField } from "./EditableField";

interface LabeledEditableFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    multiline?: boolean;
}

export const LabeledEditableField: React.FC<LabeledEditableFieldProps> = ({ label, value, onChange, placeholder, icon, multiline }) => (
    <div className="flex flex-col">
        <span className="text-gray-600 mb-1">{label}</span>
        <div className="relative">
            {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>}
            <EditableField
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                multiline={multiline}
                className={icon ? "pl-10" : ""}
            />
        </div>
    </div>
);