import React, {useContext, useState, useEffect} from "react";
import {View, Text, TextInput, StyleSheet, VirtualizedList, FlatList, SafeAreaView, TouchableOpacity, Alert} from "react-native";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFetchGet } from "../../hooks/useFetchGet";
import { CardImg } from "../../components/CardImg";
import { urlImg } from "../../Shared/baseUrl";
import { requestPost } from "../../helpers/requestPost";

export const ViewImg = () => {

    const { user } = useContext(AuthContext);
    const { data } = useFetchGet(`get_join_tables_images&parks_user_id=${user.id}&biologic_user_id=${user.id}`);
    const [getImgJoinTable, setImgJoinTable] = useState([]);

    const  uri = 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80';

    useEffect( ()=> {
        try {
            console.log(data);
            setImgJoinTable(JSON.parse(data));
        } catch (err) {
            console.log("This is err: ",err);
        }
    },[data] )

    const deleteImg = (id, data) => {
        console.log("Delete Img", data);
        
        if (id === '' || id === undefined || id === null) {
            return;
        }

        const formData = new FormData();
        formData.append('id', id);
        formData.append('path', data.ruta);


        if (data.ruta.includes('ImgBiologicData')){
            
            requestPost('delete_img_biologic_data', formData)
                .then( resp => {
                    console.log(resp);
                    if (resp.includes('1')) {
                        Alert.alert('Imagen eliminada con éxito');
                        setImgJoinTable(getImgJoinTable.filter( img => img.id !== id ));
                    }
                })
        } else if (data.ruta.includes('ImgParksData')) {
            
            requestPost('delete_img_park_data', formData)
                .then( resp => {
                    console.log(resp);
                    if (resp.includes('1')) {
                        Alert.alert('Imagen eliminada con éxito');
                        setImgJoinTable(getImgJoinTable.filter( img => img.id !== id ));
                    }
                })
        }

    }

    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                data={getImgJoinTable}
                renderItem={ ({item}) => 
                    (
                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#2c3e50', padding: 10 }}>
                            <CardImg uri = {`${urlImg}${item.ruta}`} marginBottom={0} /> 
                            <TouchableOpacity
                                style={{marginTop: 0, backgroundColor: '#FF0000', padding: 8, borderRadius: 10, width: 150, alignSelf: 'center', alignItems: 'center', alignContent: 'center'}}
                                onPress={ () => deleteImg(item.id, item) }
                            >
                                <View>
                                    <Text>Eliminar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) 
                }
                keyExtractor={ (item, index) => index.toString() }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',

    }
})