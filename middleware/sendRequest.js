const axios = require('axios');

module.exports = sendRequest = async (method, url, data) => {
    return await axios({
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'application/json',
        },
        baseURL: "https://api.openbrewerydb.org/breweries",
        url: url,
        data: data
    })
}