import axios from '@/axios'
import qs from 'qs'

//根据id获取用户详细信息
export function insertCommodity(form) {
	return axios
		.post("/backStage/insertCommodity", form)
}


//获取所有用户信息列表
export function getAllUserInfo() {
	return axios
		.get("/backStage/get-all-userInfo")
}


//更新用户状态
export function updateUserStatus(id, status) {
	return axios
		.post("/backStage/update-user-status" + "?id=" + id + "&status=" + status)	
}
