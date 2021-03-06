import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '9129035297418651',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobUrl = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });

  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobUrl(zip);

    let { data } = await axios.get(url);
    console.log(data)
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();

  } catch(e) {
    console.log('error fetch Jobs');
    console.log(e);
  }
};
