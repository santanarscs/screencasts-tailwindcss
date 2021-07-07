import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

type ChartProps = {
  categories: string[]
  data: number[]
}

export function Chart({categories, data}: ChartProps) {
  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: '#374151',
    },
    grid: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    xaxis: {
      type: 'datetime',
      axisBorder: { color: '#9CA3AF' },
      axisTicks: { color: '#9CA3AF' },
      categories
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };
  const series = [
    {name: 'series1', data}
  ]
  return (
    <ApexChart options={options} series={series} type="area" height={160}/>
  )
}