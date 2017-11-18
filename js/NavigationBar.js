import React,{Component,PropTypes} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Platform,
	StatusBar
} from 'react-native';

const NAVBAR_HEIGHT_ANDROID = 50;
const NAVBAR_HEIGHT_IOS = 44;
const STATUS_NAR_HEIGHT = 20;
const StatusBarShape = {
	backgroundColor: PropTypes.string,
	barStyle:PropTypes.oneOf(['default','light-content','dark-content']),
	hidden:PropTypes.bool
};
export default class NavigationBar extends Component{
	//属性约束
	static propTypes = {
		style:View.propTypes.style,
		title:PropTypes.string, //需要一个约束一个字符串类型的约束
		titleView:PropTypes.element,
		hide:PropTypes.bool,
		leftButton:PropTypes.element,
		rightButton:PropTypes.element,
		statusBar:PropTypes.shape(StatusBarShape)
	};

	static defaultProps = {
		statusBar:{
			barStyle:"light-content",
			hidden:false
		}
	}

	constructor(props){
		super(props);
		this.state = {
			title:"",
			hide:false
		}
	}

	render(){
		let status = <View style={[styles.statusBar,this.props.statusBar]}>
				<StatusBar {...this.props.statusBar}/>
			</View>
		let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>
		let content = <View style={styles.navBar}>
			{this.props.leftButton}
			<View style={styles.navBarTitle}>
				{titleView}
			</View>
			{this.props.rightButton}
		</View>
		return (
			<View style={[styles.container,this.props.style]}>
				{status}
				{content}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		backgroundColor: '#2196F3'
	},
	navBar:{
		justifyContent:'space-between',
		alignItems: 'center',
		height:Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID, //判断平台是哪个然后给指定的高度
		flexDirection:'row'
	},
	navBarTitle:{
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left:40,
		right:40,
		top:0,
		bottom:0
	},
	title:{
		fontSize:22,
		color:"#FFFFFF"
	},
	statusBar:{
		height:Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : 0,
	}
})
