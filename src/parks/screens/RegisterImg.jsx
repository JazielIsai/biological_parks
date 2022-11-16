import React, {useEffect, useState, useCallback, useContext} from "react";
import {StyleSheet,
        View,
        Text,
        Image,
        TouchableOpacity,
        Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../../auth/context/AuthContext";
import {useFetchGet} from "../../hooks/useFetchGet";
import { useForm } from "../../hooks/useForm";

// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { requestPost } from "../../helpers/requestPost";



export const RegisterImg = () => {

    const {user} = useContext(AuthContext);

    const [ getParks, setParks ] = useState([]);
    const [getBiologicData, setBiologicData] = useState([]);

    const { form, onChange, onReset} = useForm({});

    const { data : getAllParks } = useFetchGet(`get_all_name_and_id_parks&user_id=${user.id}`);
    const { data : getAllBiologicData } = useFetchGet(`get_all_name_and_id_biologic_data&user_id=${user.id}`);

    const [pickerResponse, setPickerResponse] = useState(null);
    const [optionSave, setOptionSave] = useState(null);
    
    const imgWait = 'https://us.123rf.com/450wm/musmellow/musmellow2011/musmellow201100058/159878472-icono-de-imagen.jpg?ver=6';

    console.log("The pickerResponse is: ",pickerResponse);

    useEffect( () => {
        try {
            setParks(JSON.parse(getAllParks));
            setBiologicData(JSON.parse(getAllBiologicData));
        } catch (error) {
            console.log("The error is by: ", error);
        }
    }, [getAllParks, getAllBiologicData] )

    const onImageLibraryPress = useCallback( async () => {
        const options = {
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: false,
        };
        const response = await launchImageLibrary(options, setPickerResponse);
        console.log("the response is -> ", response)
    }, []);
    

    const onCameraPress = useCallback( async () => {
        const options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
        };
        await launchCamera(options, setPickerResponse);
    }, []);
    
    // const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    const sendPost = () => {

        if (   form.name === undefined || form.name === null || form.name === '' 
            && form.author === undefined || form.author === null || form.author === ''
            && pickerResponse === null || pickerResponse === undefined || pickerResponse === ''
            && optionSave === null || optionSave === undefined || optionSave === ''
           )
        {
            return Alert.alert('Todos los campos son requeridos');
        }
        

        console.log(form);

        const localUri = pickerResponse?.assets && pickerResponse.assets[0].uri;

        let filename = localUri.split('/').pop();
        console.log("fileName", filename);

        let match = /\.(\w+)$/.exec(filename);
        console.log("match", match);

        let type = match ? `image/${match[1]}` : `image`;
        console.log("type", type);

        const body = {
            name: form.name,
            author: form.author,
            id: form.idParks !== undefined ? form.idParks : form.idBiologicData !== undefined ? form.idBiologicData : null,
            idUser: user.id
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify(body));
        formData.append('photo', { uri: localUri, name: filename, type });
        
        if (optionSave === 'Parque') {
            requestPost('upload_image_by_park_data', formData)
                .then(res => {
                    onReset({});
                    setOptionSave('');
                    setPickerResponse(null);
                    Alert.alert('Imagen guardada con éxito');
                    console.log("Service = upload_image_by_park_data -> ", res)
                })
                .catch(err => {
                    console.log(err)
                })
        } else if ( optionSave === 'FBiologica') {
            requestPost('upload_image_by_biologic_data', formData)
                .then(res => {
                    onReset({});
                    setOptionSave('');
                    setPickerResponse(null);
                    Alert.alert('Imagen guardada con éxito');
                    console.log("Service = upload_image_by_biologic_data -> ", res)
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }

    return (
        <View style={styles.container}>
            
            <Text
                style={{color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 15}}
            >
                Imagen:
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

            <TextInput
                placeholder="Autor de la imagen"
                style={styles.textInput}
                placeholderTextColor={'rgba(128,128,128,0.8)'}
                underlineColorAndroid={'gray'}
                selectionColor={'gray'}
                onChangeText={ text => onChange(text, 'author') }
                value={form?.author}
            />

            <View style={styles.screen}>
                
                <Image
                    style={styles.stretch}
                    source={ { uri : pickerResponse?.assets ? pickerResponse.assets[0].uri : imgWait } }
                />

                <View style={styles.buttons}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onImageLibraryPress}
                    >   
                        <Text style={styles.buttonText}>
                            Library
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onCameraPress}
                    >
                        <Text style={styles.buttonText}>
                            Camera
                        </Text>
                    </TouchableOpacity>
                </View>
        
            </View>

            <View style={{ display: 'flex', width: '80%', margin: 10 }} >

                <Picker
                    selectedValue={optionSave}
                    onValueChange={(itemValue, itemIndex) => {
                        setOptionSave(itemValue);
                    }}
                >
                    <Picker.Item label="Asignar imagen a: " />
                    <Picker.Item label="Parque" value={'Parque'} />
                    <Picker.Item label="Ficha Biologica" value={'FBiologica'} />
                </Picker>

                {
                    optionSave === 'Parque' ? (
                        <Picker
                            selectedValue={form.idParks}
                            onValueChange={ (itemValue, itemIndex) => {
                                onChange(itemValue, 'idParks');
                            } }
                        >
                            <Picker.Item label="Seleccionar Parque" value={0} />
                            {
                                getParks !== undefined &&
                                getParks !== null &&
                                    getParks.map( (item, index) => (
                                        <Picker.Item key={index} label={item.namePark} value={item.id} />
                                    ))
                            }
                        </Picker>
                    ) : optionSave === 'FBiologica' && (
                            <Picker
                                selectedValue={form.idBiologicData}
                                onValueChange={ (itemValue, itemIndex) => {
                                    onChange(itemValue, 'idBiologicData');
                                } }
                            >
                                <Picker.Item label="Seleccione los ficha biológica" value={0} />
                                {
                                    getBiologicData !== undefined &&
                                    getBiologicData !== null &&
                                        getBiologicData.map( (item, index) => (
                                            <Picker.Item key={index} label={item.commonName} value={item.id} />
                                        ))
                                }
                            </Picker>
                    )
                }
            </View>
            
            <TouchableOpacity
                style={styles.buttonSave}
                onPress={sendPost}
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
        width: 250,
        marginVertical: 10,
    },
    screen:  {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    stretch: {
        width: 200,
        height: 200,
        margin: 10,
        backgroundColor: '#eee',
        resizeMode: 'stretch',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
        backgroundColor: 'gray',
        width: 100,
        height: 40,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

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