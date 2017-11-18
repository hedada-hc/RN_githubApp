/*
 *轻量级封装fetch，增强代码复用性
*/
export default class HttpUtils{
	static get(url){
		return new Promise((resolve, reject) => {
			fetch(url)
			.then(response => response.json())
			.then(result => {
				resolve(result);
			})
			.catch(error => {
				reject(error);
			})
		})
	}

	static post(url, data){
		return new Promise((resolve, reject) => {
			fetch(url,{
				method:"POST",
				header:{
					"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
				},
				body:data
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			})
		})
	}
}