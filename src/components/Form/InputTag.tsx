import { XIcon } from '@heroicons/react/outline'
import { createRef, KeyboardEvent, useState } from 'react'
import { FieldError } from 'react-hook-form'
interface InputTagProps {
  name: string;
  label?: string;
  tags: string[]
  handleAddTag: (tag: string) => void
  handleRemoveTag: (index: number) => void
}

export function InputTags({label, name, tags, handleAddTag, handleRemoveTag}: InputTagProps) {
  const input = createRef<HTMLInputElement>()
  

  function _handleAddTag(event: KeyboardEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value
    if(event.key === 'Enter' && value) {
      if(!tags.find(tag => tag.toLowerCase() === value.toLowerCase())){
        handleAddTag(value)
      }
      input.current.value = null
    } else if(event.key === 'Backspace' && !value) {
      handleRemoveTag(tags.length - 1)
    }
  }
  
  return (
    <>
      {!!label && <label htmlFor={name} className="text-gray-600 tracking-wide">{label}</label>}
      <div className="flex flex-wrap w-full items-center rounded-md my-1 px-2 py-1 bg-gray-200">
        <ul className="flex flex-wrap">
          {tags.map((tag, index) => (
            <li key={tag} className="flex items-center px-2 rounded-md mr-1 bg-blue-300 text-white">
              {tag}
              <button className="ml-2 bg-gray-800 rounded-full" type="button" onClick={() => handleRemoveTag(index)}><XIcon className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
        <input className="flex-1 text-sm border-none bg-transparent w-full focus:outline-none focus:ring-0" type="text" onKeyDown={_handleAddTag} ref={input}/>
      </div>
    </>
  )
}