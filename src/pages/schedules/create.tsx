import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { InputTags } from "../../components/Form/InputTag";
import { useState } from "react";


type CreateScheduleFormData = {
  title: string;
  repeat: string;
  terms: string[],
  active: boolean,
}

const createScheduleFormSchema = yup.object().shape({
  title: yup.string().required('Nome obrigatório'),
  repeat: yup.string().required('Repetição obrigatório'),
})



export default function CreateSchedule() {
  
  const router = useRouter()

  const [tags, setTags] = useState<string[]>([])

  const options = [
    {label: 'Diário', value:'daily'},
    {label: 'Semanal', value: 'weekly' },
    {label: 'Mensal', value: 'monthly'}
  ]

  const createSchedule = useMutation(async (schedule: CreateScheduleFormData) => {
    const response = await api.post('schedules', schedule)
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createScheduleFormSchema)
  })

  const handleCreateSchedule: SubmitHandler<CreateScheduleFormData> = async (values) => {
    await createSchedule.mutateAsync({...values, active: true, terms: tags})
    router.push('/schedules')
  }
  const { errors } = formState

  function handleAddTag(tag: string) {
    setTags([...tags, tag])

  }
  function handleRemoveTag(index: number) {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full my-6 mx-auto px-6 max-w-screen-2xl">
        <Sidebar />
        <div className="flex flex-1 flex-col rounded-md bg-gray-100 p-4">
          <div className="flex justify-between w-full items-center mb-8 ">
            <h1 className="text-2xl font-normal text-gray-600">
              Novo Agendamento
            </h1>
          </div>
          <form className="flex flex-1 flex-col space-y-3" >
            <Input name="title" label="Nome" error={errors.title} {...register('title')} />
            <Select name="repeat" label="Repetição" error={errors.repeat} {...register('repeat')} options={options} />
            <InputTags name="terms" label="Termos" tags={tags} handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} />
            <button type="button" onClick={handleSubmit(handleCreateSchedule)} className="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}