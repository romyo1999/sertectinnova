import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { axiosClient2 } from '../api/axios';

const ServicesChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 20],
    options: {
      chart: {
        width: 980,
        type: 'pie',
      },
      labels: ['IT Consulting', 'Integration', 'Custom Development', 'Support and Maintenance', 'Training and Knowledge Sharing'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axiosClient2.get(`/api/services-chart`);
      setChartData(prevState => ({
        ...prevState,
        series: response.data
      }));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={512} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ServicesChart;
