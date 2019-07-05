import { AsyncStorage } from 'react-native';

export const initializeDb = async () => {
    await AsyncStorage.getItem('news') || await AsyncStorage.setItem('news', JSON.stringify([
        { id: 1, title: 'a', text: 'b' },
        { id: 2, title: 'b', text: 'a' },
        { id: 3, title: "Limpeza das Caixas D'Água", text: 'No dia 24/09/2019 será realizada a limpeza das \
        caixas. Favor lembrar que, devido à limpeza, uma possível falta de água poderá ocorrer.' }
    ]))

    await AsyncStorage.getItem('users') || await AsyncStorage.setItem('users', JSON.stringify([
        { id: 1, username: 'client@user.com', password: '12345', name: 'Sample User' }
    ]))
}

export const login = async (username, password) => {
    const users = await AsyncStorage.getItem('users')
    const jsonUsers = JSON.parse(users)

    for (let i = 0; i < jsonUsers.length; i++) {
        if (jsonUsers[i].username == username && jsonUsers[i].password == password) {
            return jsonUsers[i]
        }
    }

    return -1
}