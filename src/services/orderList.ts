import request from 'umi-request'

const baseUrl = 'https://mock.cangdu.org/mock/601ce0f342065059c9c81698/orderManage'

// 获取所有订单列表
export async function fetchOrderList() {
    return request(`${baseUrl}/orderList`)
}

// 结账
export async function confirmPay(params: any) {
    return request(`${baseUrl}/orderList`, {
        method: 'PUT',
        params
    })
}
