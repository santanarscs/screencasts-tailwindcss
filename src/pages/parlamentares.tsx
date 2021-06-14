import { Sidebar } from "../components/Sidebar";

export default function Parlamentares() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full my-6 mx-auto px-6 max-w-screen-xl">
        <Sidebar />
        <div className="flex-1 rounded-lg bg-white shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-normal">Parlamentares</h1>
          </div>
        </div>
      </div>
    </div>
  )
}