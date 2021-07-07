import { AppProps } from 'next/app';
import { QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import  { queryClient } from '../services/queryClient'
import { Provider as NextuAuthProvider } from 'next-auth/client'

import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextuAuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextuAuthProvider>
  )
}

export default MyApp
