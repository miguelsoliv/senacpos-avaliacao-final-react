import React, { PureComponent } from 'react'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'

export default class ModalBox extends PureComponent {
    render() {
        return (
            <Modal
                {...this.props}
                animationType='fade'
                transparent
            >
                <TouchableWithoutFeedback onPress={this.props.onPressDimmedView}>
                    <DimmedView />
                </TouchableWithoutFeedback>

                <ContentView>
                    {this.props.children}
                </ContentView>
            </Modal>
        )
    }
}

const DimmedView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`

const ContentView = styled.View`
    height: 200;
    border-color: #ccc;
    border-width: 1;
    border-style: solid;
    background-color: white;
    elevation: 20;
    padding-horizontal: 10px;
    padding-vertical: 16px;
    border-radius: 4;
`