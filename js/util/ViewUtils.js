import React,{Component} from  'react';
import {
	View,
	Image,
	TouchableOpacity
} from 'react-native';
export default class ViewUtils{

	static getLeftButton(callBack){
		return (
			<TouchableOpacity
				style={{padding: 8}}
				onPress={callBack}
			>
				<Image style={{width:22,height:22,tintColor: '#FFFFFF'}} source={require("../../res/images/icon_shang.png")} />
			</TouchableOpacity>
		)
	}

}