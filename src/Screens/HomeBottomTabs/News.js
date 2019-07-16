import React, { PureComponent } from 'react';
import { FlatList, Platform, StatusBar, ActivityIndicator, BackHandler, Alert } from 'react-native';
import styled from 'styled-components'
import { getNews } from '../../helpers/db'
import FlatListItem from '../../components/FlatListItem'

class News extends PureComponent {
    state = {
        data: [],
        isLoading: true
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            Alert.alert(
                'Confirmação',
                'Deseja sair do aplicativo?',
                [
                    {
                        text: 'Não',
                        style: 'cancel'
                    },
                    {
                        text: 'Sim',
                        onPress: () => { BackHandler.exitApp() }
                    }
                ]
            )

            return true
        })

        const newsList = await getNews()

        await this.sleep(1250)

        this.setState({
            data: JSON.parse(newsList),
            isLoading: false
        })
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    applyKeyExtractor = (item) => "" + item.id

    renderItens = ({ item }) => {
        return (
            <FlatListItem
                title={item.title}
                text={item.text}
            />
        )
    }

    renderSeparator = () => {
        return (
            <Separator />
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingContainer>
                    <ActivityIndicator size='large' color='#f7c744' />
                </LoadingContainer>
            )
        }

        return (
            <FlatList
                style={{
                    paddingTop:
                        Platform.OS === 'android'
                            ? StatusBar.currentHeight : 20,
                    backgroundColor: '#325370'
                }}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this.applyKeyExtractor}
                renderItem={this.renderItens}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }
}

const Separator = styled.View`
    height: 1;
    background-color: #ced0ce;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
`

const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #325370;
`

export default News