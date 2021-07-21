import { GetServerSideProps } from "next";
import { DefaultLayoutComponent } from "../../components/DefaultLayout";
import { api } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function JobDetail({job}) {
  return (
    <DefaultLayoutComponent>
      <div className="flex flex-1 flex-col  text-gray-600">
        <h1 className="text-2xl font-normal mb-3">Trabalho realizado em: {job.date_job}</h1>
        {!!job.items.length 
          ? (
            <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Apresentação</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Texto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {job.items.map(item => (
                <tr key={item.proposition_id}>
                  <td className="px-6 py-4 ">
                    <a className="text-brand hover:text-brand-dark" rel="stylesheet" href={item.link} target="_blank">{item.proposition_id}</a>
                  </td>
                  <td className="px-6 py-4">{item.type_proposition}</td>
                  <td className="px-6 py-4">{item.date_apresentation}</td>
                  <td className="px-6 py-4">{item.text}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )
          : (
            <>
              <img className="h-28" src="/images/no_data.svg" alt="No data"/>
              <h1 className="text-2xl text-center mt-6">Não foram encontradas propostas neste trabalho</h1>
            </>
          )
        }
      </div>
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({params}) => {
  const { id } = params;

  const response = await api.get(`/jobs/${id}`)

  const job = {
    ...response.data,
    date_job: new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(response.data.date_job)),
    items: response.data.items.map(item => ({
      ...item,
      date_apresentation:  new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }).format(new Date(item.date_apresentation))
    }))
  }

  return {
    props: { job }
  }
})
