import { Card, CardBody, CardHeader, Spinner } from "reactstrap"; 
import { useGetMonthlyIncomeQuery } from "../../features/api";
import Chart from "react-google-charts";  
import { useEffect } from "react";
let dataLabels = [];
const IncomeChart = () => { 
  const { data, isLoading, isSuccess, error } = useGetMonthlyIncomeQuery()
  useEffect(()=>{},[])
  
  if(isSuccess)
  { 
    dataLabels = data.labels
  } 
  if(isLoading) return <Spinner />
  return (
    <Card className="mt-4">
        <CardHeader className="text-center " tag={'h6'}>
            MONTHLY INTEREST INCOME
        </CardHeader>
        <CardBody className="dashboard-card">  
         { dataLabels && <Chart
            chartType="PieChart"
            data={dataLabels}
            options={{
              is3D: true,
            }}
            width={"100%"}
            height={"245px"}
          />}
        </CardBody>
    </Card>
  );
};

export default IncomeChart;