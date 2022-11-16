import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import {Background} from "../components/Background";
import {useNavigation} from "@react-navigation/native";
import { requestPost } from '../../helpers/requestPost';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const navigation = useNavigation();

    const { form, onChange, onReset } = useForm({});

    const onRegister = () => {
        Alert.alert('Register');

        const body = {
            firstname: form.firstname,
            lastname: form.lastname,
            academicTitle: form.academicTitle,
            email: form.email,
            password: form.password,
            id_rol: 2
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify(body));

        requestPost('add_new_user', formData)
            .then( resp => {
                console.log(resp);
                if (resp.includes('0')) {
                    Alert.alert('Usuario creado con éxito');
                    onReset({});
                    navigation.navigate('Login')
                } else {
                    Alert.alert('Error al crear el usuario, verfique los datos');
                }
            })
    }

    return (
        <>
            <Background />
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
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'firstname') }
                        value={form.firstname}

                    />

                    <TextInput
                        placeholder={'Apellidos'}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        style={styles.textInput}
                        underlineColorAndroid={'white'}
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'lastname') }
                        value={form.lastname}

                    />

                    <TextInput
                        placeholder={'Titulo Academico'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        underlineColorAndroid={'white'}
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'academicTitle') }
                        value={form.academicTitle}

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
                        onChangeText={ (value) => onChange(value, 'email') }
                        value={form.email}

                    />

                    <TextInput
                        placeholder={'Contraseña'}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        secureTextEntry
                        style={styles.textInput}
                        underlineColorAndroid={'white'}
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'password') }
                        value={form.password}

                    />

                    <TextInput
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.btnLogin}
                            onPress={onRegister}
                        >
                            <View style={styles.btnView}>
                                <Text style={styles.textButton}> Registrarse </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnLink}>
                        <TouchableOpacity
                            style={styles.btnLinkGoRegister}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text
                                style={{color: 'rgb(187,204,246)'}}
                            >
                                Iniciar sessión
                            </Text>
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