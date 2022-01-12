const fetch = require("node-fetch");
const config = require("../config");

//function callApi from pole emploi
async function callApi(url) {
  //prepare the parameters for the request
  const params = await new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", config.poleEmploi.client_id);
  params.append("client_secret", config.poleEmploi.client_secret);
  params.append("scope", config.poleEmploi.scope);
  //call the api use fetch and the parameters prepared above
  const response = await fetch(config.poleEmploi.tokenUrl, {
    method: "POST",
    body: params,
  });
  //use json for formatting the response
  const data = await response.json();
  //and create constante for the access token
  const token = data && data.access_token ? data.access_token : null;
  //call the api use fetch and the access token and the header prepared above
  const result = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  //return the result of the api call
  return result;
}
module.exports = {
  callApi,
};
