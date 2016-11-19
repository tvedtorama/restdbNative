import {get, put, post} from 'axios'

const dbData = { url: "https://reactnative-ec9e.restdb.io", apiKey: "582aa43e178b07f36f7e5043" }
const collection = "task"

function getHeader(dbData, idToken) {
	const apiKey = idToken ? null : { "x-apikey": dbData.apiKey }
	const token = idToken ? { 'Authorization': 'Bearer ' + idToken } : null
	return { headers: Object.assign({}, apiKey, token) }
}

export function storeDbItem(item: any, idToken): Promise<any> {
	const header = getHeader(dbData, idToken)
	const method = item._id ? put : post // (url, item) => axiosPut(url, item, gt) post(url, item, getHeader) : put()
	const putPath = item._id ? "/" + item._id : ""
	return Promise.resolve(method(`${dbData.url}/rest/${collection}${putPath}`, item, getHeader(dbData, idToken))).then(x => {
		return x.data
	})
}

export function loadTasks(params, idToken) {
	return get(`${dbData.url}/rest/${collection}`, Object.assign(getHeader(dbData, idToken), {
		params
	})).then(x => {
		return x.data
	}).catch(err => {
		console.error("error in axios", err)
	})
}

