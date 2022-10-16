import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image} from 'react-native';


export const RegisterPark = () => {

    return (
        <>
            <View style={styles.container}>
                <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 14}}
                >
                    Registrarse
                </Text>

                <View>

                    <TextInput
                        placeholder={'Nombre(s)'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        underlineColorAndroid={'white'}
                        secureTextEntry
                        selectionColor={'white'}

                    />

                    <TextInput
                        placeholder={'Apellidos'}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        style={styles.textInput}
                        underlineColorAndroid={'white'}
                        secureTextEntry
                        selectionColor={'white'}

                    />

                    <TextInput
                        placeholder={'Titulo Academico'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        underlineColorAndroid={'white'}
                        secureTextEntry
                        selectionColor={'white'}

                    />

                    <TextInput
                        placeholder={'Email'}
                        secureTextEntry
                        style={styles.textInput}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid={'white'}
                        selectionColor={'white'}

                    />

                    <TextInput
                        placeholder={'Contraseña'}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        secureTextEntry
                        style={styles.textInput}
                        underlineColorAndroid={'white'}
                        selectionColor={'white'}

                    />

                    <TextInput
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnLogin} >
                            <View style={styles.btnView}>
                                <Text style={styles.textButton}> Registrarse </Text>
                            </View>
                        </TouchableOpacity>
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
        height: 50,
        width: 200,
        marginVertical: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    btnLogin: {
        borderWidth: 2,
        borderColor: 'rgb(231,231,228)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'rgb(229,227,227)',
        fontSize: 20,
        textAlign: 'center',
    },
    btnLink: {
        marginTop: 20,
        alignItems: 'flex-end'
    },
    btnLinkGoRegister: {
        borderColor: 'rgba(156,213,248,0.4)',
        borderBottomWidth: 1
    }
});