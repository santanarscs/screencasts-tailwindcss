import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement } from "react";
import cx from 'classnames'
interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMathExactHref?:boolean
}

export function ActiveLink({children, shouldMathExactHref = false, ...rest}: ActiveLinkProps) {
  let isActive = false

  const { asPath } = useRouter()

  if(shouldMathExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }
  if(!shouldMathExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
    isActive = true
  }


  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: isActive ? cx(children.props.className, 'text-blue-500') : cx(children.props.className, 'text-gray-800') 
      })}
    </Link>
  )
}