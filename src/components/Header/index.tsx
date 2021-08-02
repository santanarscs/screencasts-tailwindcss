import { useSidebarDrawer } from '../../context/SidebarDrawerContext'
import { Logo } from './Logo'
import { Transition } from '@headlessui/react'
import { Profile } from './Profile'
import { MenuIcon } from '@heroicons/react/outline'
import { SidebarNav } from '../Sidebar/SidebarNav'
export function Header() {

  const { statusBar, toggleStatusSidebar } = useSidebarDrawer()
  return (
    <nav className="flex w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-20">
      <div className="flex flex-1 items-center">
        <button className="mr-2" onClick={toggleStatusSidebar}><MenuIcon className="h-6 w-6 text-gray-800"/></button>
        <Logo />
      </div>
      <div className="flex items-center">
        <Profile showProfileData={true} />
      </div>
      <Transition
        show={statusBar}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {statusBar && (
          <div className="z-10 fixed inset-0 transition-opacity" onClick={toggleStatusSidebar}>
            <div className="absolute inset-0 bg-black opacity-50" tabIndex={0}></div>
          </div>
        )}
      </Transition>
      <aside 
        className={statusBar 
          ? 'transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 -translate-x-0'
          : 'transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 -translate-x-full'}
      >
        <SidebarNav />
      </aside>
    </nav>
  )
}