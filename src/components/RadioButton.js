import React, { PureComponent } from 'react'
import styled from 'styled-components'

class RadioButton extends PureComponent {
    render() {
        return (
            <Container {...this.props} activeOpacity={1} onPress={this.props.onPress}>
                <OuterCircle onPress={this.props.onPress}>
                    {
                        this.props.selected ?
                            <InnerCircle />
                            :
                            null
                    }
                </OuterCircle>
                {this.props.children}
            </Container>
        )
    }
}

const Container = styled.TouchableOpacity`
    flex-direction: row;
`

const OuterCircle = styled.TouchableOpacity`
    height: 24;
    width: 24;
    border-radius: 12;
    border-width: 2;
    border-color: #000;
    align-items: center;
    justify-content: center;
`

const InnerCircle = styled.View`
    height: 12;
    width: 12;
    border-radius: 6;
    background-color: #000;
`

export default RadioButton