import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import Girl from './Girl';
import ListView from './ListView';
import NavigationBar from './NavigationBar';
export default class Boy extends Component{
	constructor(props){
		super(props);
		this.state = {
			word:''
		}
	}

	render(){
		return (
			<View style={styles.container}>
				<NavigationBar
					title={"Boy"}
					statusBar={{
						backgroundColor: 'red'
					}}
				/>
				<Text style={styles.text}>I am Boy</Text>
				<Text style={styles.text} onPress={()=>{
					this.props.navigator.push({
						component:Girl,
						params:{
							word:'一只玫瑰',
							onCallBack:(word) => {
								this.setState({
									word:word
								})
							}
						}
					})
				}}>送女孩一只玫瑰</Text>
				<Text style={styles.text}>我收到了女孩送的:{this.state.word}</Text>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor: '#FFFFFF'
	},
	text:{
		fontSize: 20,
		color: '#333333'
	}
})