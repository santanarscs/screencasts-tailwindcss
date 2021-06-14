import {} from '@heroicons/react/outline'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps {
  icon: ElementType,
  children: string;
  href: string;
}

export function NavLink({icon: Icon, children, href, ...rest}: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <a {...rest} className="flex items-center">
        <Icon className="h-6 w-6" />
        <span className="ml-4 font-medium">{children}</span>
      </a>
    </ActiveLink>
  )
}
