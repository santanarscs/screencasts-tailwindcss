import { useSession, signOut } from "next-auth/client"

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({showProfileData}: ProfileProps) {
  const [session] = useSession()
  return (
    <div className="flex items-center  py-4  mb-4 mr-4">
      {showProfileData && (
        <div className="mr-2 text-left">
          <h2>{session?.name}</h2>
          <span className="text-gray-400 text-sm">{session?.email}</span>
        </div>
      )}
      {/* <img className=" rounded-full h-12 w-12" alt={session?.name as string} src="https://github.com/santanarscs.png"/> */}
    </div>
    
  ) 
}