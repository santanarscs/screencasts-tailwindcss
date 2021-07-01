import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js"


export type User = {
  id: string;
  name: string;
  email: string;
}

type ParsedToken = KeycloakTokenParsed & {
  id?: string;
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
}



export function useUser(): User {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed
  return {
    id: parsedToken?.sub,
    name: parsedToken?.given_name,
    email: parsedToken?.email
  }
}