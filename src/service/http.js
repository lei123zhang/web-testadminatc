import axios from 'axios'
import qs from 'qs'

// export const BASEURL = axios.defaults.baseURL = 'http://admin.api.atcc.pro/';
export const BASEURL = axios.defaults.baseURL = 'https://api.atcc.pro/';

// export const BASEURL = axios.defaults.baseURL = 'http://admin.api.focctest.io/';
// export const BASEURL = axios.defaults.baseURL = 'http://052a3a08.ngrok.io/';
// export const BASEURL = axios.defaults.baseURL = 'http://114.55.94.18:6010/';
// export const BASEURL = axios.defaults.baseURL = 'http://api.admin.homiex.com/';
// export const BASEURL = axios.defaults.baseURL = 'http://api.admin.mybtcsafe.com/';
// export const BASEURL = axios.defaults.baseURL = 'http://api.admin.bit123.com/' //ry;
// export const BASEURL = axios.defaults.baseURL = 'http://api.admin.homiex.com/' //zyx;
// export const BASEURL = axios.defaults.baseURL = 'http://api.admin.bite-s.com/' //ry;
// export const BASEURL = axios.defaults.baseURL = 'http://coin.fexchain.io/'; //拍币网
// export const BASEURL = axios.defaults.baseURL = 'http://192.168.0.109:6010/'; //jt localtest
// export const BASEURL = axios.defaults.baseURL = 'http://api.admin.bid-buy.net/'; //gl
// export const BASEURL = axios.defaults.baseURL = 'http://paibi.wxmarket.cn/'; //zjw
// export const BASEURL = axios.defaults.baseURL = 'http://api-admin.caymanex.pro/'; //cex线上
// export const BASEURL = axios.defaults.baseURL = 'http://admin.api.hlidae.com/'; //hlx线上

export const fetch = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data, { arrayFormat: 'repeat' }))
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.patch(url, qs.stringify(data, { arrayFormat: 'repeat' }))
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, qs.stringify(data))
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const postConfig = (url, data = {}, config) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err);
      })
  })
}

// axios.interceptors.request.use(function (config) {
// 	// Do something before request is sent
// 	return config;
// }, function (error) {
// 	// Do something with request error
// 	return Promise.reject(error);