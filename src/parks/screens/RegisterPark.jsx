import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../auth/context/AuthContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm';
import { requestPost } from '../../helpers/requestPost';



export const RegisterPark = () => {
    
    const {user} = useContext(AuthContext);

    const [getCityState, setGetCityState] = useState([]);
    const [getMunicipaly, setGetMunicipaly] = useState([]);

    const {onChange, onReset, form} = useForm({
        cityStateId: '1',
        nameMunicipalityId: '1',
    });
    
    const {data : getAllCityState } = useFetchGet('get_all_cityState');
    const {data :  getAllMunicipalyByCityStateId} = useFetchGet(`get_all_municipality_by_id&cityState_id=${form?.cityStateId}`);

    useEffect ( ( ) => {

        try {
            setGetCityState(JSON.parse(getAllCityState));
            setGetMunicipaly(JSON.parse(getAllMunicipalyByCityStateId));

        } catch (err) {
            console.log(err);
        }

    }, [getAllCityState, getAllMunicipalyByCityStateId] )

    const sendPost = () => {

        const body = {
            namePark: form.namePark,
            trainingbackground: form.trainingbackground,
            areaha: form.areaha,
            form: form.form,
            boundaries: form.boundaries,
            recreationareas: form.recreationareas,
            street: form.street,
            suburb: form.suburb,
            latitude: parseFloat(form.latitude),
            length: parseFloat(form.length),
            idcitystates: form.cityStateId,
            idmunicipality: form.nameMunicipalityId,
            idUser: user.id
        }

        console.log(body);

        const formData = new FormData();

        formData.append('data', JSON.stringify(body));

        requestPost('add_park', formData)
            .then( res => {
                Alert.alert('Parque registrado con exito');
                console.log(res);
                onReset({
                    cityStateId: '1',
                    nameMunicipalityId: '1',
                });
            } )
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 15}}
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
                        onChangeText={ (value) => onChange(value, 'namePark') }
                        value={form?.namePark}
                    />

                    <TextInput
                        placeholder={'Antecedentes'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        onChangeText={ (value) => onChange(value, 'trainingbackground') }
                        value={form?.trainingbackground}
                    />

                    <TextInput
                        placeholder={'Área'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        onChangeText={ (value) => onChange(value, 'areaha') }
                        value={form?.areaha}
                    />

                    <TextInput
                        placeholder={'Forma'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        onChangeText={ (value) => onChange(value, 'form') }
                        value={form?.form}
                    />

                    <TextInput
                        placeholder={'Colindancias'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'boundaries') }
                        value={form?.boundaries}
                    />
                    
                    <TextInput
                        placeholder={'Áreas de recreo'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        onChangeText={ (value) => onChange(value, 'recreationareas') }
                        value={form?.recreationareas}
                    />
                    
                    <TextInput
                        placeholder={'Calle'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        onChangeText={ (value) => onChange(value, 'street') }
                        value={form?.street}
                    />
                    
                    <TextInput
                        placeholder={'Colonia'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'suburb') }
                        value={form?.suburb}
                    />
                    <TextInput
                        placeholder={'Latitud'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'latitude') }
                        value={form?.latitude}
                        keyboardType={'numeric'}
                    />

                    <TextInput
                        placeholder={'Longitud'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                        onChangeText={ (value) => onChange(value, 'length') }
                        value={form?.length}
                        keyboardType={'numeric'}
                    />

                    <Picker
                        selectedValue={form.cityStateId}
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue, 'cityStateId')}
                    >
                        {
                            getCityState !== undefined &&
                            getCityState !== null && (
                                getCityState.map( (item, index) => (
                                    <Picker.Item key={index} label={item.nameCityStates} value={item.id} />
                                ))
                            )
                        }

                    </Picker>

                    <Picker
                        selectedValue={form.nameMunicipalityId}
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue, 'nameMunicipalityId')}
                    >
                        {
                            getMunicipaly !== undefined &&
                            getMunicipaly !== null && (
                                getMunicipaly.map( (item, index) => (
                                    <Picker.Item key={index} label={item.nameMunicipality} value={item.id} />
                                ))
                            )
                        }
                    </Picker>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.btnLogin}
                            onPress={sendPost} 
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
        fontWeight: '400',
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