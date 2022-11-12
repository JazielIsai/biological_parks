import React, { useEffect, useState, useContext } from "react";
import {View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFetchGet } from "../../hooks/useFetchGet";
import { CardText } from "../../components/CardText";
import {CardImg} from "../../components/CardImg";
import { Maps } from "../../components/Maps";

export const ViewParks = () => {

    const {user} = useContext(AuthContext);

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
                                            title={item.namePark} 
                                            subtitle={item.trainingBackground}    
                                            description={ 
                                                <>
                                                    <Text>Colindancias: {item.boundaries}</Text>
                                                    <Text>Areas de recreocion: {item.recreationAreas}</Text>
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
