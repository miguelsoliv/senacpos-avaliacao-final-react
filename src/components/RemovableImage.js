import React, { PureComponent } from 'react'
import { Image, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const { width } = Dimensions.get('window')

class RemovableImage extends PureComponent {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                {...this.props}
            >
                <React.Fragment>
                    <Image style={{
                        width: width / 5,
                        height: width / 5,
                        borderRadius: 6
                    }}
                        source={{ uri: this.props.photoUri }}
                    />
                    <Icon name="md-close-circle" size={20} color='#cc0000'
                        style={{
                            position: 'absolute',
                            right: 2, top: 0
                        }}
                    />
                </React.Fragment>
            </TouchableOpacity>
        )
    }
}

export default RemovableImage