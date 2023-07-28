// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';

// const Games = () => {
//   const [userEntriesData, setUserEntriesData] = useState([]);

//   useEffect(() => {
//     // Fetch user entries data from the server
//     axios.get('https://snakeladder1.azurewebsites.net/getAllUser').then((response) => {
//       setUserEntriesData(response.data);
//       console.log(response.data, "all users data");
//     });
//   }, []);

//   // Extract user entry count per day
//   const userEntriesPerDay = userEntriesData.reduce((acc, entry) => {
//     const entryDate = entry.createdAt.split('T')[0]; // Extract the date part
//     if (!acc[entryDate]) {
//       acc[entryDate] = 0;
//     }
//     acc[entryDate]++;
//     return acc;
//   }, {});

//   // Convert user entry counts to arrays for the chart
//   const dates = Object.keys(userEntriesPerDay);
//   const entryCounts = Object.values(userEntriesPerDay);

//   // Chart.js configuration
//   const chartData = {
//     labels: dates,
//     datasets: [
//       {
//         label: 'User Entries per Day',
//         data: entryCounts,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart.js options
//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         suggestedMin: 0,
//       },
//     },
//   };
  

//   return (
//     <div>
//       {/* Graph */}
//       <div>
//         <Bar data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default Games;
