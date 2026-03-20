import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type FormFieldProps = {
    label: string;
    htmlFor: string;
    required?: boolean;
    children: React.ReactNode;
};

export const FormField = ({
    label,
    htmlFor,
    required,
    children,
}: FormFieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={htmlFor} className="text-sm font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
};

type TextInputProps = React.ComponentProps<typeof Input>;

export const TextInput = (props: TextInputProps) => {
    return <Input {...props} className="h-10" />;
};

type TextAreaInputProps = React.ComponentProps<typeof Textarea>;

export const TextAreaInput = (props: TextAreaInputProps) => {
    return <Textarea {...props} className="min-h-[100px]" />;
};