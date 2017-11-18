import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Navigator,
	Alert
} from 'react-native';
import NavigationBar from '../NavigationBar';
import HomePage from './HomePage';

export default class WelcomePage extends Component{
	//组件装载完成后暂停两秒
	componentDidMount(){
		setTimeout(() => {
			//resetTo 用resetTo 就是因为要重置所有组件 把这个调过去的组件设置为第一个
			this.timer = this.props.navigator.resetTo({
				component:HomePage
			});
		},2000)
	}
	//为什么需要用到 componentWillUnmount 是因为为了防止组件在定时器没有走完之前被卸载了 报错，我们需要手动关掉定时器
	componentWillUnmount(){
		this.timer && clearTimeout(this.timer);
	}

	render(){
		return <View>
			<NavigationBar title={"欢迎页面"} />
			<Text>欢迎</Text>
		</View>
	}
}