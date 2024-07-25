import { Card, CardBody, CardHeader, CardTitle, Row } from "reactstrap";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SalesChart = () => {
	const {companyName, theme}  = useSelector(state=>state.auth)
	const categories = [
		"Jan",
		"Feb",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]
	let colors
	if(theme==='Light')
	{
		colors=['#3b58c7', '#E91E63']
	} else {
		colors=['#ffffff', '#ffffff']
	}
	const chartoptions = {
	series: [
		{
			name: "Disbursement",
			data: [0, 31, 40, 28, 51, 42, 109, 100, 28, 51, 42],
		},
		{
			name: "Collection",
			data: [0, 11, 32, 45, 32, 34, 52, 41, 48, 74, 92],
			backgroundColor:'red',
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
		colors: ['#0a54c1', '#ff0c23'],
		stroke: {
			curve: "smooth",
			width: 1,
		},
		xaxis: {
			categories,
			labels: {
				show: true,
				style: {
					// colors: Array(categories.length).fill( theme==='Dark'? '#ffffff': '#1e2a35'),
					fontSize: '12px',
					fontFamily: 'Helvetica, Arial, sans-serif',
					fontWeight: 400,
					cssClass: 'apexcharts-xaxis-label',
				}
			}
		},
		yaxis: {
			labels: {
				show: true,
				style: {
					colors: Array(categories.length).fill(  '#1e2a35'),
					fontSize: '12px',
					fontFamily: 'Helvetica, Arial, sans-serif',
					fontWeight: 400,
					cssClass: 'apexcharts-yaxis-label',
				}
			}
		},
		legend:{
			show:true,
			labels:{
				colors:['#1e2a35']
			}
		}
	},
	};
	useEffect(()=>{
		return ()=>null
	},[theme])
	return (
	<Card>
		<CardHeader>
			<div className="d-flex mt-1">
			<CardTitle tag="h6">
				<i className="fa-solid fa-chart-simple" /> LIVE Dashboard : 
				<span className="text-primary">{companyName}</span> 
			</CardTitle>  
			<small> &nbsp;{' 30/11/2023 to 30/11/2024'} </small>
			</div>
		</CardHeader>
		<CardBody className="dashboard-card">
			<Row>
				<p> MONTHLY DISBURSEMENT & COLLECTION -2024 </p>
			</Row>	
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
