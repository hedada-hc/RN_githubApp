import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView from 'react-native-sortable-listview';
import NavigationBar from '../../NavigationBar';
export default class SortKeyPage extends Component{

	constructor(props) {
	  	super(props);
	  	this.dataArray = []; //数据库读取的数组t
	  	this.sortResultArray = []; //排序后的数组
	  	this.originalCheckedArray = [];
	  	this.state = {
	  		checkedArray:[]
	  	};
	}

	//组件完成装载的时候从数据库中读取所有的标签
	componentDidMount(){
		this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.loadData();
	}

	loadData(){
		//获取所有数据库中的标签
		this.languageDao.fetch()
			.then(result => {
				//从数据库中获取用户已经订阅的标签
				this.getCheckedItems(result);
			})
			.catch(error => {

			})
	}	

	//筛选出用户订阅过的标签
	getCheckedItems(result){
		let checkedArray = [];
		for(var i=0;i<result.length;i++){
			let data = result[i];
			if(data.checked) checkedArray.push(data);
		}
		this.setState({
			checkedArray:checkedArray
		});
		this.originalCheckedArray = ArrayUtils.clone(checkedArray);
	}

	render(){
		return(
			<View style={styles.container}>
				<NavigationBar title={"排序功能"}/>
				<SortableListView
		          	style={{flex: 1}}
		          	data={this.state.checkedArray}
		          	order={Object.keys(this.state.checkedArray)}
		          	onRowMoved={e => {
		            	order.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
		            	this.forceUpdate();
		          	}}
		          	renderRow={row => <SortCell data={row} />}
		        />
			</View>
		)
	}
}

class SortCell extends Component{
	render(){
		return(
			<View>
				<Text>{this.props.data.name}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{

	}
});