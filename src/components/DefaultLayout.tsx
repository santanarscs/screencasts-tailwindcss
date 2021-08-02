import Head from 'next/head'
import { ReactNode } from 'react'
import { Header } from './Header'

type LayoutProps = {
  children: ReactNode,
  title?: string
}

export const DefaultLayoutComponent = ({children, title = ''}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Monitor | {title}</title>
      </Head>
      <Header />
      <div className="flex w-full my-6 mx-auto px-6">
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}
