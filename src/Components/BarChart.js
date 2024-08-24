import {Bar} from 'react-chartjs-2';

export default function BarChart ({chartData}) {

  return(
    <div className = 'chart-div'>
      <Bar data = {chartData} />
    </div>
  )
}