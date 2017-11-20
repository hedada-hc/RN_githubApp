import React,{Component} from 'react';
import {
	AsyncStorage
} from 'react-native';
import keys from '../../../res/data/keys.json';
export var FLAG_LANGUAGE = {flag_language:'flag_language_language',flge_key:'flag_language_key'}; //用来标识是那个地方用到的存储key
export default class LanguageDao{
	constructor(flag){
		this.flag = flag;
	}

	fetch(){
		return new Promise((resolve,reject) => {
			AsyncStorage.getItem(this.flag, (error,result) => {
				if(error){
					reject(error);
				}else{
					if(result){
						try{
							resolve(JSON.parse(result));
						}catch(e){
							reject(e);
						}
					}else{
						var data = this.flag === FLAG_LANGUAGE.flge_key ? keys : null;
						this.save(data);
						resolve(data);
					}
				}
			});
		})
	}

	save(data){
		AsyncStorage.setItem(this.flag,JSON.stringify(data), (error) => {
			console.log(error)		
		});
	}
}