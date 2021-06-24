import { DefaultLayoutComponent } from "../components/DefaultLayout";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Parlamentares() {
  return (
    <DefaultLayoutComponent>
      <h1 className="font-normal">Parlamentares</h1>
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {

    }
  }
})