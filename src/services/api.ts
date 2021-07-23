
import axios from 'axios'
import { HttpsProxyAgent } from "https-proxy-agent";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  proxy: false,
  httpsAgent: process.env.HTTP_PROXY ? new HttpsProxyAgent(process.env.HTTP_PROXY) : null
})