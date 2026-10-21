"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QrImageProps {
  /** 二维码编码内容（地址 / 链接） */
  text: string;
  alt: string;
  className?: string;
}

/**
 * 客户端二维码生成（替代原 /api/qr 服务端路由，适配静态导出）。
 */
export function QrImage({ text, alt, className = "" }: QrImageProps) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(text, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 280,
      color: { dark: "#000000", light: "#ffffff" },
    })
      .then((url) => {
        if (alive) setSrc(url);
      })
      .catch(() => {
        /* 生成失败时保留占位 */
      });
    return () => {
      alive = false;
    };
  }, [text]);

  if (!src) {
    return (
      <div
        className={`w-full h-full animate-pulse bg-slate-200 rounded ${className}`}
        aria-hidden
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}
