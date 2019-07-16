import React, { Component } from 'react'
import { Animated, Image } from 'react-native'
import styled from 'styled-components'
import { initializeDb } from '../helpers/db'

class SplashScreen extends Component {
    state = {
        fadeAnim: new Animated.Value(0)
    }

    componentDidMount() {
        initializeDb()

        Animated.timing(this.state.fadeAnim,
            {
                toValue: 1,
                duration: 750
            }
        ).start(() => {
            setTimeout(() => {
                Animated.timing(this.state.fadeAnim,
                    {
                        toValue: 0,
                        duration: 750
                    }
                ).start(() => this.props.navigation.navigate('LoginRegister'))
            }, 1250)
        })
    }

    render() {
        return (
            <Container>
                <Animated.View style={{ opacity: this.state.fadeAnim }}>
                    <Image source={require('../images/logo.png')} />
                </Animated.View>
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
    background-color: #325370;
    align-items: center;
    justify-content: center;
`

export default SplashScreen    