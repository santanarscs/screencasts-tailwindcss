import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

type LayoutProps = {
  children: ReactNode
}

export const DefaultLayoutComponent = ({children}: LayoutProps) => {
  const [isShowing, setIsShowing] = useState(false)
  const {asPath} = useRouter()
  useEffect(() => {
    setTimeout(() => {setIsShowing(true)}, 300)
  },[asPath])
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full my-6 mx-auto px-6 max-w-screen-2xl">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Transition
            show={isShowing}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            {children}
          </Transition>
        </div>
      </div>
    </div>
  )
}
