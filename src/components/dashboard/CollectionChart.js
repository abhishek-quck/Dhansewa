import { Card, CardBody, Spinner } from "reactstrap";
// import { fetchCollections } from "../../features/collections/collectionSlice";
// import { useDispatch, useSelector } from "react-redux";
import { useGetCollectionsQuery } from "../../features/api";
import Chart from "react-apexcharts";  

const CollectionChart = () => {
  // const dispatch = useDispatch()
  // const {loading,series, labels} = useSelector(state=>state.collections)
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
	markers:{ 
	}
    },
  };
  
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

export default CollectionChart;