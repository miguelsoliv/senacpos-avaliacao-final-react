import React, { PureComponent } from 'react';
import styled from 'styled-components'

class FlatListItem extends PureComponent {
    render() {
        return (
            <Container>
                <Title>{this.props.title}</Title>
                <StyledText>{this.props.text}</StyledText>
            </Container>
        )
    }
}

const Container = styled.View`
    margin: 20px;
    flex: 1;
`

const Title = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: white;
`

const StyledText = styled.Text`
    color: white;
`

export default FlatListItem