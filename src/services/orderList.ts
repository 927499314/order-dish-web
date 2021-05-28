import request from 'umi-request'

const baseUrl = 'http://localhost:4000'

// 获取所有订单列表
export async function fetchOrderList() {
    return request(`${baseUrl}/order`)
}

//根据id查看订单详情
export async function OrderDetail(params: any) {
    return request(`${baseUrl}/order/${params}`, {
        method: 'GET'
    })
}

// 下单
export async function addOrder(params: any) {
    return request(`${baseUrl}/order`, {
        method: 'POST',
        data: params
    })
}

// 结账
export async function confirmPayMoney(params: any) {
    return request(`${baseUrl}/order/${params._id}`, {
        method: 'PUT',
        data: params
    })
}
