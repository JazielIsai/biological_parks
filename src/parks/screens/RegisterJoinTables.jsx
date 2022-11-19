import React, {useEffect, useState, useContext} from "react";
import {StyleSheet,
        View,
        Text,
        Alert,
        FlatList,
        TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from "../../auth/context/AuthContext";
import {useFetchGet} from "../../hooks/useFetchGet";
import { useForm } from "../../hooks/useForm";
import {requestPost} from '../../helpers/requestPost';
import { requestGet } from "../../helpers/requestGet";

export const RegisterJoinTables = () => {

    const {user} = useContext(AuthContext);

    const [ getParks, setParks ] = useState([]);
    const [getBiologicData, setBiologicData] = useState([]);
    const [getPivotTable, setPivotTable] = useState([]);
    

    const { form, onChange, onReset} = useForm({
        idBiologicData: 0,
        idParks: 0,
    });

    const { data : getAllParks } = useFetchGet(`get_all_name_and_id_parks&user_id=${user.id}`);
    const { data : getAllBiologicData } = useFetchGet(`get_all_name_and_id_biologic_data&user_id=${user.id}`);
   
    const { data: getDataByParksId } = useFetchGet(`get_all_name_park_and_biologic_data_from_parks_id&id=${form.idParks}`);
    const { data: getDataByBiologicDataId } = useFetchGet(`get_all_name_park_and_biologic_data_from_biologic_data_id&id=${form.idBiologicData}`);
    const { data: getDataByBiologicDataIdAndParksId } = useFetchGet(`get_all_name_park_and_biologic_data_from_biologic_data_id_and_parks_id&biologic_data_id=${form.idBiologicData}&parks_id=${form.idParks}`);

    useEffect( () => {
        try {

            setParks(JSON.parse(getAllParks));
            setBiologicData(JSON.parse(getAllBiologicData));

            if (form.idBiologicData == 0 && form.idParks == 0) {

                requestGet('get_all_relation_biologic_data_and_parks_data')
                    .then( resp => {
                        setPivotTable(JSON.parse(resp));
                    })
                    .catch( err => {
                        console.log(err);
                    })

            } else if (form.idBiologicData != 0 && form.idParks != 0) {
                setPivotTable(JSON.parse(getDataByBiologicDataIdAndParksId));
            } else if (form.idBiologicData != 0) {
                setPivotTable(JSON.parse(getDataByBiologicDataId));
            } else if (form.idParks != 0) {
                setPivotTable(JSON.parse(getDataByParksId));
            }

        } catch (error) {
            console.log("The error is by: ", error);
        }
    }, [getAllParks, getAllBiologicData, getDataByParksId, getDataByBiologicDataId, getDataByBiologicDataIdAndParksId ] )

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
                    onReset({
                        idBiologicData: 0,
                        idParks: 0,
                    });
                } else {
                    Alert.alert('Error al crear la relación');
                    onReset({
                        idBiologicData: 0,
                        idParks: 0,
                    });
                }
                console.log(resp);
            })

    }

    const relationTables = ({item, index}) => {

        return (
            <>
                <View key={index} style={{ display: 'flex', flexDirection: 'row', width: '85%', margin: 8 }} >
                    <Text 
                        style={{ color: '#000', fontWeight: 'bold', fontSize: 13, marginTop: 5, marginBottom: 5, width: '50%' }} 
                    >
                        {item.namePark}
                    </Text>
                    
                    <Text 
                        style={{ color: '#000', fontWeight: 'bold', fontSize: 13, marginTop: 5, marginBottom: 5, width: '50%', textAlign: 'right' }} 
                    >
                        {item.commonName}
                    </Text>
                </View> 
            </>
        )
    }


    return (
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
                    style={{ color: '#000', fontWeight: 'bold', fontSize: 18, marginTop: 35, marginBottom: 15 }}
                > 
                    La relación existente es: 
                </Text>

            
                <FlatList
                    style={{ marginBottom: 10 }}
                    data={getPivotTable}
                    renderItem={relationTables}
                    keyExtractor={ (item, index) => index.toString() }
                />
                
                
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