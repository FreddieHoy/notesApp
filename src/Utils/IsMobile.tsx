import { useLayoutEffect, useState } from "react";

const mobileBreakPoint = 480;

export const useIsMobile = () => {
  const initalSize = window.innerWidth < mobileBreakPoint;
  const [isMobile, setIsMobile] = useState(initalSize);

  useLayoutEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < mobileBreakPoint);
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  return isMobile;
};
