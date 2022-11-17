import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../../auth/context/AuthContext.js';
import {Picker} from '@react-native-picker/picker';
import { useFetchGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm';
import {requestPost} from '../../helpers/requestPost';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image,ScrollView,Button} from "react-native";



export const EditBiologicData = ({route, navigation}) => {

    const {user} = useContext(AuthContext);

    const {idBiologicData} = route.params;
    console.log('param', idBiologicData);

    const [getCategorie, setGetCategorie] = useState([]);
    const [getBiologicData, setBiologicData] = useState([]);
    
    const {onChange, onReset, form} = useForm({});

    const {data: getBiologicDataById} = useFetchGet(`get_biologic_data_by_id&id=${idBiologicData}`);
    const {data : getAllCategory} = useFetchGet('get_all_category');
    
    useEffect ( ( ) => {

        try {

            const biologicData = JSON.parse(getBiologicDataById)[0];

            onReset({
                commonName: biologicData.commonName,
                scientificName: biologicData.scientificName,
                description: biologicData.description,
                geographicalDistribution: biologicData.geographicalDistribution,
                naturalHistory: biologicData.naturalHistory,
                statusConservation: biologicData.statusConservation == true ? '1' : '0',
                authorBiologicData: biologicData.authorBiologicData,
                idCategory: biologicData.idCategory,    
            });

            setBiologicData(biologicData);
            setGetCategorie(JSON.parse(getAllCategory));

        } catch (err) {
            console.log(err);
        }

    }, [getAllCategory] )

    const onSendPost = () => {
        console.log(form);

        const body = {
            id: idBiologicData,
            commonName: form.commonName,
            scientificName: form.scientificName,
            description: form.description,
            geographicalDistribution: form.geographicalDistribution,
            naturalHistory: form.naturalHistory,
            statusConservation: form.statusConservation == 1 ? 1 : 0,
            authorBiologicData: form.authorBiologicData,
            idCategory: form.idCategory
        }

        const formData = new FormData();

        formData.append('data', JSON.stringify(body));

        requestPost('update_biologic_data', formData)
            .then (res => {
                console.log(res);
                Alert.alert('Exito', 'Datos actualizados correctamente');
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
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        onChangeText={ text => onChange(text, 'commonName') }
                        value={form?.commonName}

                    />

                    <TextInput
                        placeholder={'Nombre cientifico'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'} 
                        onChangeText={ text => onChange(text, 'scientificName') }
                        value={form?.scientificName}
                    />
                    
                    <TextInput
                        placeholder={'Descripcion'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        multiline={true}
                        onChangeText={ text => onChange(text, 'description') }
                        value={form?.description}
                    />                    

                    <TextInput
                        placeholder={'Dsitrubucion geografica'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        onChangeText={ text => onChange(text, 'geographicalDistribution') }
                        value={form?.geographicalDistribution}
                    />
                    
                    <TextInput
                        placeholder={'Historia natural'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
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
                        underlineColorAndroid={'gray'}
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