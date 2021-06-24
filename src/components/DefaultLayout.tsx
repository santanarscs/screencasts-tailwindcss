import { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

type LayoutProps = {
  children: ReactNode
}

export const DefaultLayoutComponent = ({children}: LayoutProps) => {
  
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex w-full my-6 mx-auto px-6 max-w-screen-2xl">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            {children}
          </div>
        </div>
      </div>
  )
}
