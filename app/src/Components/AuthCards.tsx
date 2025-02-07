import { HTMLAttributes } from 'react';

export const CardWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={
        '... ... align-center bg-grey-100 absolute flex h-80 w-1/2 flex-col rounded-md border border-gray-800 text-sky-900/100'
      }
    >
      {props.children}
    </div>
  );
};

export const CardHeader = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={'flex items-center justify-between rounded-t-md bg-gray-300 px-6 py-2'}
    >
      {props.children}
    </div>
  );
};

export const CardBody = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={
        'flex grow flex-col justify-center overflow-y-scroll border-y border-sky-800 bg-blue-100 px-6'
      }
    >
      {props.children}
    </div>
  );
};

export const CardFooter = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={'flex w-full items-center gap-1 border-t px-6 py-2'}>
      {props.children}
    </div>
  );
};
