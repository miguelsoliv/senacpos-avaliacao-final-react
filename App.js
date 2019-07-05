import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import SplashScreen from './src/Screens/SplashScreen'
import Login from './src/Screens/Login'
import Home from './src/Screens/Home'
//console.disableYellowBox = true

const InitialScreen = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  }
})

const LoginRegister = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
})

const Internal = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  }
})

const Root = createSwitchNavigator({
  InitialScreen,
  LoginRegister,
  Internal
})

export default createAppContainer(Root)