import request from 'umi-request'

const baseUrl = 'http://localhost:4000'

// 获取餐桌列表
export async function fetchMealTable() {
    return request(`${baseUrl}/meal-table`, {
        method: 'GET'
    })
}

// 添加餐桌
export async function addMealTable(params: any) {
    return request(`${baseUrl}/meal-table`, {
        method: 'POST',
        data: params
    })
}

// 修改餐桌
export async function updateMealTable(params: any) {
    return request(`${baseUrl}/meal-table/${params._id}`, {
        method: 'PUT',
        data: params
    })
}

// 删除餐桌
export async function deleteMealTable(params: AsyncGeneratorFunction) {
    return request(`${baseUrl}/meal-table/${params}`, {
        method: 'DELETE',
        data: params
    })
}