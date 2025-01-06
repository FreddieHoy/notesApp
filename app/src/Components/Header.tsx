import { PlusIcon } from '@heroicons/react/24/solid';
import { match } from 'ts-pattern';
import { useGlobal, useGlobalDispatch } from '../Global/GlobalContext';
import { useIsMobile } from '../Utils/IsMobile';
import { Button } from './Button';
import { H2 } from './Typography';

export const Header = () => {
  const isMobile = useIsMobile();
  const { pageState } = useGlobal();
  const dispatch = useGlobalDispatch();

  const handleAdd = () => {
    dispatch({ type: 'setPage', page: 'note' });
  };

  const showAdd = pageState.page === 'notes' || pageState.page === 'note';

  return (
    <>
      <div className="absolute left-0 top-0 z-10 flex h-16 w-full items-center justify-between gap-1 border-b bg-white p-3 shadow-sm dark:bg-gray-900">
        <H2>
          {match({ pageState, isMobile })
            .with({ pageState: { page: 'notes' } }, { pageState: { page: 'note' } }, () => 'Notes')
            .with({ pageState: { page: 'profile' } }, () => 'Profile')
            .exhaustive()}
        </H2>
        {showAdd && (
          <Button intent="minimal" size="small" onClick={handleAdd}>
            <PlusIcon className="h-6 w-6" />
          </Button>
        )}
      </div>
      {/* Placeholder */}
      <div className="max-h-16 min-h-16 w-full"> </div>
    </>
  );
};
