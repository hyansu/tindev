import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {StyleSheet, KeyboardAvoidingView, Platform, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import logo from '../assets/logo.png'

import api from '../services/api'

export default function Login({navigation}){

    const [user, setUser] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', {user})
            }
        })
    },[])

    async function handleLogin(){
        const result = await api.post('/devs', {username: user})
        const {_id} = result.data
        await AsyncStorage.setItem('user', _id)
        console.log(_id)

        navigation.navigate('Main', {user: _id})
    }

    return (
        <KeyboardAvoidingView style={stylus.container} behavior="padding" enabled={Platform.OS == 'ios'}>
            <Image source={logo} style={stylus.logo} />
            <TextInput placeholder="Entre com o seu Github" autoCapitalize="none" autoCorrect={false} style={stylus.textInput} value={user} onChangeText={setUser} />
            <TouchableOpacity style={stylus.button} onPress={handleLogin}>
                <Text style={stylus.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const stylus = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    logo: {
        
    },
    textInput: {
        height: 46,
        alignSelf: 'stretch',
        borderRadius: 4,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        marginTop: 20,
        marginHorizontal: 15,
    },
    button:{
        height: 46,
        alignSelf: 'stretch',
        borderRadius: 4,
        backgroundColor: '#df4723',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',        
        marginTop: 10,
        marginHorizontal: 15
    },
    buttonText:{
        color: '#fff'
    }
})