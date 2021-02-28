import request from 'umi-request'

const baseUrl = 'http://localhost:4000'

// 获取菜品列表
export async function fetchDishList(params: any) {
    return request(`${baseUrl}/dish/${params.pageNum}/${params.pageSize}`, {
        method: 'GET'
    })
}

// 添加菜品
export async function addDish(params: any) {
    return request(`${baseUrl}/dish`, {
        method: 'POST',
        data: params
    })
}

// 获取菜品详情
export async function fetchDishDetail(params: any) {
    return request(`${baseUrl}/dish/${params}`, {
        method: 'GET'
    })
}

// 修改菜品
export async function updateDish(params: any) {
    return request(`${baseUrl}/dish/${params._id}`, {
        method: 'PUT',
        data: params
    })
}

// 删除菜品
export async function deleteDish(params: string) {
    return request(`${baseUrl}/dish/${params}`, {
        method: 'DELETE',
        data: params
    })
}