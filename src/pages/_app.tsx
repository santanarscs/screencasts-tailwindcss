import { AppProps } from 'next/app';
import { QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import  { queryClient } from '../services/queryClient'
import { Provider as NextuAuthProvider } from 'next-auth/client'

import '../styles/global.css'
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextuAuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextuAuthProvider>
  )
}

export default MyApp
