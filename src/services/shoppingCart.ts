import request from 'umi-request'

const baseUrl = 'http://localhost:4000'

// 下单
export async function addOrder(params: any) {
    return request(`${baseUrl}/order`, {
        method: 'POST',
        params
    })
}