import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
interface InputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error=null, ...rest}, ref) => {
  return (
    <div className="w-full">
      {!!label && <label htmlFor={name} className="text-gray-600 tracking-wide">{label}</label>}
      <input 
        name={name}
        id={name}
        className="w-full rounded-md my-1 px-2 py-3 bg-gray-200 focus:outline-none focus:ring focus:border-brand"
        ref={ref}
        {...rest}
      />
      {!!error && (
        <div>{error.message}</div>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)