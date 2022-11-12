import React, {useEffect, useState, useCallback, useContext} from "react";
import {SafeAreaView,
        StyleSheet,
        ScrollView,
        View,
        Text,
        StatusBar,
        Image,
        Button,
        Dimensions,
        TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../../auth/context/AuthContext";
import {useFetchGet} from "../../hooks/useFetchGet";
import { useForm } from "../../hooks/useForm";


export const RegisterJoinTables = () => {

    const {user} = useContext(AuthContext);

    const [ getParks, setParks ] = useState([]);
    const [getBiologicData, setBiologicData] = useState([]);

    const { form, onChange, onReset} = useForm({});

    const { data : getAllParks } = useFetchGet('get_all_name_and_id_parks');
    const { data : getAllBiologicData } = useFetchGet(`get_all_name_and_id_biologic_data&user_id=${user.id}`);

    const [optionSave, setOptionSave] = useState(null);
    

    useEffect( () => {
        try {
            setParks(JSON.parse(getAllParks));
            setBiologicData(JSON.parse(getAllBiologicData));
        } catch (error) {
            console.log("The error is by: ", error);
        }
    }, [getAllParks] )

    const sendPost = () => {

        console.log(form);

        const body = {
            name: form.name,
            author: form.author,
            idPark: form.idPark,
            img: form.img
        }

        console.log(body);

    }


    return (
        <View style={styles.container}>
            
            <Text
                style={{color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 15}}
            >
                Relacionar los datos biológicos con el parque:
            </Text>

            <TextInput
                placeholder={'Nombre de la especie'}
                style={styles.textInput}
                placeholderTextColor={'rgba(128,128,128,0.8)'}
                underlineColorAndroid={'gray'}
                selectionColor={'gray'}
                onChangeText={ text => onChange(text, 'name') }
                value={form?.name}
            />


            <View style={{ display: 'flex', width: '80%', margin: 10 }} >

                <Picker
                    selectedValue={form.idParks}
                    onValueChange={ (itemValue, itemIndex) => {
                        onChange(itemValue, 'idParks');
                    } }
                >
                    {
                        getParks !== undefined &&
                        getParks !== null &&
                            getParks.map( (item, index) => (
                                <Picker.Item key={index} label={item.namePark} value={item.id} />
                            ))
                    }
                </Picker>
                
                <Picker
                    selectedValue={form.idBiologicData}
                    onValueChange={ (itemValue, itemIndex) => {
                        onChange(itemValue, 'idBiologicData');
                    } }
                >
                    {
                        getBiologicData !== undefined &&
                        getBiologicData !== null &&
                            getBiologicData.map( (item, index) => (
                                <Picker.Item key={index} label={item.commonName} value={item.id} />
                            ))
                    }
                </Picker>

            </View>
            
            <TouchableOpacity
                style={styles.buttonSave}
            >
                <View style={styles.btnView}>
                    <Text style={styles.textButton}> Guardar </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: 10,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 200,
        marginVertical: 10,
    },
    buttonSave: {
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
    
});