import request from 'umi-request'

const baseUrl = 'http://localhost:4000'

// 获取所有员工信息
export async function fetchStaffList() {
    return request(`${baseUrl}/user`, {
        method: 'GET'
    })
}

// 添加菜品
export async function addStaff(params: any) {
    return request(`${baseUrl}/user`, {
        method: 'POST',
        data: params
    })
}

// 获取菜品详情
export async function fetchStaffDetail(params: any) {
    return request(`${baseUrl}/user/${params}`, {
        method: 'GET'
    })
}

// 修改菜品
export async function updateStaff(params: any) {
    return request(`${baseUrl}/dish/${params._id}`, {
        method: 'PUT',
        data: params
    })
}

// 删除菜品
export async function deleteStaff(params: string) {
    return request(`${baseUrl}/user/${params}`, {
        method: 'DELETE',
        data: params
    })
}