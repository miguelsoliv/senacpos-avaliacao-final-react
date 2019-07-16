import React, { PureComponent } from 'react'
import styled from 'styled-components'

export default class CardView extends PureComponent {
    render() {
        return (
            <CardCardContainer>
                {this.props.children}
            </CardCardContainer>
        )
    }
}

const CardCardContainer = styled.View`
    border-left-color: #f5b60a;
    border-left-width: 10;
    align-self: stretch;
    background-color: white;
    border-radius: 6;
    margin-horizontal: 20px;
    margin-vertical: 14px;
`