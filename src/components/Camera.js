import React, { PureComponent } from 'react'
import { Text, View, CameraRoll } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'

class CameraComponent extends PureComponent {
    state = {
        hasCameraPermission: null
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted'
        })
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 1 }
            await this.camera.takePictureAsync(options).then(photo => {
                CameraRoll.saveToCameraRoll(photo.uri)
            })
        }
    }

    render() {
        if (this.state.hasCameraPermission === null) {
            return <View />
        } else if (this.state.hasCameraPermission === false) {
            return <Text>Sem acesso à câmera</Text>
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={(ref) => this.camera = ref}
                        style={{ flex: 1, flexDirection: 'row' }}
                        type={Camera.Constants.Type.back}
                    >
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <CircleButton onPress={() => this.takePicture()}>
                                <Icon name="md-camera" size={28} color='white' />
                            </CircleButton>
                        </View>
                    </Camera>
                </View>
            )
        }
    }
}

const CircleButton = styled.TouchableOpacity`
    border-width: 1;
    border-color: rgba(0, 0, 0, 0.2);
    width: 90;
    height: 90;
    border-radius: 45;
    background-color: #00695c;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-bottom: 10px;
`

export default CameraComponent