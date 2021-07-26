import { GetServerSideProps } from "next";
import { DefaultLayoutComponent } from "../../components/DefaultLayout";
import { api } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

type Representative = {
  id: string;
  nomeCivil: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
  email: string;
}

type DetailProps = {
  profile: Representative
  propositions: any[]
}

export default function Detail({ profile }: DetailProps) {
  return (
    <DefaultLayoutComponent title="Detalhe Parlamentar">
      <h1>{profile?.nomeCivil}</h1>
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({params}) => {
  const { id } = params;
  const { data } = await api.get(`/representatives/${id}`)
  const { profile, propositions} = data

  console.log(profile)
  
  return {
    props: { profile, propositions }
  }
})
