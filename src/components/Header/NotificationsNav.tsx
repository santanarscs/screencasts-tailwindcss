import { BellIcon, UserAddIcon } from "@heroicons/react/outline";

export function NotificationsNav() {
  return (
    <div className="flex space-x-8 md:space-x-6 mx-8 pr-2 py-1 text-gray-400 ">
      <BellIcon className="h-6 w-6" />
      <UserAddIcon className="h-6 w-6"/>
    </div>
  )
}