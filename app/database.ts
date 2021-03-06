import {get, put, post, delete as axiosDelete} from 'axios'

const dbData = { url: "https://reactnative-ec9e.restdb.io", apiKey: "582aa43e178b07f36f7e5043" }
const collection = "task"

function getHeader(dbData, idToken) {
	// This code sets up authentication for restdb, it falls back to the apiKey if no user token is present.
	// ATW, this fallback is never used - but included as an example
	const apiKey = idToken ? null : { "x-apikey": dbData.apiKey }
	const token = idToken ? { 'Authorization': 'Bearer ' + idToken } : null
	return { headers: Object.assign({}, apiKey, token) }
}

export function storeDbItem(item: any, idToken): Promise<any> {
	const header = getHeader(dbData, idToken)
	const method = item._id ? put : post // Use put if edit of existing row (_id is set), otherwise post
	const putPath = item._id ? "/" + item._id : "" // Insert item id as part of path when put'ing
	return Promise.resolve(method(`${dbData.url}/rest/${collection}${putPath}`, item, getHeader(dbData, idToken))).then(x => {
		return x.data
	})
}

export function deleteDbItem(_id: string, idToken): Promise<any> {
	const header = getHeader(dbData, idToken)
	// Insert item id as part of path when deleting'ing
	return Promise.resolve(axiosDelete(`${dbData.url}/rest/${collection}/${_id}`, getHeader(dbData, idToken))).then(x => {
		return x.data
	})
}

export function loadTasks(params, idToken) {
	return get(`${dbData.url}/rest/${collection}`, Object.assign(getHeader(dbData, idToken), {
		params
	})).then(x => {
		return x.data
	}).catch(err => {
		console.error("error from axios/restdb", err)
	})
}
