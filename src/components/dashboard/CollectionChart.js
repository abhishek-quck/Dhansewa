import { Spinner } from "reactstrap";
import { useGetCollectionsQuery } from "../../features/api";
// import Chart from "react-apexcharts";  
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
let collections = [];
const CollectionChart = () => {
  const { data, isLoading, isSuccess, error } = useGetCollectionsQuery()
  useEffect(()=>{},[])
  if(isSuccess)
  {
    let fill = [["Task", "Hours per Day"]];
    for(var i=0; i < data.series.length; i++)
    {
      fill.push([data.labels[i], data.series[i]])
    }
    collections = fill 
  } 
  if(isLoading) return <Spinner />
  return ( 
      (<>
      { collections && <Chart
        chartType="PieChart"
        data={collections}
        options={{
          is3D: true,
        }}
        width={"100%"}
        height={"245px"}
      />
      }
      </>)
  );
};

export default CollectionChart;