import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'
export function Header() {
  
  return (
    <header className="flex w-full max-w-screen-2xl h-20 mx-auto mt-4 px-6 items-center">
      <Logo />
      {/* <SearchBox /> */}
      <div className="flex items-center ml-auto" >
        <NotificationsNav />
        <Profile showProfileData={true} />
      </div>
    </header>
  )
}