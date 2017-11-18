import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Alert
} from 'react-native';
import NavigationBar from './NavigationBar'
import HttpUtils from './HttpUtils'
export default class FetchTest extends Component{
	constructor(props){
		super(props);
		this.state = {
			result:""
		}
	}

	onLoad(url){
		HttpUtils.get(url)
			.then(result => {
				this.setState({
					result:JSON.stringify(result)
				});
			})
			.catch(error => {
				this.setState({
					result:error
				});
			})
	}

	onSubmit(url,data){
		var subData = "username="+data.usernam+"&password="+data.password
		HttpUtils.post(url,subData)
			.then(result => {
				this.setState({
					result:result
				});
			})
			.catch(error => {
				this.setState({
					result:error
				});
			})
		
	}

	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
					title={"Fetch"}
					statusBar={{backgroundColor: 'red'}}
				/>
				<Text onPress={() => this.onLoad("http://www.iconfont.cn/api/pubinfo.json")}>
				 	获取数据
				</Text>
				<Text onPress={() => this.onSubmit("http://www.taokouling.com/user/login",{usernam:"hezone",password:"hdd0313"})}>
				 	提交数据
				</Text>
				 <Text>{this.state.result}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#f7f7f7'
	}
});