import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image
} from 'react-native';
import NavigationBar from '../NavigationBar';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStorageTest from './AsyncStorageTest';
export default class HomePage extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectedTab:"home"
		}
	}

	renderIcon(url,style = null){
		return <Image style={[styles.TabImg,style]} source={url} />
	}

	render(){
		return (
			<View style={styles.container}>
				{/*<NavigationBar title={"首页"} />*/}
				<TabNavigator>
					<TabNavigator.Item
						selected={this.state.selectedTab == "home"}
						title={"最新"}
						renderIcon={() => this.renderIcon(require("../../res/images/icon_news.png"))}
						renderSelectedIcon={() => this.renderIcon(require("../../res/images/icon_news_s.png"),{tintColor: '#2196F3'})}
						selectedTitleStyle={{color: '#2196F3'}}
						badgeText="18"
						onPress={() => this.setState({ selectedTab: 'home' })}
					>
					<PopularPage />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab == "hot"}
						title={"最热"}
						renderIcon={() => this.renderIcon(require("../../res/images/icon_hot.png"))}
						renderSelectedIcon={() => this.renderIcon(require("../../res/images/icon_hot_s.png"),{tintColor: '#2196F3'})}
						selectedTitleStyle={{color: '#2196F3'}}
						onPress={() => this.setState({ selectedTab: 'hot' })}
					>
					<AsyncStorageTest />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab == "shouchang"}
						title={"收藏"}
						renderIcon={() => this.renderIcon(require("../../res/images/icon_guanzhu.png"))}
						renderSelectedIcon={() => this.renderIcon(require("../../res/images/icon_guanzhu_s.png"),{tintColor: '#2196F3'})}
						selectedTitleStyle={{color: '#2196F3'}}
						onPress={() => this.setState({ selectedTab: 'shouchang' })}
					>
					<PopularPage />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab == "member"}
						title={"我的"}
						renderIcon={() => this.renderIcon(require("../../res/images/icon_member.png"))}
						renderSelectedIcon={() => this.renderIcon(require("../../res/images/icon_member_s.png"),{tintColor: '#2196F3'})}
						selectedTitleStyle={{color: '#2196F3'}}
						onPress={() => this.setState({ selectedTab: 'member' })}
					>
					<PopularPage />
					</TabNavigator.Item>
				</TabNavigator>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#f7f7f7',
		color:"#333333" 
	},
	index:{
		color: '#333333'
	},
	TabImg:{
		width: 20,
		height:20,
		tintColor: '#d3d3d3'
	}
});