import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full my-6 mx-auto px-6">
        <Sidebar />
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}