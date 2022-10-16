import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Background} from "../components/Background";

export const LoginScreen = () => {

    const navigation = useNavigation();

    return(
        <>
            <Background />
            <View style={styles.container}>
                <Text> Inicio de Sessión </Text>
                <View>
                    <TextInput
                        placeholder={'Usuario / Email'}
                        secureTextEntry
                        style={styles.textInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}

                    />
                    <TextInput
                        placeholder={'Contraseña'}
                        secureTextEntry
                        style={styles.textInput}

                    />

                    <TouchableOpacity style={styles.btnLogin} >
                        <View style={styles.btnView}>
                            <Text style={styles.textButton}> Ingresar </Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Button
                            title="Go to Details"
                            onPress={() => navigation.navigate('Register')}
                        />
                    </View>

                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        height: 50,
        width: 200,
        marginVertical: 10,
    },
    btnLogin: {
        backgroundColor: '#5ccb5f',
        borderRadius: 10,
        height: 34,
        width: 100,
        marginVertical: 10,
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
