import { XCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useIsMobile } from '../Utils/IsMobile';
import { Button } from './Button';
import { Stack } from './Stack';

export const Dialog = ({
  children,
  isOpen,
  onClose,
  title,
  disableCloseClickOutside,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  disableCloseClickOutside?: boolean;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  /**
   Click outside logic
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (disableCloseClickOutside || !isOpen || isMobile) return;
      if (!targetRef?.current?.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('click', handleClickOutside, {
        capture: true,
      });
    };
  }, [disableCloseClickOutside, isMobile, isOpen, onClose, targetRef]);

  return isOpen
    ? createPortal(
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-600/50 transition-all">
          <div
            ref={targetRef}
            className={classNames(
              'align-center bg-grey-100 absolute flex flex-col rounded-lg border-gray-800 text-sky-900/100 shadow-lg',
              'h-full w-full px-4 py-8 sm:h-auto sm:w-auto sm:min-w-[500px] sm:p-0',
            )}
          >
            <div className="relative -right-[calc(100%-34px)] top-[32px]">
              <Button intent="minimal" onClick={() => onClose()}>
                <XCircleIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-t-md border-b bg-gray-100 px-6 py-2">
              <h1 className="dark:text-white">{title}</h1>
            </div>
            <div className="flex grow flex-col gap-4 rounded-b-md border-sky-800 bg-white p-4 px-6">
              {children}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

const root = document.createElement('div');
root.className = 'modal-root';
document.body.append(root);

export const Overlay = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => {
  return root
    ? createPortal(
        <Stack
          className="absolute bottom-0 left-0 right-0 top-0 z-10 h-screen w-screen bg-gray-600/50"
          align="center"
          justify="center"
        >
          {children}
        </Stack>,
        root,
      )
    : null;
};
