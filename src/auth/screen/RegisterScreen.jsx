import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image} from 'react-native';

export const RegisterScreen = () => {

    return (
        <View style={styles.container}>
            <Text> Registrarse </Text>
            <View>

                <TextInput
                    placeholder={'Nombre(s)'}
                    style={styles.textInput}
                    secureTextEntry
                />

                <TextInput
                    placeholder={'Apellidos'}
                    style={styles.textInput}
                    secureTextEntry
                />

                <TextInput
                    placeholder={'Titulo Academico'}
                    style={styles.textInput}
                    secureTextEntry
                />

                <TextInput
                    placeholder={'Email'}
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

                <TextInput
                />

                <TouchableOpacity style={styles.btnLogin} >
                    <View style={styles.btnView}>
                        <Text style={styles.textButton}> Ingresar </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
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