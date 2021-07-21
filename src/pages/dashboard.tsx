import { GetServerSideProps } from "next";
import { DefaultLayoutComponent } from "../components/DefaultLayout";
import { withSSRAuth } from "../utils/withSSRAuth";
import { getProviders, getSession } from "next-auth/client"
export default function Dashboard({user}) {
  return (
    <DefaultLayoutComponent>
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h1 className="text-2xl text-gray-600">Bem-vindo, {user.given_name}</h1>
      </div>
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const { req } = ctx
  const session = await getSession({req})
  return {
    props: {
      user: session.user
    }
  }
})
