import React, { Component } from 'react'
import { View, Text, StatusBar, Platform } from 'react-native'

class News extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: '#325370',
                flex: 1, alignItems: 'center',
                paddingTop:
                    Platform.OS === 'android'
                        ? StatusBar.currentHeight : 20,
            }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>Profile</Text>
            </View>
        )
    }
}

export default News