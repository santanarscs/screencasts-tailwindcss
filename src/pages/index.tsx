import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
export default function Index(){
  const router = useRouter()
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>()

  if (keycloak && initialized && !keycloak.authenticated && keycloak.createLoginUrl) {
    keycloak.login()
  }
  if(keycloak && keycloak.authenticated) {
    router.push('/dashboard')
  }
  return (
    <div>Você será redirecionado...</div>
  )
}