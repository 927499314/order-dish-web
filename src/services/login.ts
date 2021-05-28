import request from '@/utils/request';
import umiRequest from 'umi-request'

const baseUrl = 'http://localhost:4000'

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

// export async function fakeAccountLogin(params: LoginParamsType) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }

// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }

export async function login(params:any){
  return umiRequest(`${baseUrl}/user/login`,{
    method: 'POST',
    data: params
  })
}

export async function register(params:any){
  return umiRequest(`${baseUrl}/register`,{
    method: 'POST',
    data: params
  })
}
