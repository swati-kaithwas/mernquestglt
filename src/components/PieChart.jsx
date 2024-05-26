import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ feeds }) => {

  if (!Array.isArray(feeds) || feeds.length === 0) {
    return <div>No data available</div>;
  }
 
  const data = {
    labels: feeds.map(feed => feed.publishedDate),
    datasets: [
      {
        data: feeds.map(feed => feed.comments.length),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Number of Feeds per Date</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
