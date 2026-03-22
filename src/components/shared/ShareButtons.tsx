import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{t('common.share')}:</span>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${text}%0A${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-md bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors"
        title={t('share.whatsapp')}
      >
        <Share2 className="w-3.5 h-3.5" />
      </a>

      {/* X (Twitter) */}
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-md bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
        title={t('share.twitter')}
      >
        <Share2 className="w-3.5 h-3.5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md bg-dark-600 text-gray-400 hover:text-gray-200 hover:bg-dark-500 transition-colors"
        title={t('share.copyToClipboard')}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-safe" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
