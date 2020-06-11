const key = '8OFYDPJURDT4ZUUL';
const functionName = 'TIME_SERIES_DAILY';

async function printChart(value) {
  try {
    console.log(value);
    var apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${value}&apikey=${key}`;
    console.log(apiUrl);
    const responseFromAPI = await axios.get(apiUrl);
    console.log(responseFromAPI);
    const stockData = responseFromAPI.data;

    const dailyData = stockData['Time Series (Daily)'];
    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]['4. close']);

    const ctx = document.getElementById(value).getContext('2d');


    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockDates,
        datasets: [{
          label: `Stock Chart of ${value}`,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices
        }]
      }
    }); // closes chart = new Chart()
  } catch (err) {
    console.log(err);
  }
}
