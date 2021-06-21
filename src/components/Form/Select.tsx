
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

export type SelectOptions = {
  label: string;
  value: string
}

interface SelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  options: SelectOptions[] 
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({name, label, error=null, options, ...rest}, ref) => {
  return (
    <div className="w-full">
      {!!label && <label htmlFor={name} className="text-gray-600 tracking-wide">{label}</label>}
      <select 
        name={name}
        id={name}
        className="w-full rounded-md my-1 px-2 py-3 bg-gray-200 border-none"
        ref={ref} 
        {...rest} 
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {!!error && (
        <div>{error.message}</div>
      )}
    </div>
  )
}

export const Select = forwardRef(SelectBase)

