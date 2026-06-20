/**
 * Preloader.tsx
 *
 * Renders nothing opinionated — just passes real load progress
 * to whatever UI you want via a render prop / children function.
 *
 * Usage:
 *
 *   <Preloader>
 *     {({ progress, ready }) =>
 *       !ready && (
 *         <div className="your-loader">
 *           <span>{progress}%</span>
 *         </div>
 *       )
 *     }
 *   </Preloader>
 */

import { usePageLoad } from "./usePageLoad";

interface PreloaderProps {
  /** Minimum ms the loader stays visible even if assets loaded faster */
  minDuration?: number;
  children: (state: { progress: number; ready: boolean }) => React.ReactNode;
}

export default function Preloader({
  minDuration = 1000,
  children,
}: PreloaderProps) {
  const { progress, ready } = usePageLoad({ minDuration });
  return <>{children({ progress, ready })}</>;
}
