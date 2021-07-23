import { SubmitHandler, useForm } from "react-hook-form"
import { MultiSelect } from "./Form/MultiSelect"

type Option = {
  label: string;
  value: string;
}
type FilterJobsFormData = {
  type_proposition: Option[]
  date_range: Date[]
  status: Option[]
  author: Option[]
}


type JobCongressSearchBoxProps = {
  status: Option[]
  types_propositions: Option[]
  authors: Option[]
  filterJobs: (data: FilterJobsFormData) => void
}


function JobCongressSearchBox({status, types_propositions, authors, filterJobs}:JobCongressSearchBoxProps) {
  const { register, control, handleSubmit, formState } = useForm()
  const handleFilterJobs: SubmitHandler<FilterJobsFormData> = (values) => {
    filterJobs(values)
  }
  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <h2 className="text-xl mb-4">Filtrar Proposições</h2>
      <form className="space-y-4" onSubmit={handleSubmit(handleFilterJobs)}>
        <div className="grid grid-cols-2 gap-4">
          <MultiSelect name="type_proposition" label="Tipos de Proposta" placeholder="Selecione tipos de proposta" control={control} {...register('type_proposition')} options={types_propositions} />
          <MultiSelect name="status" label="Status" placeholder="Selecione status" control={control} {...register('status')} options={status} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MultiSelect name="author" label="Autores" placeholder="Selecione autores" control={control} {...register('author')} options={authors} />
        </div>
        <div className="flex justify-end space-x-2 ">
          <button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Exportar</button>
          <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-brand rounded-md hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Filtrar</button>
        </div>
      </form>
    </div>
  )
}

export { JobCongressSearchBox }