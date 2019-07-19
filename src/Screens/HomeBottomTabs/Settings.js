import React, { Component } from 'react'
import {
    StatusBar, Platform, BackHandler, Alert, Switch,
    AsyncStorage, View, Text, TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import ModalBox from '../../components/ModalBox'
import CardView from '../../components/CardView'

class Settings extends Component {
    state = {
        modalVisible: false,
        notifications: false,
        hibernation: false,
        username: 'Sample User',
        modalUsername: ''
    }

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

    handleModalVisibility = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    handleNotifications = () => {
        this.setState({
            notifications: !this.state.notifications
        }, () => {
            AsyncStorage.setItem('notifications', "" + !this.state.notifications)
        })
    }

    handleHibernation = () => {
        this.setState({
            hibernation: !this.state.hibernation
        }, () => {
            AsyncStorage.setItem('hibernation', "" + !this.state.hibernation)

            if (this.state.hibernation) {
                activateKeepAwake()
            } else {
                deactivateKeepAwake()
            }
        })
    }

    handleChange = type => text => {
        this.setState({
            [type]: text
        })
    }

    updateName = () => {
        if (!this.state.modalUsername) {
            this.handleModalVisibility()
            return
        }

        this.setState({
            username: this.state.modalUsername,
            modalVisible: false
        })
    }

    render() {
        return (
            <ContainerSafeArea style={{
                paddingTop:
                    Platform.OS === 'android'
                        ? StatusBar.currentHeight : 20
            }}>
                <StatusBar barStyle='light-content' />
                <Container>
                    <CardView>
                        <CardTitleText>Nome de Usuário</CardTitleText>
                        <CardInfoContainer>
                            <CardTouchableInput
                                onPress={() => this.handleModalVisibility()}
                                underlayColor='rgba(247, 199, 68, 0)'
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <StyledTextInput onValueChange={this.handleChange('username')}>
                                        {this.state.username}
                                    </StyledTextInput>
                                    <Icon style={{ paddingLeft: 8 }} name='md-create' size={32} />
                                </View>
                            </CardTouchableInput>
                        </CardInfoContainer>
                    </CardView>

                    <CardView>
                        <CardTitleText>Notificações</CardTitleText>
                        <CardInfoContainer>
                            <Text style={{
                                marginLeft: 20,
                                flex: 1
                            }}
                            >
                                Seja sempre notificado sobre as notícias do seu condomínio e imobiliária!
                                </Text>
                            <Switch
                                style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
                                trackColor={{ true: '#f7c744' }}
                                onValueChange={() => this.handleNotifications()}
                                value={this.state.notifications}
                            />
                        </CardInfoContainer>
                    </CardView>

                    <CardView>
                        <CardTitleText>Hibernação</CardTitleText>
                        <CardInfoContainer>
                            <Text style={{
                                marginLeft: 20,
                                flex: 1
                            }}
                            >
                                Permitir que o aplicativo não deixe o aparelho hibernar
                                </Text>
                            <Switch
                                style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
                                trackColor={{ true: '#f7c744' }}
                                onValueChange={() => this.handleHibernation()}
                                value={this.state.hibernation}
                            />
                        </CardInfoContainer>
                    </CardView>
                </Container>

                <ModalBox
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.handleModalVisibility()}
                    onPressDimmedView={() => this.handleModalVisibility()}
                >
                    <Text style={{ fontWeight: 'bold' }}>Digite o seu nome</Text>
                    <ModalContainerInput>
                        <TextInput
                            autoFocus
                            defaultValue={this.state.username}
                            onChangeText={this.handleChange('modalUsername')} />
                    </ModalContainerInput>

                    <ModalContainerButtons>
                        <View style={{ alignItems: 'flex-end' }}>
                            <ModalButtonRed activeOpacity={0.7}
                                onPress={() => this.handleModalVisibility()}>
                                <ButtonText>Cancelar</ButtonText>
                            </ModalButtonRed>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginLeft: 6 }}>
                            <ModalButtonGreen activeOpacity={0.7}
                                onPress={() => this.updateName()}>
                                <ButtonText>Salvar</ButtonText>
                            </ModalButtonGreen>
                        </View>
                    </ModalContainerButtons>
                </ModalBox>
            </ContainerSafeArea>
        )
    }
}

const ContainerSafeArea = styled.SafeAreaView`
    flex: 1;
    background-color: #325370;
`

const Container = styled.View`
    flex: 1;
    align-items: center;
`

const CardInfoContainer = styled.View`
    flex-direction: row;    
    margin-horizontal: 20;
    padding-vertical: 18;
`

const ModalContainerInput = styled.View`
    flex: 1;
    border-bottom-width: 1;
    border-color: black;
    padding-bottom: 4;
    margin-horizontal: 10px;
    margin-bottom: 10px;
    justify-content: flex-end;
`

const ModalContainerButtons = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 15;
`

const CardTouchableInput = styled.TouchableHighlight`
    flex: 1;
    align-self: stretch;
    border-radius: 6;
`

const ModalButtonRed = styled.TouchableOpacity`
    border-color: red;
    border-width: 1;
    border-radius: 10;
    padding-vertical: 5px;
    margin-vertical: 10px;
`

const ModalButtonGreen = styled.TouchableOpacity`
    border-color: green;
    border-width: 1;
    border-radius: 10;
    padding-vertical: 5px;
    margin-vertical: 10px;
`

const CardTitleText = styled.Text`
    margin-left: 20;
    margin-top: 18;
    font-weight: bold;
`

const StyledTextInput = styled.Text`
    flex: 1;
    height: 40;
    background-color: #ffe066;
    border-radius: 4;
    padding-horizontal: 10px;
    padding-top: 10px
`

const ButtonText = styled.Text`
    font-size: 16;
    text-align: center;
    margin: 10px;
    color: black;
`

export default Settings