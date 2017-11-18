import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	AsyncStorage,
	TextInput,
	Alert
} from 'react-native';
import NavigationBar from '../NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast';
const KEY = "text";
export default class AsyncStorageTest extends Component{
	constructor(props){
		super(props);
	}

	onSave(){

		AsyncStorage.setItem(KEY,this.text, (error)=>{
			if(!error){
				this.toast.show("保存成功",DURATION.LENGTH_LONG);
			}else{
				this.toast.show("保存失败啦",DURATION.LENGTH_LONG);
			}
		});
	}

	onRemove(){
		AsyncStorage.removeItem(KEY, (error)=>{
			if(!error){
				this.toast.show("移除成功",DURATION.LENGTH_LONG);
			}else{
				this.toast.show("移除失败啦",DURATION.LENGTH_LONG);
			}
		})
	}

	onFetch(){
		AsyncStorage.getItem(KEY,(error, result) => {
			if(!error){
				if(result !== null){
					this.toast.show(result);
				}else{
					this.toast.show("数据不存在");
				}
				
			}else{
				this.toast.show("取出数据失败",DURATION.LENGTH_LONG);
			}
		})
	}

	render(){
		return(
			<View style={styles.container}>
				<NavigationBar title={"AsyncStorageTest"} />
				<TextInput onChangeText={text => this.text = text} />
				<View style={{flexDirection: 'row',justifyContent: 'space-around' ,width:350,height:600}}>
					<Text 
						onPress={() => this.onSave()}
					>保存</Text>
					<Text
						onPress={() => this.onRemove()}
					>移除</Text>
					<Text
						onPress={() => this.onFetch()}
					>取出</Text>
				</View>
				<Toast ref={toast => this.toast = toast} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{

		backgroundColor: '#f7f7f7',
		justifyContent: 'center' 
	}
});