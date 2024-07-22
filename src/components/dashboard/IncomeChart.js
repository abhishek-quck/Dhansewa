import { Card, CardBody, CardHeader, Spinner } from "reactstrap"; 
import { useGetMonthlyIncomeQuery } from "../../features/api";
import Chart from "react-apexcharts";  
import { useSelector } from "react-redux";
import { useEffect } from "react";

const IncomeChart = () => { 
  const { data, isLoading, isSuccess, error } = useGetMonthlyIncomeQuery()
  const {theme} = useSelector(state=>state.auth)
  
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
        }
	    }],
      legend: {
        labels:{
          colors :Array(data?.labels?.length).fill( theme==='Dark'? '#ffffff': '#1e2a35'),   
        }
      },
    },
  };
  useEffect(()=>{},[theme])
  
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
    <Card className="mt-4">
        <CardHeader className="text-center fs-4">
            MONTHLY INTEREST INCOME
        </CardHeader>
        <CardBody className="dashboard-card">  
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