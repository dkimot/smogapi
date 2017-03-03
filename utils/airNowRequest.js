//Example request for zip code:
//http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=84108&API_KEY=4552063A-66E3-474C-AA48-E08B90B0C6AE
'use strict'
const axios = require('axios');

const API_KEY = '4552063A-66E3-474C-AA48-E08B90B0C6AE';

const callCurrent = (zip) => {
  const request = 'http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=' + zip + '&distance=25&API_KEY=' + API_KEY;

  return axios.get(request);
}

const callForecast = (zip) => {
  const request = 'http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=' + zip + '&API_KEY=' + API_KEY;

  return axios.get(request);
}

const statusColor = (num) => {
  switch (num) {
    case 1:
      return "#00e400";
      break;
    case 2:
      return "#ffff00";
      break;
    case 3:
      return "#ff7e00";
      break;
    case 4:
      return "#ff0000";
      break;
    case 5:
      return "#99004c";
      break;
    case 6:
      return "#7e0023";
      break;
    default:
      return "#fff";
  }
}

const parseCurrent = (data) => {
  return {
    dateTime: data[0].DateObserved + (data[0].HourObserved < 10 ? '0' + data[0].HourObserved : data[0].HourObserved) + ':00' + (data[0].HourObserved < 12 ? 'am ' : 'pm ') + data[0].LocalTimeZone,
    city: data[0].ReportingArea,
    state: data[0].StateCode,
    ozoneAQI: data[0].AQI,
    ozoneAQIcategory: data[0].Category.Name,
    ozoneAQInumber: data[0].Category.Number,
    ozoneAQIcolor: statusColor(data[0].Category.Number),
    pm25AQI: data[1].AQI,
    pm25AQIcategory: data[1].Category.Name,
    pm25AQInumber: data[1].Category.Number,
    pm25AQIcolor: statusColor(data[1].Category.Number),
    actionDay: (data[0].Category.Number > 2 || data[1].Category.Number > 2 ? true : false)
  }
}

const airNowRequest = {
  getCurrent(zip) {
    return callCurrent(zip)
      .then((response) => {
        //only returning the data object from the response
        console.log(parseCurrent(response.data));
        return parseCurrent(response.data);
      })
      .catch((err) => console.log(err));
  },
  getForecast(zip) {
    return callForecast(zip)
      .then((response) => {
        //only returning the data object from the response
        console.log(response);
        return response.data;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = airNowRequest;
