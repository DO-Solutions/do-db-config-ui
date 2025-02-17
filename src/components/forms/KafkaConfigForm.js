import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { kafkaConfigFields } from '../../config/kafka';
const KafkaConfigForm = ({ databaseId, onDatabaseIdChange }) => {
    const [config, setConfig] = useState({});
    const handleInputChange = (name, value) => {
        if (value === null || value === undefined) {
            const newConfig = { ...config };
            delete newConfig[name];
            setConfig(newConfig);
        }
        else {
            const field = kafkaConfigFields[name];
            const processedValue = field.type === 'number' ? Number(value) : value;
            setConfig((prev) => ({
                ...prev,
                [name]: processedValue
            }));
        }
    };
    const commands = generateCommands(databaseId, config, 'kafka');
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: Object.entries(kafkaConfigFields).map(([name, field]) => (_jsx(ConfigField, { name: name, field: field, value: config[name], onChange: handleInputChange }, name))) }), databaseId && Object.keys(config).length > 0 && (_jsx(GeneratedCommands, { commands: commands }))] }));
};
export default KafkaConfigForm;
