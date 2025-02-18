import React, { useState } from 'react';
import { Copy } from 'lucide-react';

interface GeneratedCommandsProps {
  commands: {
    curl: string;
    doctl: string;
  };
  onCopy?: () => void;
}

const GeneratedCommands = ({ commands, onCopy }: GeneratedCommandsProps) => {
  const [curlCopied, setCurlCopied] = useState(false);
  const [doctlCopied, setDoctlCopied] = useState(false);

  const handleCopy = async (command: string, type: 'curl' | 'doctl') => {
    if (command) {
      await navigator.clipboard.writeText(command);
      if (type === 'curl') {
        setCurlCopied(true);
        setTimeout(() => setCurlCopied(false), 2000);
      } else {
        setDoctlCopied(true);
        setTimeout(() => setDoctlCopied(false), 2000);
      }
      if (onCopy) onCopy();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-6">
        {/* curl Command */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Generated <code>curl</code> command</h2>
            <button
              onClick={() => handleCopy(commands.curl, 'curl')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Copy size={16} />
              {curlCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto">
            {commands.curl}
          </pre>
        </div>

        {/* doctl Command */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Generated <code>doctl</code> command</h2>
            <button
              onClick={() => handleCopy(commands.doctl, 'doctl')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Copy size={16} />
              {doctlCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto">
            {commands.doctl}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default GeneratedCommands; 