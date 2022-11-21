import {AppHeader} from '../components/app-header/app-header.js';

export function MainLayout({children}) {
  return(
    <>
      <AppHeader />
      <main className='main'>
        {children}
      </main>
    </>
  );
}