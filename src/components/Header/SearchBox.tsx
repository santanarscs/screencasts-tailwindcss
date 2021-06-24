import { SearchIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  
  return (
    <label className="invisible flex py-4 px-8 max-w-md self-center text-gray-400 relative bg-gray-200 rounded-md lg:visible " >
      <input 
        className="bg-gray-200 px-4 mr-4 outline-none text-gray-700"
        placeholder="Buscar na plataforma"
        ref={searchInputRef}
      />
      <SearchIcon className="h-6 w-6" />
    </label>
  )
}