import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { DefaultLayoutComponent } from "../../components/DefaultLayout";
import { JobCongressSearchBox } from "../../components/JobCongressSearchBox";
import { api } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

type Option = {
  label: string;
  value: string;
}

type DataFilterJob = {
  type_proposition: Option[]
  date_range: Date[]
  status: Option[]
  author: Option[]
}

export default function JobDetail({ job, status, types_propositions, authors }) {
  
  const [jobs, setJobs] = useState(() => {
    return job.items.sort((first: any, next: any) => {
      if(first.type_proposition > next.type_proposition){
        return 1
      }
      if(first.type_proposition < next.type_proposition){
        return -1
      }
      return 0
    })
  })
  const [dataFilterJobs, setDataFilterJobs] = useState<DataFilterJob>()

  function handleFilterJobs(data: DataFilterJob) {
    setDataFilterJobs(data)
    let partialJob = []
    if(data.type_proposition?.length) {
      data.type_proposition.forEach(type => {
        const filteredJob = job.items.filter(job => job.type_proposition === type.value)
        partialJob.push(...filteredJob)
      })
    }
    if(data.status?.length) {
      data.status.forEach(status => {
        const filteredJob = job.items.filter(job => job.status === status.value)
        partialJob.push(...filteredJob)
      })
    }
    if(data.author?.length) {
      data.status.forEach(author => {
        const filteredJob = job.items.filter(job => job.author === author.value)
        partialJob.push(...filteredJob)
      })
    }
    const finalJobs =  partialJob.length
    ? partialJob.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.text === item.text
      ))
      ).sort((first: any, next: any) => {
        if(first.type_proposition > next.type_proposition){
          return 1
        }
        if(first.type_proposition < next.type_proposition){
          return -1
        }
        return 0
      })
    : job.items.sort((first: any, next: any) => {
        if(first.type_proposition > next.type_proposition){
          return 1
        }
        if(first.type_proposition < next.type_proposition){
          return -1
        }
        return 0
      })

    setJobs(finalJobs)
  }
  return (
    <DefaultLayoutComponent>
      <div className="flex flex-1 flex-col  text-gray-600">
        <h1 className="text-2xl font-normal mb-3">Trabalho realizado em: {job.date_job}</h1>
        <JobCongressSearchBox status={status} types_propositions={types_propositions} authors={authors} filterJobs={handleFilterJobs} />
        <div className=" flex flex-row-reverse my-3">
          <span className="bg-indigo-500 p-2 text-white text-xs rounded-md">Total de propostas: {jobs.length}</span>
        </div>
        {!!jobs 
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
              {jobs.map(item => (
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
  const types_propositions = job.items.map(item => item.type_proposition).filter((value, index, self) => self.indexOf(value) === index).map(item => ({label: item, value: item}))

  const status = job.items.map(item => item.status).filter((value, index, self) => self.indexOf(value) === index).map(item => ({label: item, value: item}))
  const authors = job.items.map(item => item.author).filter((value, index, self) => self.indexOf(value) === index).map(item => ({label: item, value: item}))

  return {
    props: { job, status, types_propositions, authors }
  }
})
