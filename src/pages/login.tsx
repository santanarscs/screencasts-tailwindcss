import { FormEvent, useState, Fragment } from "react";
import { Transition } from '@headlessui/react'
export default function login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="bg-gradient-to-tr from-green-400 to-blue-500 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Transition
        as={Fragment}
        show={true}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className=" flex flex-col px-5 py-10 max-w-md w-full space-y-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-center text-3xl font-extrabold text-gray-700">
            Entre na sua conta
          </h2>
          <form action="#" className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="pb-1 text-gray-700">E-mail</label>
              <input className="rounded border-gray-400  py-3 focus:border-brand focus:ring-brand" type="email" placeholder="E-mail"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="pb-1 text-gray-700">Senha</label>
              <input className="rounded border-gray-400 py-3 focus:border-brand focus:ring-brand" type="password" placeholder="Senha"/>
            </div>
            <button type="submit" className="relative btn btn-primary hover:-translate-y-0.5 transform transition w-full"> 
              {isLoading && (
                <svg className="absolute left-1/3 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Entrar 
            </button>
          </form>
        </div>
      </Transition>
    </div>
  )
}

 