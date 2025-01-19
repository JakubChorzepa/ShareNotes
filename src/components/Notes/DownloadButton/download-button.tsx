'use client';

import { Download } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';

interface DownloadButtonProps {
  fileTitle: string;
  pdfUrl: string;
}

export function DownloadButton({ fileTitle, pdfUrl }: DownloadButtonProps) {
  const linkRef = useRef(null);

  const fileName = pdfUrl && pdfUrl.split('/').pop();
  const downloadUrl = `http://localhost:3000/api/notes/pdf/${fileName}`;

  const handleDownload = async () => {
    if (!fileName) {
      return;
    }

    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const url = globalThis.URL.createObjectURL(blob);
    const link = linkRef.current as HTMLAnchorElement | null;

    if (!link) {
      return;
    }

    link.href = url;
    link.download = `${fileTitle}.pdf`;
    link.click();
    globalThis.URL.revokeObjectURL(url);
  };

  return (
    <>
      <a ref={linkRef} style={{ display: 'none' }}></a>
      <Button onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        Pobierz
      </Button>
    </>
  );
}
