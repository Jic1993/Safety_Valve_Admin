require('es6-promise').polyfill();
import axios from 'axios';

let base = 'http://106.14.147.206:3000';
// let base = 'http://127.0.0.1:3000';
if(process.env.NODE_ENV=='development') base = 'http://127.0.0.1:3000';


// 用户登陆
export const login         = param => { return axios.post(`${base}/api/login`,    param).then(res => res.data); };

// 相关信息设置
export const getUser       = param => { return axios.get (`${base}/api/getUser`,    {params: param}).then(res => res.data); };
export const updateUser    = param => { return axios.post(`${base}/api/updateUser`, param).then(res => res.data); };

export const getBasic      = param => { return axios.get (`${base}/api/setting/getBasic`,      {params: param}).then(res => res.data); };
export const updateBasic   = param => { return axios.post(`${base}/api/setting/updateBasic`,   param).then(res => res.data); };
export const getProfile    = param => { return axios.get (`${base}/api/setting/getProfile`,    {params: param}).then(res => res.data); };
export const updateProfile = param => { return axios.post(`${base}/api/setting/updateProfile`, param).then(res => res.data); };

// 添加校验委托(申请)单、任务派发
export const addApply      = param => { return axios.post(`${base}/api/addApply`,     param).then(res => res.data); };
export const getApplyList  = param => { return axios.get (`${base}/api/getApplyList`, {params: param}).then(res => res.data); };
export const assignTask    = param => { return axios.post(`${base}/api/assignTask`,   param).then(res => res.data); };

// 校验员提交测试结果
export const setPressure   = param => { return axios.post(`${base}/api/test/setPressure`, param).then(res => res.data); };

// 校验记录的送审、审核、签发
export const getTestList   = param => { return axios.post(`${base}/api/getTestList`, param).then(res => res.data); };
export const pendingTest   = param => { return axios.post(`${base}/api/pendingTest`, param).then(res => res.data); };
export const reviewTest    = param => { return axios.post(`${base}/api/reviewTest`,  param).then(res => res.data); };
export const issueTest     = param => { return axios.post(`${base}/api/issueTest`,   param).then(res => res.data); };
