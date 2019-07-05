import React, { Component } from 'react'
import { StatusBar, Keyboard } from 'react-native'
import styled from 'styled-components'
import { login } from '../helpers/db'

/*
<Button
                    onPress={this.onPressLearnMore}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />*/

class Login extends Component {
    async onPressLearnMore() {

    }

    render() {
        return (
            <ContainerSafeArea>
                <StatusBar barStyle='light-content' />
                <ContainerKeyboardAvoid behavior='padding'>
                    <ContainerTouchNoFeed onPress={Keyboard.dismiss}>
                        <Container>
                            <LogoContainer>
                                <Logo>Insert Logo Here</Logo>
                                <Title>Account Information</Title>
                            </LogoContainer>
                            <InfoContainer>
                                <Input
                                    placeholder='E-mail'
                                    placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.refs.inputPassword.focus()}
                                    keyboardShouldPersistTaps={'always'}
                                />
                                <Input
                                    placeholder='Senha'
                                    placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                    returnKeyType={'go'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    ref={'inputPassword'}
                                />
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

export default Login