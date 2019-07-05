import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import News from './HomeBottomTabs/News'
import TalkToUs from './HomeBottomTabs/TalkToUs'
import Profile from './HomeBottomTabs/Profile'

export default createBottomTabNavigator({
    News: {
        screen: News,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-home" color={tintColor} size={24} />
            )
        }
    },
    TalkToUs: {
        screen: TalkToUs,
        navigationOptions: {
            tabBarLabel: 'Fale conosco',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-people" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-settings" color={tintColor} size={24} />
            )
        }
    }
},
    {
        backBehavior: "none",
        tabBarOptions: {
            activeTintColor: '#00695c',
            inactiveTintColor: 'grey',
            labelStyle: {
                fontSize: 13,
            },
            style: {
                backgroundColor: '#ffcc80',
            },
        }
    }
)