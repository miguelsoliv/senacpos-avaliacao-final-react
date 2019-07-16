import React, { Component } from 'react'
import {
    StatusBar, Platform, BackHandler, Alert, Switch, AsyncStorage,
    TouchableHighlight, View, Text, TextInput, Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import ModalBox from '../../components/ModalBox'
import CardView from '../../components/CardView'

class Settings extends Component {
    state = {
        modalVisible: false,
        notifications: false,
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

    handleModalVisibility = visible => {
        this.setState({
            modalVisible: visible
        })
    }

    handleNotifications = newValue => {
        this.setState({
            notifications: newValue
        })

        AsyncStorage.setItem('notifications', "" + newValue)
    }

    handleChange = type => text => {
        this.setState({
            [type]: text
        })
    }

    updateName = () => {
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
                        <Text style={{
                            marginLeft: 20,
                            marginTop: 18,
                            fontWeight: 'bold'
                        }}
                        >
                            Nome de Usuário
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight
                                style={{
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    borderRadius: 6,
                                    padding: 20
                                }}
                                onPress={() => this.handleModalVisibility(true)}
                                underlayColor='rgba(247, 199, 68, 0.3)'
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <TextLabel
                                        style={{ flex: 1 }}
                                        onValueChange={this.handleChange('username')}
                                    >
                                        {this.state.username}
                                    </TextLabel>
                                    <Icon style={{ paddingLeft: 8 }} name='md-create' size={32}
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </CardView>

                    <CardView>
                        <View style={{ marginHorizontal: 20, paddingVertical: 18, flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Notificações</Text>
                                <Text style={{ marginLeft: 20 }}>Seja sempre notificado sobre as notícias do seu condomínio e imobiliária!</Text>
                            </View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
                                trackColor={{ true: '#f7c744' }}
                                onValueChange={(value) => this.handleNotifications(value)}
                                value={this.state.notifications}
                            />
                        </View>
                    </CardView>
                </Container>

                <ModalBox
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.handleModalVisibility(false)}
                    onPressDimmedView={() => this.handleModalVisibility(false)}
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
                                onPress={() => this.handleModalVisibility(false)}>
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

const TextLabel = styled.Text`
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