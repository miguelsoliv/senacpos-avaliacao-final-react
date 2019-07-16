import React, { Component } from 'react'
import { View, Text, StatusBar, Platform, BackHandler, Alert } from 'react-native'

class News extends Component {
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            Alert.alert(
                'Confirmação',
                'Deseja sair do aplicativo?',
                [
                    {
                        text: 'Não',
                        style: 'cancel'
                    },
                    {
                        text: 'Sim',
                        onPress: () => { BackHandler.exitApp() }
                    }
                ]
            )

            return true
        })
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#325370',
                flex: 1, alignItems: 'center',
                paddingTop:
                    Platform.OS === 'android'
                        ? StatusBar.currentHeight : 20
            }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>Talk To Us</Text>
            </View>
        )
    }
}

export default News