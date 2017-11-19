import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Clipboard,
	Alert
} from 'react-native';

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
                <Text onPress={this._setClipboardContent}
                      style={{color: 'blue',marginTop:100}}>
                    Tap to put "Hello World" in the clipboard
                </Text>
                <Text style={{color: 'red', marginTop: 20}}>
                    {this.state.content}
                </Text>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	}
});