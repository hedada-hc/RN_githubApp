import React,{Component} from  'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert
} from 'react-native';
import NavigationBar from '../../NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box'; //第三方多选框组件
import ArrayUtils from '../../util/ArrayUtils';
export default class CustomKeyPage extends Component{
	constructor(props) {
	    super(props);
	    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flge_key);
	    this.chanageValue = [];
	    this.state = {
	    	dataArray:[]
	    };
	}

	componentDidMount(){
		this.loadData();
	}

	loadData(){
		this.languageDao.fetch()
			.then(result => {
				this.setState({
					dataArray:result
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	//提示是否需要保存
	onSave(){
		if(this.chanageValue.length === 0){
			//返回上一页
			this.props.navigator.pop();
			return;
		}
		this.languageDao.save(this.state.dataArray);
		this.props.navigator.pop();
	}

	onBack(){
		//如果没有修改数据就直接返回
		if(this.chanageValue.length === 0){
			this.props.navigator.pop();
			return;
		}
		//如果修改了数据则弹出确定框是否修改了 返回
		Alert.alert(
			"提示",
			"是否保存更新？",
			[
				{text:"不保存",onPress:() => {
					this.props.navigator.pop();
				},style:'cancel'},
				{text:"保存",onPress:() => {this.onSave()}}
			]
		)


	}

	renderView(){
		if(!this.state.dataArray || this.state.dataArray.length == 0) return null;
		let len = this.state.dataArray.length;
		let views = [];
		for(let i=0,l=len-2;i<l;i+=2){
			views.push(
				<View key={i}>
					<View style={styles.item}>
						{this.renderCheckBox(this.state.dataArray[i])}
						{this.renderCheckBox(this.state.dataArray[i+1])}
					</View>
					<View style={styles.line}></View>
				</View>
			);
		}
		views.push(
			<View key={len-1}>
				<View style={styles.item}>
					{len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null} 
					{this.renderCheckBox(this.state.dataArray[len - 1])}
				</View>
				<View style={styles.line}></View>
			</View>
		);
		return views;
	}

	renderCheckBox(data){
		let leftText = data.name;
		return (
			<CheckBox 
				style={{flex: 1, padding: 8}}
				onClick={() => this.onClick(data)} 
				isChecked={data.checked}
				leftText={leftText}
				checkedImage={<Image style={{width:15,height:15,tintColor: '#2196F3'}} source={require('../../../res/images/icon_checked.png')} />}
				unCheckedImage={<Image style={{width:15,height:15,tintColor: '#d3d3d3'}} source={require('../../../res/images/icon_checked.png')}/>}
			/>
		)
	}

	onClick(data){
		data.checked = !data.checked;
		ArrayUtils.updateArray(this.chanageValue,data);
	}

	render(){
		let rightButton = <TouchableOpacity onPress={() => this.onSave()}>
			<View>
				<Text style={{color:"#FFFFFF",padding:8}}>Save</Text>
			</View>
		</TouchableOpacity>
		return (
			<View>
				<NavigationBar 
					title={"自定义标签"}
					style={{backgroundColor: '#2196F3'}}
					leftButton={ViewUtils.getLeftButton(() => this.onBack())}
					rightButton={rightButton}
				/>
				<ScrollView>
					{this.renderView()}
				</ScrollView>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	item:{
		flexDirection: 'row',
		alignItems:'center'
	},
	line:{
		height:1,
		backgroundColor: '#f7f7f7'
	}
});