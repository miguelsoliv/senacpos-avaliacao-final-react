import React, { PureComponent } from 'react'
import { ScrollView, ActivityIndicator, TouchableHighlight, Image, Dimensions, View } from 'react-native'
import styled from 'styled-components'
import * as Permissions from 'expo-permissions'
const { width } = Dimensions.get('window')

class Gallery extends PureComponent {
    state = {
        hasCameraRollPermission: null
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        this.setState({
            hasCameraRollPermission: status === 'granted'
        })

        if (this.state.hasCameraRollPermission === true) {
            this.props.getPhotos()
        } else {
            this.props.toggleLoadingPhotos()
        }
    }

    render() {
        if (this.state.hasCameraRollPermission === null) {
            return <View />
        } else if (this.state.hasCameraRollPermission === false) {
            return <Text>Sem acesso à galeria de fotos</Text>
        } else {
            return (
                <ModalContainer>
                    <Button onPress={this.props.onButtonClose}>
                        <ButtonText>Fechar</ButtonText>
                    </Button>
                    {
                        this.props.isLoading ?
                            <ActivityIndicator style={{ flex: 1 }} size='large' color='#00695c' />
                            :
                            <ScrollView
                                contentContainerStyle={{
                                    flexWrap: 'wrap',
                                    flexDirection: 'row'
                                }}
                            >
                                {
                                    this.props.photos.map((p, i) => {
                                        return (
                                            <TouchableHighlight
                                                style={{ opacity: i === this.props.selectedImage ? 0.5 : 1 }}
                                                key={i}
                                                underlayColor='transparent'
                                                onPress={() => this.props.setIndex(i)}
                                            >
                                                <Image
                                                    style={{
                                                        width: width / 3,
                                                        height: width / 3
                                                    }}
                                                    source={{ uri: p.node.image.uri }}
                                                />
                                            </TouchableHighlight>
                                        )
                                    })
                                }
                            </ScrollView>
                    }
                </ModalContainer>
            )
        }
    }
}

const ModalContainer = styled.View`
    padding-top: 20px;
    flex: 1;
    background-color: #e6e6e6;
`

const Button = styled.TouchableOpacity`
    background-color: #f5b60a;
    padding-vertical: 15px;
`

const ButtonText = styled.Text`
    text-align: center;
    color: rgb(32, 53, 70);
    font-weight: bold;
    font-size: 16;
`

export default Gallery