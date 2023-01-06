const axios = require('axios').default;
const BaseURL = require('./config').kitsuURL;
require('dotenv').config();

async function request(url, header) {
  try {
    const res = await axios.get(url, header, { timeout: 5000 });
    return res;
  } catch (error) {
    if (error.response) {
      console.error(
        'error on kitsu.js request:',
        error.response.status,
        error.response.statusText,
        error.config.url
      );
    } else {
      console.error(error);
    }
  }
}

async function getMeta(id) {
  let url = `${BaseURL}/anime/${id}`;
  let res;
  try {
    res = await request(url);
  } catch (error) {
    console.error(error);
  }
  if (res) {
    const attributes = res.data.data.attributes;
    return { title: attributes.titles, year: attributes.startDate.split('-')[0], slug: attributes.slug };
  }
}

module.exports = getMeta;
