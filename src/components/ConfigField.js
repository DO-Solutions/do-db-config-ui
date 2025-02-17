import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ConfigField = ({ name, field, onChange, value }) => {
    const getLimitsText = () => {
        if (field.type === 'number') {
            return `(${field.min} - ${field.max})`;
        }
        if (field.type === 'text' && field.maxLength) {
            return `(max ${field.maxLength} characters)`;
        }
        return '';
    };
    return (_jsx("div", { className: "p-4 bg-white rounded-lg border border-gray-200", children: _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block font-medium text-lg text-black", children: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }), field.type === 'select' ? (_jsxs("select", { value: value !== undefined && value !== null ? value : '', onChange: (e) => onChange(name, e.target.value), className: "w-full p-2 border border-gray-300 rounded-md bg-white text-black", children: [_jsx("option", { value: "", children: "Select..." }), field.options?.map(option => (_jsx("option", { value: option, children: option }, option)))] })) : field.type === 'checkbox' ? (_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", checked: value || false, onChange: (e) => onChange(name, e.target.checked), className: "w-5 h-5 border border-gray-300 rounded text-blue-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Enable" })] })) : (_jsx("input", { type: field.type, value: value !== undefined && value !== null ? value : '', min: field.min, max: field.max, pattern: field.pattern, maxLength: field.maxLength, onChange: (e) => onChange(name, e.target.value), className: "w-full p-2 border border-gray-300 rounded-md bg-white text-black", placeholder: field.example ? `Example: ${field.example}` : '' })), _jsxs("div", { className: "mt-2 space-y-1", children: [_jsx("p", { className: "text-sm text-gray-600 whitespace-pre-line", children: field.description }), getLimitsText() && (_jsxs("p", { className: "text-sm text-blue-600 font-medium", children: ["Valid range: ", getLimitsText()] }))] })] }) }));
};
export default ConfigField;
