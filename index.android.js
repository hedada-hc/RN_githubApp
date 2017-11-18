/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ListViewTest from './js/ListViewTest';
import FetchTest from './js/FetchTest';
import setup from './js/pages/setup';
export default class imoocGithub extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"Hezone"
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {/*<Navigator 
                    initialRoute={{
                        component:Boy
                    }}
                    renderScene={(route,navigator) => {
                        let Component = route.component;
                        return <Component navigator={navigator} {...route.params} />
                    }}
                ></Navigator>*/}
                {/*<ListViewTest/>*/}
                <FetchTest/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('imoocGithub', () => setup);
