import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	Image,
	TouchableOpacity,
	RefreshControl //下拉刷新
} from 'react-native';
import NavigationBar from './NavigationBar'
import result from '../test'
import Toast,{DURATION} from 'react-native-easy-toast'
export default class ListViewTest extends Component{
	constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            dataSource:ds.cloneWithRows(result.data),
            isLoding:true
        }
        this.onLoad();
    }

	render(){
		return (
			<View style={styles.container}>
				<NavigationBar
					title={"ListView"}
					statusBar={{backgroundColor: 'red'}}
				/>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(item)=>this.renderRow(item)}
					renderFooter={()=>this.renderFooter()}
					refreshControl={
						<RefreshControl refreshing={this.state.isLoding} onRefresh={this.onLoad()} />
					}
				/>
				<Toast ref={toast => {this.toast = toast}} />
			</View>
		)
	}

	renderRow(item){
		return <View>
			<TouchableOpacity
				style={styles.row}
				onPress={()=>{
					this.toast.show("你单击了："+item.nickname,DURATION.LENGTH_LONG)
				}}
			>
				<Image style={styles.rowImg} source={{uri:item.img}}></Image>
				<Text style={styles.rowName}>{item.nickname}</Text>
				<Text style={styles.rowUid}>{item.uid}</Text>
			</TouchableOpacity>
		</View>
	}

	renderFooter(){
		return <Image style={{width:720,height:100}} source={{uri:"http://img.mukewang.com/5a0babf7000155d009360316.jpg"}}></Image>
	}

	onLoad(){
		setTimeout(()=>{
			this.setState({
				isLoding:false
			})
		},10000)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#f7f7f7'
	},
	row:{
		backgroundColor: '#FFFFFF',
		height: 60,
		marginBottom:10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'  
	},
	rowImg:{
		width:50,
		height:50,
		marginLeft:5
	},
	rowName:{
		margin:10
	},
	rowUid:{
		backgroundColor: '#f7f7f7',
		padding: 2,
		paddingLeft: 4,
		paddingRight: 4,
		borderRadius: 4,
		color: '#333333',
		marginRight: 5
	}
});