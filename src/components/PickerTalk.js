import React, { PureComponent } from 'react'
import { Picker } from 'react-native'
import styled from 'styled-components'

class PickerTalk extends PureComponent {
    state = {
        option: null,
        options: ['Síndico', 'Imobiliária', 'Ambos']
    }

    handleChange = newValue => {
        this.setState({
            option: newValue
        })
    }

    render() {
        return (
            <Container {...this.props}>
                <Picker
                    style={{ height: 50 }}
                    selectedValue={this.state.option}
                    onValueChange={(newValue) => this.handleChange(newValue)}
                >
                    {
                        this.state.options.map((option, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={option}
                                    value={option}
                                />
                            )
                        })
                    }
                </Picker>
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
    border-color: black;
    background-color: #f5b60a;
    border-width: 1;
    border-radius: 4;
`

export default PickerTalk