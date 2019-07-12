import { AsyncStorage } from 'react-native';

export const initializeDb = async () => {
    await AsyncStorage.getItem('news') || await AsyncStorage.setItem('news', JSON.stringify([
        { id: 1, date: '01-07-2019', title: 'Título Notícia 1', text: 'texttexttexttexttexttexttexttexttexttexttexttexttexttext' },
        { id: 2, date: '03-07-2019', title: 'Título Notícia 2', text: 'Notice 2 text' },
        { id: 3, date: '06-07-2019', title: "Título Notícia 3", text: 'Text for notice 3 with id = 3.' }
    ]))

    await AsyncStorage.getItem('users') || await AsyncStorage.setItem('users', JSON.stringify([
        { id: 1, email: 'client@user.com', password: '12345', name: 'Sample User' }
    ]))
}

export const login = async (email, password) => {
    const users = await AsyncStorage.getItem('users')
    const jsonUsers = JSON.parse(users)

    for (let i = 0; i < jsonUsers.length; i++) {
        if (jsonUsers[i].email == email && jsonUsers[i].password == password) {
            return jsonUsers[i]
        }
    }

    return -1
}

export const getNews = async () => {
    const news = await AsyncStorage.getItem('news')
    return news
}