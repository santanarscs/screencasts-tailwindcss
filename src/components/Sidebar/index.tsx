import { useState } from "react";
import { SidebarNav } from "./SidebarNav";



export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <aside className="w-64 mr-8">
      <SidebarNav />
    </aside>
  )

}