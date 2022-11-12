import React, {useEffect, useState, useCallback} from "react";
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
import {useFetchGet} from "../../hooks/useFetchGet";
import { useForm } from "../../hooks/useForm";

// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { ImagePickerModal } from "../components/ImagePickerModal";
import { ImagePickerAvatar } from "../components/image-picker-avatar";


export const RegisterImg = () => {

    const [ getParks, setParks ] = useState([]);

    const { form, onChange, onReset} = useForm({});

    const { data : getAllParks } = useFetchGet('get_all_name_and_id_parks');

    const [pickerResponse, setPickerResponse] = useState(null);
    const [visible, setVisible] = useState(false);
    

    useEffect( () => {
        try {
            console.log(getAllParks);
            setParks(JSON.parse(getAllParks));
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
    

    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
    

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
                    source={ { uri : pickerResponse?.assets ? pickerResponse.assets[0].uri : '' } }
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
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    textInput: {
        height: 50,
        width: 200,
        marginVertical: 10,
    },
    stretch: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    
});