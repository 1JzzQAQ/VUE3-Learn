//进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from 'element-plus'
//利用axios的create方法创建axios实例
const request = axios.create({
  //基础路径
  //baseURL: import.meta.env.BASE_URL,
  timeout: 5000 //超时时间设置
})
//给request添加请求和响应拦截器
request.interceptors.request.use((config) => {
  //返回配置对象
  return config
})

request.interceptors.response.use((response) => {
  //成功回调
  //简化数据
  return response.data
}, (error) => {
  //失败回调，处理http网络错误
  let message = ''
  const status = error.response.status;
  switch (status) {
    case 401:
      message = 'token过期'
      break;
    case 403:
      message = '无权访问'
      break;
    case 404:
      message = '请求地址错误'
      break;
    case 500:
      message = '服务器出现问题'
      break;
    default:
      message = '网络出现问题'
  }
  //提示错误信息
  ElMessage({
    type: 'error',
    message
  })
  return Promise.reject(error)
})

export default request

