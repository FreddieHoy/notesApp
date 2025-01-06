import cn from 'classnames';
import { Button } from '../Components';
import { H3 } from '../Components/Typography';
import { PageState, useGlobal, useGlobalDispatch } from '../Global/GlobalContext';

export const MobileFooterMenu = () => {
  const { pageState } = useGlobal();
  const dispatch = useGlobalDispatch();
  const setPage = (pageState: PageState) => dispatch({ type: 'setPage', page: pageState.page });

  return (
    <div
      className={cn(
        'border-grey-600 absolute bottom-0 right-0 flex h-16 w-full items-center justify-around border-t-2 px-3 py-0',
        'bg-white sm:hidden',
      )}
    >
      <Button
        intent="minimal"
        onClick={() => setPage({ page: 'notes' })}
        active={pageState.page === 'notes'}
      >
        <H3>Notes</H3>
      </Button>
      <Button
        intent="primary"
        type="button"
        size="small"
        className="h-[36px] w-[36px] text-[24px] font-semibold"
        onClick={() => dispatch({ type: 'setPage', page: 'note' })}
      >
        <span className="relative bottom-[2px]">+</span>
      </Button>
      <Button
        intent="minimal"
        onClick={() => setPage({ page: 'profile' })}
        active={pageState.page === 'profile'}
      >
        <H3>Profile</H3>
      </Button>
    </div>
  );
};
