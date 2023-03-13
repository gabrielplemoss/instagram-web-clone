import axios, { AxiosRequestConfig } from 'axios'

interface IApiReturn {
	statusCode: number
	data: any
}

type Config = AxiosRequestConfig<any> | undefined

const api = axios.create({
	baseURL: 'http://localhost:3333'
})

async function apiPost(endpoint: string, data: any, config?: Config): Promise<IApiReturn> {
	const response = await api.post(endpoint, data, config)

	return {
		statusCode: response.status,
		data: response.data
	}
}

export { apiPost }
