import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  caption,
  className = '',
  aspectClassName = 'aspect-video',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-sky-50 p-6 text-center text-slate-600 ${aspectClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="mb-2 h-8 w-8 text-sky-700" aria-hidden="true" />
        <p className="text-sm font-semibold text-slate-800">{alt}</p>
        {caption ? <p className="mt-1 text-xs text-slate-500">{caption}</p> : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
