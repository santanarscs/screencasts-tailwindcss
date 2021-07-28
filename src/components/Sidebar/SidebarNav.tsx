import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { CalendarIcon, DocumentIcon, HomeIcon, UserIcon } from '@heroicons/react/outline'

export function SidebarNav() {
  return (
    <div className="items-start space-y-4 ">
      <NavSection title="GERAL">
        <NavLink icon={HomeIcon} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={UserIcon} href="/representatives">Parlamentares</NavLink>
        {/* <NavLink icon={DocumentIcon} href="/propostas">Propostas</NavLink> */}
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <NavLink icon={CalendarIcon} href="/schedules">Agendamento</NavLink>
      </NavSection>
    </div>
  )
}