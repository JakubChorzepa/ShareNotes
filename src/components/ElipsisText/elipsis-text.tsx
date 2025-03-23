import { FC } from 'react';

interface EllipsisTextProps {
  text: string;
  maxLength: number;
  className?: string;
}

export const EllipsisText: FC<EllipsisTextProps> = ({
  text,
  maxLength,
  className,
}) => {
  const displayedText =
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return <span className={className}>{displayedText}</span>;
};
