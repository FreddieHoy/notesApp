import cn from 'classnames';
import { forwardRef, Ref, TextareaHTMLAttributes } from 'react';
import { cls } from './StyleUtils';

type TextAreaProps = { canResize?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef(
  ({ canResize = false, ...props }: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        {...props}
        className={cn(
          cls(
            `h-[200px] w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200`,
          ),
          props.className,
        )}
        ref={ref}
      />
    );
  },
);
