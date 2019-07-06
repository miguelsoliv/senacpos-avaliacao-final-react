import React, { PureComponent } from 'react';
import { FlatList, Platform, StatusBar, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components'
import { getNews } from '../../helpers/db'
import FlatListItem from '../../components/FlatListItem'

class News extends PureComponent {
    state = {
        data: [],
        isLoading: true
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async componentDidMount() {
        const newsList = await getNews()

        await this.sleep(3000)

        this.setState({
            data: JSON.parse(newsList),
            isLoading: false
        })
    }

    applyKeyExtractor = (item) => "" + item.id;

    renderItens = ({ item }) => (
        <FlatListItem
            title={item.title}
            text={item.text}
        />
    );

    renderSeparator = () => {
        return (
            <Separator />
        )
    }

    renderFooter = () => {
        if (!this.state.isLoading) return null

        return (
            <View style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderTopColor: '#ced0ce',
                alignContent: "center"
            }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    render() {
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

export default News