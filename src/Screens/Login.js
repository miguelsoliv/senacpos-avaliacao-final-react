import React, { Component } from 'react'
import { StatusBar, Keyboard, ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { login } from '../helpers/db'

class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false
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

        await this.sleep(3000)

        const response = await login(email, password)

        if (response === -1) {
            alert('Credenciais inválidas')

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
                        <Container>
                            <LogoContainer>
                                <Logo>Insert Logo Here</Logo>
                                <Title>Bem-Vindo(a)</Title>
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

const Logo = styled.Text`
    font-family: serif;
    font-style: italic;
    font-size: 24;
`

const Title = styled.Text`
    color: #f7c744;
    font-size: 18;
    text-align: center;
    margin-top: 5;
    opacity: 0.9;
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