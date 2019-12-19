import request from '../utils/request.util';


export async function calculateMultiples(multiple: number): Promise<number[]> {
	return request({
		url: 'index/calculateMultiples',
		method: 'POST',
		body: {
			multiple
		},
	});
}


export async function uploadFile(element: any): Promise<void> {
	const formData = new FormData();
	formData.append('file', element);
	return request({
		url: 'index/uploadFile',
		method: 'POST',
		body: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export async function decryptKeywords(keywords: any): Promise<void> {

	return request({
		url: 'index/decryptKeywords',
		method: 'POST',
		body: {
			keywords
		},
	});
}
