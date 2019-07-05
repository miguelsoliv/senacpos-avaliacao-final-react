import React, { Component } from 'react'
import { View, Text, StatusBar, Platform } from 'react-native'

class News extends Component {
    render() {
        return (
            <View style={{
                paddingTop:
                    Platform.OS === 'android'
                        ? StatusBar.currentHeight : 20,
                flex: 1,
                alignItems: 'center',
            }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>News</Text>
            </View>
        )
    }
}

export default News