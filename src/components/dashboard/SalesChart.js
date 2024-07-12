import { Card, CardBody, CardHeader, CardTitle, Row } from "reactstrap";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const SalesChart = () => {
	const {companyName}  = useSelector(state=>state.auth)
	const chartoptions = {
	series: [
		{
			name: "Disbursement",
			data: [0, 31, 40, 28, 51, 42, 109, 100],
		},
		{
			name: "Collection",
			data: [0, 11, 32, 45, 32, 34, 52, 41],
			backgroundColor:'red'
		},
	],
	options: {
		chart: {
			type: "bar",
		},
		dataLabels: {
			enabled: false,
		},
		grid: {
			strokeDashArray: 3,
		},
		colors: ['#3b58c7', '#E91E63'],
		stroke: {
			curve: "smooth",
			width: 1,
		},
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"March",
				"April",
				"May",
				"June",
				"July",
				"Aug",
			],
		},
	},
	};
	return (
	<Card>
		<CardHeader>
			<div className="d-flex mt-1 mb-1">
			<CardTitle tag="h5">LIVE Dashboard : <span className="text-primary">{companyName}</span> 
			</CardTitle>  
			<small> &nbsp;{' 30-11-2023 to 30-11-2024'} </small>
			</div>
			<Row>
				<small> MONTHLY DISBURSEMENT & COLLECTION -2024 </small>
			</Row>
		</CardHeader>
		<CardBody>
		<Chart
			type="bar"
			width="100%"
			height="300"
			options={chartoptions.options}
			series={chartoptions.series}
		/>
		</CardBody>
	</Card>
	);
};

export default SalesChart;
