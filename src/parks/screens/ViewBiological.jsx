import React, { useEffect, useState, useContext } from "react";
import {View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFetchGet } from "../../hooks/useFetchGet";
import { CardText } from "../../components/CardText";
import {CardImg} from "../../components/CardImg";
import { Maps } from "../../components/Maps";

export const ViewBiological = () => {

    const {user} = useContext(AuthContext);

    const { data : getParksByUser } = useFetchGet(`get_biologic_data_by_user_id&user_id=${user.id}`);

    const [ getDataParks, setDataParks ] = useState([]);

    useEffect( () => {
        try {
            console.log(getParksByUser);
            setDataParks(JSON.parse(getParksByUser));
        } catch (error) {
            console.log("The error is: ",error);
        }
    }, [getParksByUser] )

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
                                        <CardText 
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
                                    ) 
                                }
                                keyExtractor={ (item) => item.id }
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
