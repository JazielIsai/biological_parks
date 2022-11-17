import React, {useEffect, useState, useCallback, useContext} from "react";
import {StyleSheet,
        View,
        Text,
        Alert,
        ScrollView,
        TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from "../../auth/context/AuthContext";
import {useFetchGet} from "../../hooks/useFetchGet";
import { useForm } from "../../hooks/useForm";
import {requestPost} from '../../helpers/requestPost';

export const RegisterJoinTables = () => {

    const {user} = useContext(AuthContext);

    const [ getParks, setParks ] = useState([]);
    const [getBiologicData, setBiologicData] = useState([]);
    const [getPivotTable, setPivotTable] = useState([]);

    const { form, onChange, onReset} = useForm({});

    const { data : getAllParks } = useFetchGet(`get_all_name_and_id_parks&user_id=${user.id}`);
    const { data : getAllBiologicData } = useFetchGet(`get_all_name_and_id_biologic_data&user_id=${user.id}`);
   
    const { data : getDataPivotTable } = useFetchGet(`get_all_relation_biologic_data_and_parks_data`);

    useEffect( () => {
        try {

            setParks(JSON.parse(getAllParks));
            setBiologicData(JSON.parse(getAllBiologicData));
            setPivotTable(JSON.parse(getDataPivotTable));

        } catch (error) {
            console.log("The error is by: ", error);
        }
    }, [getAllParks, getAllBiologicData, getDataPivotTable] )

    const sendPost = () => {

        console.log(form);

        const body = {
            idBiologic: form.idBiologicData,
            idParksData: form.idParks,
        }

        console.log(body);

        const formData = new FormData();
        formData.append('data', JSON.stringify(body));

        requestPost('add_relation_to_pivot_table', formData)
            .then( resp => {
                if (resp.includes('1')) {
                    Alert.alert('Relación creada con éxito');
                    onReset({});
                } else {
                    Alert.alert('Error al crear la relación');
                    onReset({});
                }
                console.log(resp);
            })

    }


    return (
        <ScrollView>
            <View style={styles.container}>
                
                <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 15, marginBottom: 15}}
                >
                    Relacionar los datos biológicos con el parque:
                </Text>


                <View style={{ display: 'flex', width: '80%', margin: 10 }} >

                    <Picker
                        selectedValue={form.idParks}
                        onValueChange={ (itemValue, itemIndex) => {
                            onChange(itemValue, 'idParks');
                        } }
                        style={{ marginBottom: 15, }}
                    >
                        <Picker.Item label="Seleccione el parque" value={0} />
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
                        style={{ marginBottom: 15, }}
                    >
                        <Picker.Item label="Seleccione los datos biológicos" value={0} />
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
                    onPress={sendPost}
                >
                    <View style={styles.btnView}>
                        <Text style={styles.textButton}> Guardar </Text>
                    </View>
                </TouchableOpacity>
                
                <Text 
                    style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 35, marginBottom: 15 }}
                > 
                    La relación existente es: 
                </Text>

                {
                    getPivotTable !== undefined &&
                    getPivotTable !== null &&
                        getPivotTable.map( (item, index) => (
                            <View key={index} style={{ display: 'flex', flexDirection: 'row', width: '85%', margin: 10 }} >
                                <Text 
                                    style={{ color: 'black', fontWeight: 'bold', fontSize: 13, marginTop: 5, marginBottom: 5, width: '50%' }} 
                                >
                                    {item.namePark}
                                </Text>
                                
                                <Text 
                                    style={{ color: 'black', fontWeight: 'bold', fontSize: 13, marginTop: 5, marginBottom: 5, width: '50%' }} 
                                >
                                    {item.commonName}
                                </Text>
                            </View>
                        ))

                }

            </View>
        </ScrollView>
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