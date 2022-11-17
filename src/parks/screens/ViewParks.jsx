import React, { useEffect, useState, useContext } from "react";
import {View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Alert} from "react-native";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFetchGet } from "../../hooks/useFetchGet";
import { CardText } from "../../components/CardText";
// import {CardImg} from "../../components/CardImg";
import { Maps } from "../../components/Maps";
import { requestPost } from "../../helpers/requestPost";
import { useNavigation } from "@react-navigation/native";

export const ViewParks = () => {

    const {user} = useContext(AuthContext);

    const navigation = useNavigation();

    const { data : getParksByUser } = useFetchGet(`get_parks_by_user_id&user_id=${user.id}`);

    const [ getDataParks, setDataParks ] = useState([]);

    useEffect( () => {
        try {
            console.log(getParksByUser);
            setDataParks(JSON.parse(getParksByUser));
        } catch (error) {
            console.log("The error is: ",error);
        }
    }, [getParksByUser] )

    const  deletePark = (id) => {
        console.log("This is the id: ",id);
        
        if (id === null || id === undefined || id === '') {
            Alert.alert('Error al eliminar el parque');
            return;
        }

        const formData = new FormData();
        formData.append('id', id);


        Alert.alert(
            "Eliminar parque",
            "¿Está seguro de eliminar el parque?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelar Pressed"),
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => {
                        requestPost('delete_park', formData)
                        .then( resp => {
                            console.log(resp);
                            if (resp.includes('1')) {
                                Alert.alert('Parque eliminado con éxito');
                                setDataParks(getDataParks.filter( park => park.id !== id ));
                            }
                        })
                    }
                }
            ]
        );

        
    }

    const updatePark = (id) => {
        console.log("This is the id: ",id);

        if (id === null || id === undefined || id === '') {
            Alert.alert('Error al actualizar el parque');
            return;
        }

        navigation.navigate('EditPark', { idPark: id });

    }

    return (
        <SafeAreaView style={styles.container}>
            <>
                <View>
                    <Text style={styles.title} >
                        Parques que { user.firstName } has registrado
                    </Text>
                    {
                        getDataParks !== null &&
                        getDataParks !== undefined && (
                            <FlatList 
                                data={getDataParks}
                                renderItem={ ({item}) => 
                                    (
                                        <View style={{ backgroundColor: '#bdc3c7', borderBottomWidth: 2, borderBottomColor: '#2c3e50', padding: 10,}}>
                                            <CardText 
                                                backgroundColor = '#bdc3c7'
                                                data={item} 
                                                title={item.namePark} 
                                                subtitle={item.trainingBackground}    
                                                description={ 
                                                    <>
                                                        <Text>Colindancias: {item.boundaries}</Text>
                                                        <Text>Areas de recreocion: {item.recreationAreas}</Text>
                                                    </> 
                                                }
                                                link={<Maps latitude={item.latitude} longitude={item.length} />}
                                            />
                                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                                                
                                                <TouchableOpacity
                                                    style={{backgroundColor: '#FFF200', padding: 8, borderRadius: 10,}}
                                                    onPress={ () => updatePark(item.id) }
                                                >
                                                    <View>
                                                        <Text>Editar</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{backgroundColor: '#FF0000', padding: 8, borderRadius: 10,}}
                                                    onPress={ () => deletePark(item.id) }
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
        marginTop: 10,

    }

});
