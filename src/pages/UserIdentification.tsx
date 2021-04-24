import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/core'

export function UserIdentification(){

    const navigation = useNavigation()
    const [isFocused, setIsFofused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()

    function handleInputBlur(){
        setIsFofused(false)
        setIsFilled(!!name)
    }
    function handleInputFocus(){
        setIsFofused(true)
    }
    function handleInputChange(value: string){
        setIsFilled(!!value)
        setName(value)
    }

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Você não informou seu nome! 😥')
            try{
                await AsyncStorage.setItem('@plantmanager:user', name)
                navigation.navigate('Confirmation',{
                    title: 'Prontinho',
                    subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                    buttonTitle: 'Começar',
                    icon: 'smile',
                    nextScreen: 'PlantSelect',
                })
            }catch{
                Alert.alert('Não foi possível salvar seu nome! 😥')
            }
        
           
    }
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '🙂' : '🤔'}
                                    
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos{'\n'}
                                    chamar você?
                                </Text>
                            </View>
                            
                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderBottomColor: colors.green}
                                ]}
                                placeholder="Digite seu nome"   
                                onBlur ={handleInputBlur}                
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />   
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                
                                />                 
                            </View>
                        </View>
                        
                    </View>
                </TouchableWithoutFeedback> 
            </KeyboardAvoidingView>
        </SafeAreaView>
        //Comentário

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: fonts.heading,
        marginTop: 20

    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center'

    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
})