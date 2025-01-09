import cn from 'classnames';
import { match } from 'ts-pattern';
import './App.css';
import { Header } from './Components/Header';
import { useGlobal } from './Global/GlobalContext';
import { NoteForm } from './Jot/NoteForm';
import { Notes } from './Jot/Notes';
import { MobileFooterMenu } from './Menu/MobileFooterMenu';
import { NavMenu } from './Menu/NavMenu';
import { Profile } from './Profile/Profile';
import { useIsMobile } from './Utils/IsMobile';

export const Jotter = () => {
  const isMobile = useIsMobile();
  const { pageState } = useGlobal();

  const isNoteShow = pageState.page === 'note';

  return (
    <div className="relative m-0 flex h-screen w-screen overflow-hidden bg-gray-100 p-0 dark:bg-gray-800">
      <NavMenu />
      <div className="flex flex-grow flex-col overflow-y-auto">
        <Header />
        <div className={cn('flex flex-col')}>
          {match({ pageState, isMobile })
            .with({ pageState: { page: 'notes' } }, () => <Notes />)
            .with({ pageState: { page: 'note' } }, () => (
              <>
                <div className="hidden sm:block">
                  <Notes />
                </div>
                <div className="sm:hidden">
                  {isNoteShow && <NoteForm id={pageState.noteId} disableCloseClickOutside />}
                </div>
              </>
            ))
            .with({ pageState: { page: 'profile' } }, () => <Profile />)
            .exhaustive()}
        </div>
        {/* Peeking window */}
        <div
          className={cn(
            'absolute top-0 z-10 h-full bg-gray-50 shadow-xl transition-all duration-500 dark:bg-gray-800',
            'hidden w-[500px] min-w-[500px] grow flex-col sm:flex',
            {
              '-right-[calc(100%)]': !isNoteShow,
              'right-0': isNoteShow,
            },
          )}
        >
          {isNoteShow && <NoteForm id={pageState.noteId} />}
        </div>
      </div>
      <MobileFooterMenu />
    </div>
  );
};
