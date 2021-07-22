import { useState } from "react";
import { GetServerSideProps } from "next";
import { DefaultLayoutComponent } from "../../components/DefaultLayout";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useRepresentative } from "../../services/hooks/useParlamentar";
import { Pagination } from "../../components/Pagination";
import NextLink from 'next/link'

export default function index() {
  const [page, setPage] = useState(1)
  const [name, setName] = useState<string>('')

  const { data, isLoading } = useRepresentative(page, name)

  return (
    <DefaultLayoutComponent>
      <input className="w-full rounded-md p-3 mb-4 bg-gray-300 border-0"type="text" placeholder="Buscar Parlamentar" value={name} onChange={(e) => setName(e.target.value)}/>
      {isLoading 
        ?(
          <div className="w-full flex flex-col justify-center items-center">
            <svg className="animate-spin -ml-1 mr-3 h-14 w-14 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )
        :(
          <>
            <div className="grid grid-cols-5 gap-4">
              {data?.representatives.map(rep => (
              <NextLink href={`/representatives/${rep.id}`} passHref key={rep.id}>
                <div className="bg-white rounded-md pt-4 pb-10 px-2 flex flex-col justify-center items-center cursor-pointer hover:-translate-y-1.5 transform transition">
                  <img src={rep.urlFoto} alt={rep.nome} className="h-32 w-32 rounded-full"/>
                  <strong>{rep.nome}</strong>
                  <small>{rep.siglaPartido} - {rep.siglaUf}</small>
                  <small>{rep.email}</small>
                </div>
              </NextLink>
              ))}
            </div>
            <Pagination 
              totalCountOfRegisters={data?.totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )
      }
      
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {  }
  }
})
