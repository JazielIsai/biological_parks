import { Picker } from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image,ScrollView } from 'react-native';



export const RegisterPark = () => {
    const [selectedValue, setSelectedValue]=useState("guanajuato");
    // con

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 18}}
                >
                    Registrar parque
                </Text>

                <View>

                    <TextInput
                        placeholder={'Nombre'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}

                    />

                    <TextInput
                        placeholder={'Antecedentes'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />

                    <TextInput
                        placeholder={'Área'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />

                    <TextInput
                        placeholder={'Forma'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />

                    <TextInput
                        placeholder={'Colindancias'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                    />
                    
                    <TextInput
                        placeholder={'Áreas de recreo'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />
                    
                    <TextInput
                        placeholder={'Calle'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />
                    
                    <TextInput
                        placeholder={'Colonia'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                    />
                    <TextInput
                        placeholder={'Latitud'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}

                    />
                    <TextInput
                        placeholder={'Longitud'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                    />

                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Pénjamo" value="penjamo"/>
                        <Picker.Item label="Irapuato" value="irapuato"/>
                        <Picker.Item label="Salamanchester" value="salamanchester"/>
                        <Picker.Item label="La Piedad" value="piedad"/>
                    </Picker>

                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Guanajuato" value="guanajuato"/>
                        <Picker.Item label="Jalisco" value="jalisco"/>
                        <Picker.Item label="Michoacan" value="michoacan"/>
                    </Picker>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnLogin} >
                            <View style={styles.btnView}>
                                <Text style={styles.textButton}> Registrarse </Text>
                            </View>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
        </ScrollView>

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
        borderColor: 'rgba(0,128,0,0.9)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'rgb(0,0,0)',
        fontSize: 20,
        textAlign: 'center',
    },
    btnLink: {
        marginTop: 20,
        alignItems: 'flex-end'
    },
    btnLinkGoRegister: {
        borderColor: 'rgba(128,128,128,1)',
        borderBottomWidth: 1
    }
});