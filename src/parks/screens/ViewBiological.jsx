import React, { useEffect, useState, useContext } from "react";
import {View, Text, TextInput, StyleSheet, Alert, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFetchGet } from "../../hooks/useFetchGet";
import { CardText } from "../../components/CardText";
// import {CardImg} from "../../components/CardImg";
import { Maps } from "../../components/Maps";
import { requestPost } from "../../helpers/requestPost";
import { useNavigation } from "@react-navigation/native";

export const ViewBiological = () => {

    const {user} = useContext(AuthContext);

    const navigation = useNavigation();

    const { data : geBiologicDataByUser } = useFetchGet(`get_biologic_data_by_user_id&user_id=${user.id}`);

    const [ getDataBiologic, setDataBiologic ] = useState([]);

    useEffect( () => {
        try {
            console.log(geBiologicDataByUser);
            setDataBiologic(JSON.parse(geBiologicDataByUser));
        } catch (error) {
            console.log("The error is: ",error);
        }
    }, [geBiologicDataByUser] );

    const  deleteBiologicData = (id) => {
        console.log("This is the id: ",id);
        
        if (id === null || id === undefined || id === '') {
            Alert.alert('Error al eliminar una ficha biologica');
            return;
        }

        const formData = new FormData();
        formData.append('id', id);


        Alert.alert(
            "Eliminar ficha biologica",
            "¿Está seguro de eliminar una ficha biologica?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => {
                        requestPost('delete_biologic_data', formData)
                        .then( resp => {
                            console.log(resp);
                            if (resp.includes('1')) {
                                Alert.alert('Ficha biologica eliminada con éxito');
                                setDataBiologic(getDataBiologic.filter( park => park.id !== id ));
                            }
                        })
                    }
                }
            ]
        );

        
    }

    const updateBiologicData = (id) => {
        console.log("This is the id: ",id);

        if (id === null || id === undefined || id === '') {
            Alert.alert('Error al actualizar el parque');
            return;
        }

        navigation.navigate('EditBiologicData', {idBiologicData: id});

    }

    return (
        <SafeAreaView style={styles.container}>
            <>
                <View>
                    <Text style={styles.title} >
                        { user.firstname } has registrado estas fichas biologicas:
                    </Text>
                    {
                        getDataBiologic !== null &&
                        getDataBiologic !== undefined && (
                            <FlatList 
                                data={getDataBiologic}
                                renderItem={ ({item}) => 
                                    (
                                        <View
                                            style={{ backgroundColor: '#bdc3c7', borderBottomWidth: 2, borderBottomColor: '#2c3e50', padding: 10,}}
                                        >
                                            <CardText 
                                                backgroundColor = '#bdc3c7'
                                                data={item} 
                                                title={item.commonName} 
                                                subtitle={
                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                                                        <Text> { item.scientificName } </Text>
                                                        <Text> Cat: { item.category } </Text>
                                                    </View>
                                                }    
                                                description={ 
                                                    <>
                                                        <Text> Descripción: {item.description}</Text>
                                                        <Text> Distribucción geografica: {item.geographicalDistribution} </Text>
                                                        <Text> Historia: {item.naturalHistory}</Text>
                                                    </> 
                                                }
                                                onPressLink = { () => (<Maps latitude={item.latitude} longitude={item.length} />) }
                                                link={'Ir a Google Maps'}
                                            />

                                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                                                
                                                <TouchableOpacity
                                                    style={{backgroundColor: '#FFF200', padding: 8, borderRadius: 10,}}
                                                    onPress={ () => updateBiologicData(item.id) }
                                                >
                                                    <View>
                                                        <Text>Editar</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{backgroundColor: '#FF0000', padding: 8, borderRadius: 10,}}
                                                    onPress={ () => deleteBiologicData(item.id) }
                                                >
                                                    <View>
                                                        <Text>Eliminar</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                
                                            </View>

                                        </View>
                                    ) 
                                }
                                keyExtractor={ (item, index) => index.toString() }
                            />
                        )
                    }
                </View>
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    container : {
        flex : 1,
        backgroundColor : '#fff',
        alignItems : 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    }

});
