import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

import { ReactNode } from 'react'

interface SidebarDrawerProviderProps {
  children: ReactNode,
}

type SidebarDrawerContextData  = {
  statusBar: boolean,
  toggleStatusSidebar(): void;
}

const SidebarDrawerContext = createContext<SidebarDrawerContextData>({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {
  const [statusBar, setStatusBar] = useState<boolean>(false)

  function toggleStatusSidebar() {
    setStatusBar(!statusBar)
    console.log(statusBar)
  }
  const router = useRouter()
  useEffect(() => {
    setStatusBar(false)
  },[router.asPath])

  return (
    <SidebarDrawerContext.Provider value={{statusBar, toggleStatusSidebar}}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)