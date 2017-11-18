import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native';
import NavigationBar from './NavigationBar';
export default class Girl extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	renderButton(Img){
		return  <TouchableOpacity
					onPress={()=>{
						this.props.navigator.pop();
					}}
				>
					<Image style={styles.leftButton} source={Img}></Image>
				</TouchableOpacity>
	}

	render(){
		return (
			<View style={styles.container}>
				<NavigationBar
					title={"Girl"}
					statusBar={{
						backgroundColor: '#ff6400'
					}}
					leftButton={
						this.renderButton(require('../res/images/icon_shang.png'))
					}

					rightButton={
						this.renderButton(require('../res/images/icon_guanzhu.png'))
					}
				/>
				<Text style={styles.text}>I am Girl.</Text>
				<Text style={styles.text}>我收到了男孩送的：{this.props.word}</Text>
				<Text onPress={()=>{
					this.props.onCallBack("一盒巧克力")
					this.props.navigator.pop();//关闭当前页面
				}} style={styles.text}>回赠巧克力</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#FFFFFF'
	},
	text:{
		fontSize: 22,
		color: '#333333'
	},
	leftButton:{
		width:20,
		height:20,
		margin: 5
	}
})