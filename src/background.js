import axios from 'axios';
import cheerio from 'cheerio';

const UNILOGIN_URL = 'https://login.emu.dk';

const login = async () => {
  const result = await axios.get(UNILOGIN_URL);
  const $ = cheerio.load(result.data);

  // fetching all those params from site
  const selectionResults = $('#pwd input').toArray();
  if (selectionResults.length === 0) {
    console.log('Already logged in');
    return;
  }
  let inputs = selectionResults.reduce((acc, input) => {
    const $input = $(input);
    acc[$input.attr('name')] = $input.attr('value');
    return acc;
  }, {});
  
  // injecting custom inputs
  inputs.user = UNILOGIN_USER;
  inputs.pass = UNILOGIN_PASS;
  inputs.nypass1 = "";
  inputs.nypass2 = "";

  delete inputs.undefined;
  delete inputs.setpass;
  
  let params = new URLSearchParams();
  Object.keys(inputs).forEach(i => params.append(i, inputs[i]));
  const loginResult = await axios.post(UNILOGIN_URL, params);
};

chrome.runtime.onMessage.addListener(({ type }, sender, responseFn ) => {
  if (type === 'LOG_ME_IN') {
    login()
      .then(() => responseFn({ error: null }))
      .catch((error) => responseFn({ error }));
  }
  return true;
});