"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const TopLoader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(25);

    const frame = window.requestAnimationFrame(() => {
      setProgress(70);
    });

    const timer = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => setVisible(false), 200);
    }, 250);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-9999 h-1 w-full overflow-hidden"
    >
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{
          width: visible ? `${progress}%` : "0%",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
};
