import { Trash2 } from 'lucide-react';

export default function TrashedMessage({ onRestore, children }) {
  return (
    <div className="max-w-3xl mb-6 p-4 bg-yellow-400 rounded border border-yellow-500 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Trash2 size={20} className="text-yellow-800" />
        <div className="text-yellow-800">{children}</div>
      </div>
      <button
        className="text-yellow-800 focus:outline-none text-sm hover:underline"
        tabIndex={-1}
        type="button"
        onClick={onRestore}
      >
        Restore
      </button>
    </div>
  );
}
