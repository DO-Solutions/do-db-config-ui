import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Copy } from 'lucide-react';
const GeneratedCommands = ({ commands, onCopy }) => {
    const [curlCopied, setCurlCopied] = useState(false);
    const [doctlCopied, setDoctlCopied] = useState(false);
    const handleCopy = async (command, type) => {
        if (command) {
            await navigator.clipboard.writeText(command);
            if (type === 'curl') {
                setCurlCopied(true);
                setTimeout(() => setCurlCopied(false), 2000);
            }
            else {
                setDoctlCopied(true);
                setTimeout(() => setDoctlCopied(false), 2000);
            }
            if (onCopy)
                onCopy();
        }
    };
    return (_jsx("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h2", { className: "text-lg font-medium", children: ["Generated ", _jsx("code", { children: "curl" }), " command"] }), _jsxs("button", { onClick: () => handleCopy(commands.curl, 'curl'), className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors", children: [_jsx(Copy, { size: 16 }), curlCopied ? 'Copied!' : 'Copy'] })] }), _jsx("pre", { className: "bg-gray-900 text-white p-6 rounded-lg overflow-x-auto", children: commands.curl })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h2", { className: "text-lg font-medium", children: ["Generated ", _jsx("code", { children: "doctl" }), " command"] }), _jsxs("button", { onClick: () => handleCopy(commands.doctl, 'doctl'), className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors", children: [_jsx(Copy, { size: 16 }), doctlCopied ? 'Copied!' : 'Copy'] })] }), _jsx("pre", { className: "bg-gray-900 text-white p-6 rounded-lg overflow-x-auto", children: commands.doctl })] })] }) }));
};
export default GeneratedCommands;
