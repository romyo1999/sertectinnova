import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { axiosClient2 } from '../api/axios';

const ApexChart = () => {
    const [data,setData]=useState([]);
    useEffect(()=>{
        getData()
    },[])

    function CurrentMonth() {
        // Get current date
        const currentDate = new Date();
        
        // Get month (0-indexed, so add 1 to get the correct month)
        return currentDate.getMonth() + 1;
    }

    const getData=async()=>{
        try {
        const response=await axiosClient2.get(`/api/chart/${CurrentMonth()}`);
        setData(response.data)
        } catch (error) {
            console.error(error)
        }
    }

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: ' (count)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " New This Month"
        }
      }
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={data} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
