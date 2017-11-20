import React,{Component} from  'react';
import {
	View,
	Image,
	TouchableOpacity
} from 'react-native';
export default class ArrayUtils{
	/**
	  * 更新数据，若Item已存在则从数组中移除
	**/
	static updateArray(array,item){
		for(var i=0,len=array.length;i<len;i++){
			var temp = array[i];
			if(temp === item){
				//如果在这个数组里面就移除
				array.splice(i,1);
				return ;
			}
		}
		array.push(item);
	}

	/*
	 * 克隆
	*/
	static clone(froms){
		if(!froms) return [];
		let newArray = [];
		for(let i=0;i<froms.length;i++){
			newArray[i] = froms[i];
		}
		return newArray;
	}
}