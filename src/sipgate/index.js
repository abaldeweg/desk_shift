import axios from 'axios'

const headers = () => {
  let items = {
    'Content-Type': 'application/json',
  }

  if (localStorage.getItem('shift_pat')) {
    items['Authorization'] = 'Basic ' + btoa(localStorage.getItem('shift_pat'))
  }

  return items
}

const create = () => {
  return axios.create({
    baseURL: 'https://api.sipgate.com/v2',
    timeout: 50000,
    headers: headers(),
  })
}

const request = (method, url, data, params) => {
  return create().request({
    method,
    url,
    data,
    params,
  })
}

export { request }
