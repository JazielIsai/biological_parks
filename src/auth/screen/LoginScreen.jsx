import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Background} from "../components/Background";
import {AuthContext} from "../context/AuthContext";

export const LoginScreen = () => {

    const navigation = useNavigation();

    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {

        login(email, password)
        navigation.navigate('BiologicalPark', { screen: 'Home' });

    }

    return(
        <>
            <Background />
            <View style={styles.container}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}> Inicio de Sessión </Text>
                <View>
                    <TextInput
                        placeholder={'Usuario / Email'}
                        secureTextEntry
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        style={styles.textInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid={'white'}
                        selectionColor={'white'}
                        onChangeText={ (value) => setEmail(value) }
                    />
                    <TextInput
                        placeholder={'Contraseña'}
                        selectionColor={'white'}
                        secureTextEntry
                        style={styles.textInput}
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        underlineColorAndroid={'white'}
                        onChangeText={ (value) => setPassword(value) }
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.btnLogin}
                            onPress={ onLogin }
                        >
                            <View style={styles.btnView}>
                                <Text style={styles.textButton}> Ingresar </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnLink}>
                        <TouchableOpacity
                            style={styles.btnLinkGoRegister}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text
                                style={{color: 'rgb(187,204,246)'}}
                            >
                                Registrarse
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
