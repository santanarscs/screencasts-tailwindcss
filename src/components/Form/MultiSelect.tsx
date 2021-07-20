import { Controller } from "react-hook-form";
import ReactSelect, { Theme } from 'react-select'

const themeProps = (theme: Theme): Theme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#55BAEB',
      primary25: '#96d6f7',
      primary50: '#999591',
      primary75: '#4c9aff',
      danger: '#de350b',
      dangerLight: '#ffbdad',
      neutral0: '#E5E7EB',
      neutral5: '#50557F',
      neutral10: '#55BAEB',
      neutral20: 'transparent',
      neutral30: '#55BAEB',
      // neutral40: '#999999',
      // neutral50: '#808080',
      // neutral60: '#666666',
      // neutral70: '#4d4d4d',
      // neutral80: '#F4EDE8',
      // neutral90: '#1a1a1a',
    },
    spacing: {
      ...theme.spacing,
      controlHeight:48
    }
  };
};

export function MultiSelect({name, label, options, control, ...rest}) {
  return (
    <div>
      <label htmlFor={name} className="text-gray-600 tracking-wide">{label}</label>
      <Controller 
        render={
          ({ field }) => <ReactSelect {...field} theme={themeProps} options={options} isMulti={true} placeholder="Selecione as siglas"/>
        }
        control={control}
        name={name}
        {...rest}
      />
    </div>
  )
}