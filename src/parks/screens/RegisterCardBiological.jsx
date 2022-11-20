import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../../auth/context/AuthContext.js';
import {Picker} from '@react-native-picker/picker';
import { useFetchGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm';
import {requestPost} from '../../helpers/requestPost';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView} from "react-native";



export const RegisterCardBiological = () => {

    const {user} = useContext(AuthContext);

    const [getCategorie, setGetCategorie] = useState([]);
    
    const {onChange, onReset, form} = useForm({});

    const {data : getAllCategory} = useFetchGet('get_all_category');
    
    useEffect ( ( ) => {

        try {
            setGetCategorie(JSON.parse(getAllCategory));

        } catch (err) {
            console.log(err);
        }

    }, [getAllCategory] )

    const onSendPost = () => {
        console.log(form);

        const body = {
            commonName: form.commonName,
            scientificName: form.scientificName,
            description: form.description,
            geographicalDistribution: form.geographicalDistribution,
            naturalHistory: form.naturalHistory,
            statusConservation: form.statusConservation == '1' ? true : false,
            authorBiologicData: form.authorBiologicData,
            idCategory: form.idCategory,
            idUser: user.id
        }

        const formData = new FormData();

        formData.append('data', JSON.stringify(body));

        requestPost('add_biologic_data', formData)
            .then (res => {
                Alert.alert('Registro exitoso');
                console.log(res);
                onReset({});
            })

    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 15}}
                >
                    Ficha biologíca
                </Text>

                <View>

                    <TextInput
                        placeholder={'Nombre comun'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'#0093E9'}
                        selectionColor={'#0093E9'}
                        onChangeText={ text => onChange(text, 'commonName') }
                        value={form?.commonName}

                    />

                    <TextInput
                        placeholder={'Nombre cientifico'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'#0093E9'}
                        selectionColor={'#0093E9'}
                        multiline={true}
                        onChangeText={ text => onChange(text, 'scientificName') }
                        value={form?.scientificName}
                    />
                    
                    <TextInput
                        placeholder={'Descripcion'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={{...styles.textInput, height: 150, borderWidth: 1, borderColor: '#0093E9', borderRadius: 10, marginTop: 10}}
                        selectionColor={'#0093E9'}
                        multiline={true}
                        numberOfLines={8}
                        editable={true}                        
                        onChangeText={ text => onChange(text, 'description') }
                        value={form?.description}
                    />                    

                    <TextInput
                        placeholder={'Dsitrubucion geografica'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'#0093E9'}
                        selectionColor={'#0093E9'}
                        multiline={true}
                        onChangeText={ text => onChange(text, 'geographicalDistribution') }
                        value={form?.geographicalDistribution}
                    />
                    
                    <TextInput
                        placeholder={'Historia natural'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={{...styles.textInput, height: 150, borderWidth: 1, borderColor: '#0093E9', borderRadius: 10, marginTop: 10}}
                        selectionColor={'#0093E9'}
                        multiline={true}
                        numberOfLines={8}
                        editable={true}
                        onChangeText={ text => onChange(text, 'naturalHistory') }
                        value={form?.naturalHistory}
                    />

                    <Picker
                        selectedValue={form.statusConservation}
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue, 'statusConservation') }
                    >
                        <Picker.Item label={'Estatus de conservación'} />
                        <Picker.Item label={'Si'} value={'1'} />
                        <Picker.Item label={'No'} value={'0'} />
                    </Picker>

                    
                    <TextInput
                        placeholder={'Autor de la ficha'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'#0093E9'}
                        selectionColor={'#0093E9'}
                        onChangeText={ text => onChange(text, 'authorBiologicData') }
                        value={form?.authorBiologicData}
                    />
                
                    <Picker
                        selectedValue={form.idCategory}
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue, 'idCategory')}
                    >
                        {
                            getCategorie !== undefined && 
                            getCategorie !== null && 
                                getCategorie.map( (item, index) => (
                                    <Picker.Item key={index} label={item.description} value={item.id} />
                                ))
                        }
                    </Picker>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.btnLogin}
                            onPress={onSendPost}
                        >
                            <View style={styles.btnView}>
                                <Text style={styles.textButton}> Guardar </Text>
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 250,
        marginVertical: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40
    },
    btnLogin: {
        shadowColor: '#1e44f1de',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 200,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#0008ff',
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