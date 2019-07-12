import React, { Component } from 'react'
import { Image, StatusBar, Keyboard, ActivityIndicator, Alert, Animated } from 'react-native'
import styled from 'styled-components'
import { login } from '../helpers/db'

class Login extends Component {
    state = {
        fadeAnim: new Animated.Value(0),
        email: 'client@user.com',
        password: '12345',
        isLoading: false
    }

    componentDidMount() {
        Animated.timing(this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1000
            }
        ).start()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    handleChange = type => text => {
        this.setState({
            [type]: text
        })
    }

    handleLogin = async () => {
        const { email, password } = this.state

        if (email == '' || password == '') return

        this.setState({
            isLoading: true
        })

        await this.sleep(1500)

        const response = await login(email, password)

        if (response === -1) {
            Alert.alert('Credenciais inválidas', 'E-mail ou senha incorreta')

            this.setState({
                isLoading: false
            })
            return
        }

        this.props.navigation.navigate('Internal')
    }

    render() {
        const { email, password, isLoading } = this.state
        return (
            <ContainerSafeArea>
                <StatusBar barStyle='light-content' />
                <ContainerKeyboardAvoid behavior='padding'>
                    <ContainerTouchNoFeed onPress={Keyboard.dismiss}>
                        <Container as={Animated.View} style={{ opacity: this.state.fadeAnim }}>
                            <LogoContainer>
                                <Image source={require('../images/welcome_image.png')} />
                            </LogoContainer>
                            <InfoContainer>
                                {
                                    isLoading
                                        ?
                                        <ActivityIndicator size='large' color='#f7c744' />
                                        :
                                        <React.Fragment>
                                            <Input
                                                placeholder='E-mail'
                                                placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                                returnKeyType='next'
                                                autoCorrect={false}
                                                autoCapitalize='none'
                                                keyboardType='email-address'
                                                onSubmitEditing={() => this.refs.inputPassword.focus()}
                                                blurOnSubmit={false}
                                                onChangeText={this.handleChange('email')}
                                                value={email}
                                            />
                                            <Input
                                                placeholder='Senha'
                                                placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                                returnKeyType='go'
                                                autoCorrect={false}
                                                autoCapitalize='none'
                                                onSubmitEditing={() => this.handleLogin()}
                                                secureTextEntry
                                                ref={'inputPassword'}
                                                onChangeText={this.handleChange('password')}
                                                value={password}
                                            />
                                            <Button onPress={this.handleLogin}>
                                                <ButtonText>Entrar</ButtonText>
                                            </Button>
                                        </React.Fragment>
                                }
                            </InfoContainer>
                        </Container>
                    </ContainerTouchNoFeed>
                </ContainerKeyboardAvoid>
            </ContainerSafeArea>
        )
    }
}

const ContainerSafeArea = styled.SafeAreaView`
    flex: 1;
    background-color: #325370;
    flex-direction: column;
`

const ContainerKeyboardAvoid = styled.KeyboardAvoidingView`
    flex: 1;
    flex-direction: column;
`

const ContainerTouchNoFeed = styled.TouchableWithoutFeedback`
    flex: 1;
    flex-direction: column;
`

const Container = styled.View`
    flex: 1;
    flex-direction: column;
`

const LogoContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const InfoContainer = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 200;
    padding: 20px;
`

const Input = styled.TextInput`
    height: 40;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    padding-horizontal: 10px;
    margin-bottom: 20px;
`

const Button = styled.TouchableOpacity`
    background-color: #f7c744;
    padding-vertical: 15px;
`

const ButtonText = styled.Text`
    text-align: center;
    color: rgb(32, 53, 70);
    font-weight: bold;
    font-size: 18;
`

export default Login