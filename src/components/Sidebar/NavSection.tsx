import { ReactNode } from 'react'

interface NavSectionProps {
  title: string;
  children: ReactNode
}

export function NavSection({title, children}: NavSectionProps) {
  return (
    <div>
      <span className="font-bold text-gray-500 text-sm">{title}</span>
      <div className="mt-8 space-y-4 items-stretch">
        {children}
      </div>
    </div>
  )
}