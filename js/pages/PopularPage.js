/**
 * 最热模块开发
**/
import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ListView,
	RefreshControl, //下拉刷新
} from 'react-native';
import NavigationBar from '../NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
const URL = "https://api.github.com/search/repositories?q=";
const QUERY_STR = "&sort=stars";
export default class PopularPage extends Component{
	constructor(props){
		super(props);
		this.dataRepository = new DataRepository();
		this.state = {
			result:''
		}
	}

	onLoad(){
		let url = this.getUrl(this.text);
		this.dataRepository.fetchNetRepository(url)
			.then(response => {
				this.setState({
					result:JSON.stringify(response)
				})
			})
			.catch(error => {
				Alert.alert("test","error");
				this.setState({
					result:JSON.stringify(error)
				})
			})
	}

	getUrl(key){
		return URL+key+QUERY_STR;
	}

	render(){
		return(
			<View style={styles.container}>
				<NavigationBar title={"Popular"} statusBar={{backgroundColor: '#2196F3'}} style={{backgroundColor: '#2196F3'}} />
				<ScrollableTabView
					tabBarBackgroundColor="#2196F3"
					tabBarInactiveTextColor="#FFFFFF"
					tabBarActiveTextColor="#FFFFFF"
					tabBarUnderlineStyle={{backgroundColor: '#E7E7E7',height:2}}
					renderTabBar={() => <ScrollableTabBar/>}
				>
			        <PopularTab tabLabel="JAVA">JAVA</PopularTab>
			        <PopularTab tabLabel="IOS">IOS</PopularTab>
			        <PopularTab tabLabel="Android">Android</PopularTab>
			        <PopularTab tabLabel="php">PHP</PopularTab>
			        <PopularTab tabLabel="node">Node.js</PopularTab>
			        <PopularTab tabLabel="React-Native">React Native</PopularTab>
			        <PopularTab tabLabel="js">JavaScript</PopularTab>
			    </ScrollableTabView>
			</View>
		)
	}
}

class PopularTab extends Component{
	constructor(props){
		super(props);
		this.dataRepository = new DataRepository();
		this.state = {
			result:'',
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}), //第一步 初始化 ListView rowHasChanged当上一行与下一行不同时 
			isLoading:false
		}
	}

	//组件加载完毕后加载数据
	componentDidMount(){
		this.onLoad(); 
	}

	onLoad(){
		this.setState({
			isLoading:true
		});
		let url = URL + this.props.tabLabel + QUERY_STR;
		this.dataRepository.fetchNetRepository(url)
			.then(response => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(response.items), //ListView关联数据不然不会显示数据
					isLoading:false
				})
			})
			.catch(error => {
				Alert.alert("test","error");
				this.setState({
					result:JSON.stringify(error)
				})
			})
	}

	renderRow(data){
		return <RepositoryCell data={data} />
	}

	render(){
		return(
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(data) => this.renderRow(data)}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isLoading}
							onRefresh={() => this.onLoad()}
							colors={["#2196F3"]}
							tintColor={"#2196F3"}
							title={"loading...."}
							titleColor={"#2196F3"}
						/>
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#f7f7f7'
	}
});

