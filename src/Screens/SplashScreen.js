import React, { Component } from 'react'
import styled from 'styled-components'
import { initializeDb } from '../helpers/db'

class SplashScreen extends Component {
    async componentDidMount() {
        await this.sleep(3000);

        await initializeDb()
        this.props.navigation.navigate('LoginRegister')
    }

    render() {
        return (
            <StyledImage
                source={require('../images/loading.gif')}
                resizeMode="contain"
            />
        )
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

const StyledImage = styled.Image`
    flex: 1;
    width: null;
    height: null;
`

export default SplashScreen    