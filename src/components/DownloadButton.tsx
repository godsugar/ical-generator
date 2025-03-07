'use client';

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function DownloadButton({
  onClick,
  disabled = false
}: DownloadButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      iCalファイルをダウンロード
    </button>
  );
}
