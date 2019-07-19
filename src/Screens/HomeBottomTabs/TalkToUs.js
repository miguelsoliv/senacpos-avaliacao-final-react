import React, { Component } from 'react'
import { Modal, Text, CameraRoll, StatusBar, Platform, View, ScrollView } from 'react-native'
import styled from 'styled-components'
import PickerTalk from '../../components/PickerTalk'
import RemovableImage from '../../components/RemovableImage'
import RadioButton from '../../components/RadioButton'
import Gallery from '../../components/Gallery'
import Camera from '../../components/Camera'

class News extends Component {
    state = {
        isGalleryVisible: false,
        isCameraVisible: false,
        isLoadingPhotos: true,
        isSuggestSelected: true,
        photos: [],
        index: -1
    }

    toggleLoadingPhotos = () => {
        this.setState({
            isLoadingPhotos: !this.state.isLoadingPhotos
        })
    }

    setIndex = (index) => {
        if (index === this.state.index) index = -1

        this.setState({
            index: index
        })
    }

    removeImage = () => {
        this.setState({
            index: -1
        })
    }

    getPhotos = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos'
        }).then(p =>
            this.setState({
                photos: p.edges,
                isLoadingPhotos: false
            }))
    }

    handleRadioClick = (radioType) => {
        if (radioType === 'suggest' && this.state.isSuggestSelected) return

        if (radioType !== 'suggest' && !this.state.isSuggestSelected) return

        this.setState({
            isSuggestSelected: !this.state.isSuggestSelected
        })
    }

    handleModalVisibility = (modalType) => {
        this.setState({
            [modalType]: modalType === 'isGalleryVisible' ?
                !this.state.isGalleryVisible : !this.state.isCameraVisible
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
                <ScrollView>
                    <Container>
                        <ContainerPanel>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: 16,
                                justifyContent: 'space-evenly',
                                paddingVertical: 18
                            }}>
                                <RadioButton
                                    onPress={() => this.handleRadioClick('suggest')}
                                    selected={this.state.isSuggestSelected}
                                >
                                    <RadioText>Sugestão</RadioText>
                                </RadioButton>
                                <RadioButton
                                    onPress={() => this.handleRadioClick('complain')}
                                    selected={!this.state.isSuggestSelected}
                                >
                                    <RadioText>Reclamação</RadioText>
                                </RadioButton>
                            </View>
                        </ContainerPanel>

                        <ContainerPanel>
                            <View style={{ paddingVertical: 18 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 16,
                                    borderColor: 'black',
                                    backgroundColor: '#f5b60a',
                                    borderWidth: 1,
                                    borderRadius: 4
                                }}>
                                    <Input
                                        placeholder='Forneça uma descrição (Obrigatório)'
                                        placeholderTextColor='black'
                                        multiline
                                    />
                                </View>
                            </View>
                        </ContainerPanel>

                        <ContainerPanel>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Selecione uma foto para enviar (Opcional)
                        </Text>
                            <View style={{ marginHorizontal: 16, paddingVertical: 18 }}>
                                <Button onPress={() => this.handleModalVisibility('isCameraVisible')}>
                                    <ButtonText>Tirar Foto</ButtonText>
                                </Button>
                                <Button onPress={() => this.handleModalVisibility('isGalleryVisible')}>
                                    <ButtonText>Escolher Foto</ButtonText>
                                </Button>
                                {
                                    this.state.index >= 0 ?
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <RemovableImage
                                                onPress={() => this.removeImage()}
                                                photoUri={this.state.photos[this.state.index].node.image.uri}
                                            />
                                            <RemovableImage
                                                onPress={() => this.removeImage()}
                                                photoUri={this.state.photos[this.state.index].node.image.uri}
                                            />
                                            <RemovableImage
                                                onPress={() => this.removeImage()}
                                                photoUri={this.state.photos[this.state.index].node.image.uri}
                                            />
                                        </View>

                                        :
                                        null
                                }
                            </View>
                        </ContainerPanel>

                        <ContainerPanel>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Enviar para: </Text>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: 16,
                                paddingVertical: 18
                            }}>
                                <PickerTalk />
                            </View>
                        </ContainerPanel>

                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            paddingVertical: 18
                        }}>
                            <Button style={{ flex: 1 }}>
                                <ButtonText>Enviar</ButtonText>
                            </Button>
                        </View>

                        <Modal
                            animationType='slide'
                            onRequestClose={() => this.handleModalVisibility('isCameraVisible')}
                            visible={this.state.isCameraVisible}
                        >
                            <Camera />
                        </Modal>

                        <Modal
                            animationType='slide'
                            onRequestClose={() => this.handleModalVisibility('isGalleryVisible')}
                            visible={this.state.isGalleryVisible}
                        >
                            <Gallery
                                onButtonClose={() => this.handleModalVisibility('isGalleryVisible')}
                                isLoading={this.state.isLoadingPhotos}
                                setIndex={(value) => this.setIndex(value)}
                                selectedImage={this.state.index}
                                getPhotos={this.getPhotos}
                                photos={this.state.photos}
                                toggleLoadingPhotos={this.toggleLoadingPhotos}
                            />
                        </Modal>
                    </Container>
                </ScrollView>
            </ContainerSafeArea >
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

const ContainerPanel = styled.View`
    align-self: stretch;
    background-color: #f2f2f2;
    padding: 14px;
    margin-bottom: 10px;
`

const Button = styled.TouchableOpacity`
    background-color: #f5b60a;
    padding-vertical: 15px;
    margin-bottom: 8px;
`

const Input = styled.TextInput`
    flex: 1;
    background-color: rgba(255, 255, 255, 0.1);
    margin-horizontal: 5px;
    padding-vertical: 12px;
`

const RadioText = styled.Text`
    font-size: 16;
    margin-horizontal: 5;
`

const ButtonText = styled.Text`
    text-align: center;
    color: rgb(32, 53, 70);
    font-weight: bold;
    font-size: 16;
`

export default News