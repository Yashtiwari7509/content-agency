import { type ReactNode, useEffect, useState } from "react";

type DesktopOnlyProps = {
  children: ReactNode;
  minWidth?: number;
};

const DesktopOnly = ({ children, minWidth = 1024 }: DesktopOnlyProps) => {
  const [show, setShow] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= minWidth
  );

  useEffect(() => {
    const handler = () => setShow(window.innerWidth >= minWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [minWidth]);

  return show ? <>{children}</> : null;
};

export default DesktopOnly;
