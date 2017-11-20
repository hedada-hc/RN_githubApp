import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Clipboard,
	Alert
} from 'react-native';
import NavigationBar from '../../NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
export default class MyPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			content:"这里是Clipboard内容"
		}
	}

	//异步函数 箭头函数不需要绑定this了
    _setClipboardContent = async () => {
        // Clipboard.setString('这里是复制的内容');
        try {
            var content = await Clipboard.getString();
            // this.setState({content});
            Alert.alert("clipboard",content);
        } catch (e) {
            this.setState({content:e.message});
        }
    };


	render(){
		return(
			<View>
                <NavigationBar title={"我的"} style={{backgroundColor: '#2196F3'}} />
                <Text
                	onPress={() => {
                		this.props.navigator.push({
                			component:CustomKeyPage,
                			params:{...this.props}
                		})
                	}}
                >自定义标签页</Text>

                <Text
                	onPress={() => {
                		this.props.navigator.push({
                			component:SortKeyPage,
                			params:{...this.props}
                		})
                	}}
                >自定义标签页</Text>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	}
});