import { Card, CardBody, Spinner } from "reactstrap"; 
import { useGetMonthlyIncomeQuery } from "../../features/api";
import Chart from "react-apexcharts";  

const IncomeChart = () => { 

  const { data, isLoading, isSuccess, error } = useGetMonthlyIncomeQuery()
  
  let chartoptions = {
    series:[],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          },
        }
	}],
    },
  };
  
  if(isSuccess)
  {
    chartoptions.series=data.series
    chartoptions.options.labels=data.labels;
  } 
  if(isLoading) return <Spinner />
  if(error)
  {
    console.log(error) 
  }
  return (
    <Card>
      <CardBody>  
        <Chart
          type="pie"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default IncomeChart;