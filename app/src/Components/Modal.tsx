import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CardBody, CardHeader, CardWrapper } from './AuthCards';
import { Button } from './Button';
import { Stack } from './Stack';

export const Dialog = ({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) => {
  return (
    <div>
      {isOpen
        ? createPortal(
            <div className="absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-gray-600/50">
              <CardWrapper>
                <CardHeader>
                  <h1 className="dark:text-white">{title}</h1>
                  <Button intent="secondary" onClick={() => onClose()}>
                    Close
                  </Button>
                </CardHeader>
                <CardBody>{children}</CardBody>
              </CardWrapper>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
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
