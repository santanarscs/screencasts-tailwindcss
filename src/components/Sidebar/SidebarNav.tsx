import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { CalendarIcon, PaperClipIcon, HomeIcon, UserIcon } from '@heroicons/react/outline'

export function SidebarNav() {
  return (
    <div className=" flex flex-col items-start ml-6 space-y-4 mt-16">
      <NavSection title="GERAL">
        <NavLink icon={HomeIcon} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={UserIcon} href="/representatives">Parlamentares</NavLink>
        {/* <NavLink icon={DocumentIcon} href="/propostas">Propostas</NavLink> */}
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <NavLink icon={CalendarIcon} href="/schedules">Agendamento</NavLink>
      </NavSection>
      <NavSection title="DOCUMENTAÇÃO">
        <NavLink icon={PaperClipIcon} href="/about">Sobre</NavLink>
      </NavSection>
    </div>
  )
}