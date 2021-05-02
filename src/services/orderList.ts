import request from 'umi-request'

const baseUrl = 'http://localhost:4000'

// 获取所有订单列表
export async function fetchOrderList() {
    return request(`${baseUrl}/order`)
}

// 下单
export async function addOrder(params: any) {
    return request(`${baseUrl}/order`, {
        method: 'POST',
        data:params
    })
}

// 结账
export async function confirmPay(params: any) {
    return request(`${baseUrl}/order`, {
        method: 'PUT',
        params
    })
}
