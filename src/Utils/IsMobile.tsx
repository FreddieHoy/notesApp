import { useLayoutEffect, useState } from "react";

const mobileBreakPoint = 480;

export const useIsMobile = () => {
  const initialSize = window.innerWidth < mobileBreakPoint;
  const [isMobile, setIsMobile] = useState(initialSize);

  useLayoutEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < mobileBreakPoint);
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  return isMobile;
};
