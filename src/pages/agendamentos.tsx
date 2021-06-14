import { Sidebar } from "../components/Sidebar";

export default function Agendamentos() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full my-6 mx-auto px-6 max-w-screen-2xl">
        <Sidebar />
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-normal">Agendamentos</h1>
            <div className="flex space-x-4 mt-8">
              <div className="p-8 bg-white rounded-lg shadow-sm">1</div>
              <div className="p-8 bg-white rounded-lg shadow-sm">2</div>
              <div className="p-8 bg-white rounded-lg shadow-sm">3</div>
            </div>
        </div>
      </div>
    </div>
  )
}