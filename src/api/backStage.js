import axios from '@/axios'
import qs from 'qs'

//根据id获取用户详细信息
export function insertCommodity(form) {
	return axios
		.post("/backStage/insertCommodity", form)
}
