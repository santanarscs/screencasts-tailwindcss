
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface SelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  options: string[] 
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({name, label, error=null, options, ...rest}, ref) => {
  return (
    <div className="w-full">
      {!!label && <label htmlFor={name} className="text-gray-600 tracking-wide">{label}</label>}
      <select 
        className="w-full rounded-md my-1 px-2 py-3 bg-gray-200 border-none"
        ref={ref} 
        {...rest} 
      >
        {options.map(value => (
          <option key={value} value={value}>
            {value}
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

