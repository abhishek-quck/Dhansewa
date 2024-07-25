import { Spinner } from "reactstrap";
import { useGetCollectionsQuery } from "../../features/api";
import Chart from "react-apexcharts";  
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CollectionChart = () => {
  const {theme} = useSelector(state=>state.collections)
  const { data, isLoading, isSuccess, error } = useGetCollectionsQuery()
  
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
        colors: ['#3b58c7', '#E91E63'],
        legend: {
            labels: {
              colors: Array(data?.labels?.length).fill( theme==='Dark'? '#ffffff': '#1e2a35'),  
              useSeriesColors: false // If true, the legend will use the colors of the series
            },
            position: 'bottom',  
        },
    },
  };
  useEffect(()=>{},[theme])
  
  if(isSuccess)
  {
    chartoptions.series=data.series
    chartoptions.options.labels=data.labels
  } 
  if(isLoading) return <Spinner />
  if(error)
  {
    console.log(error) 
  }
  return ( 
        <Chart
          type="pie"
          width="100%"
          height="268"
          options={chartoptions.options}
          series={chartoptions.series}
        /> 
  );
};

export default CollectionChart;