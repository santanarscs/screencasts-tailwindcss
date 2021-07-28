import { GetServerSideProps } from "next";
import { DefaultLayoutComponent } from "../components/DefaultLayout";
import { withSSRAuth } from "../utils/withSSRAuth";
import { getSession } from "next-auth/client"
export default function Dashboard({user}) {
  return (
    <DefaultLayoutComponent title="Dashboard">
      <div className="bg-gradient-to-r to-green-400 from-brand p-6 rounded-md shadow-sm flex justify-between relative h-52 mt-8">
        <div className="self-center">
          <h1 className="text-2xl text-white">Bem-vindo, {user.given_name}</h1>
          <p className="text-white leading-snug">Crie agendamentos e monitore seus interesses.</p>
        </div>
        <img src="/images/schedule.svg" alt="Schedule" className="h-80 w-80 -top-20 right-10 absolute opacity-75"/>
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
