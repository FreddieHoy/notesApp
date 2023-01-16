import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { CardBody, CardHeader, CardWrapper } from "./AuthCards";
import { Button } from "./Button";
import { Stack } from "./Stack";

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
      {isOpen ? (
        <div className="absolute top-0 left-0 w-screen h-screen bg-gray-600/50 z-10 flex items-center justify-center">
          <CardWrapper>
            <CardHeader>
              <h1 className="dark:text-white">{title}</h1>
              <Button onClick={() => onClose()}>Close</Button>
            </CardHeader>
            <CardBody>{children}</CardBody>
          </CardWrapper>
        </div>
      ) : null}
    </div>
  );
};

const root = document.createElement("div");
root.className = "modal-root";
document.body.append(root);

export const Overlay = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => {
  return root
    ? createPortal(
        <Stack
          className="absolute bg-gray-600/50 w-screen h-screen z-10 top-0 left-0 right-0 bottom-0"
          align="center"
          justify="center"
        >
          {children}
        </Stack>,
        root
      )
    : null;
};
