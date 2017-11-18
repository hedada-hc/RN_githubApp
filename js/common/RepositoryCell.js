import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';

export default class RepositoryCell extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<TouchableOpacity
				style={styles.container}
			>
				<View style={styles.cell_container}>
					<Text style={styles.title}>{this.props.data.full_name}</Text>
					<Text style={styles.description}>{this.props.data.description}</Text>
					<View style={styles.ListViewBottom}>
						<View style={styles.author}>
							<Text>Author:</Text>
							<Image style={styles.HeadImg} source={{uri:this.props.data.owner.avatar_url}} />
						</View>
						<View style={styles.start}>
							<Text>Start:</Text>
							<Text>{this.props.data.stargazers_count}</Text>
						</View>
						<Image style={styles.startIcon} source={require('../../res/images/icon_start.png')} />
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	title:{
		color: '#333333',
		fontSize: 16,
		marginBottom:2
	},
	description:{
		fontSize: 12,
		marginBottom:2,
		color: '#757575'
	},
	ListViewBottom:{
		flexDirection:'row',
		justifyContent: 'space-between'
	},
	HeadImg:{
		width:20,
		height:20,
		borderRadius: 30
	},
	author:{
		flexDirection:'row',
		alignItems: 'center'
	},
	start:{
		flexDirection: 'row'
	},
	startIcon:{
		width:20,
		height:20
	},
	cell_container:{
		padding: 10,
		backgroundColor: '#FFFFFF',
		marginLeft: 5,
		marginRight: 5,
		marginVertical: 3,

		//iso 阴影属性开始
		shadowColor: 'gray',
		shadowOffset: {
			width: 0.5,
			height: 0.5
		},
		shadowOpacity: 0.4,
		shadowRadius: 1,
		//iso 阴影属性结束
		elevation: 2
	}
});