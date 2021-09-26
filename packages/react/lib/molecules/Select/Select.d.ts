import React from "react";
interface SelectOption {
    label: string;
    value: string;
}
interface SelectProps {
    label?: string;
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
    options?: SelectOption[];
}
declare const Select: React.FC<SelectProps>;
export default Select;
