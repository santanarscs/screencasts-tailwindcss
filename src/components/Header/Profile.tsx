
interface ProfileProps {
  showProfileData: boolean
}

export function Profile({showProfileData}: ProfileProps) {
  return (
    <div className="flex items-center">
      {showProfileData && (
        <div className="mr-4 text-right">
          <h2>Raphael Santana</h2>
          <span className="text-gray-400 text-sm">raphaelstn@gmail.com</span>
        </div>
      )}
      <img className=" rounded-full h-12 w-12" alt="Raphael Santana" src="https://github.com/santanarscs.png"/>
    </div>
    
  ) 
}