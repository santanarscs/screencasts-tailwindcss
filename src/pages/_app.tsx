import cookie from 'cookie'
import { AppProps, AppContext } from 'next/app';
import { QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import  { queryClient } from '../services/queryClient'
import { IncomingMessage } from 'http';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';
const keycloakConfig = {
  url: 'http://localhost:8190/auth',
  realm: 'CIGEO',
  clientId: 'cigeo',
}

interface InitialProps extends AppProps{
  cookies: unknown
}


import '../styles/global.css'

function MyApp({ Component, pageProps, cookies }: InitialProps) {
  return (
    <SSRKeycloakProvider keycloakConfig={keycloakConfig} persistor={SSRCookies(cookies)}  initOptions={{ onLoad: 'check-sso'}}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SSRKeycloakProvider>
  )
}

function parseCookies(req?: IncomingMessage) {
  if(!req || req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}


export default MyApp
