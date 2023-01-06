const axios = require('axios').default;
const BaseURL = require('./config').kitsuURL;
require('dotenv').config();

const request = async (url, header) => {
  try {
    const response = await axios.get(url, header, { timeout: 5000 });
    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const getMeta = async id => {
  const url = `${BaseURL}/anime/${id}`;

  const res = await request(url);
  if (res.error) {
    return res;
  }
  const { attributes } = res.data.data;
  const { titles, startDate, slug } = attributes;
  const year = startDate.split('-')[0];

  return { title: titles, year, slug };
};

module.exports = getMeta;
