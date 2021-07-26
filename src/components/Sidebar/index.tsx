import { useState } from "react";
import { Logo } from "../Header/Logo";
import { Profile } from "../Header/Profile";
import { SidebarNav } from "./SidebarNav";



export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <aside className="w-64">
      <Profile showProfileData={true} />
      <SidebarNav />
    </aside>
  )

}