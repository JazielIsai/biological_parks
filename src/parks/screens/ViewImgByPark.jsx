import React, { useEffect, useState } from "react";
import { View, Text, TextInput, LogBox, FlatList, StyleSheet, ScrollView } from "react-native";
import { CardImg } from "../../components/CardImg";
import { Maps } from "../../components/Maps";
import { requestGet } from "../../helpers/requestGet";
import { useFetchGet } from "../../hooks/useFetchGet";
import { useForm } from "../../hooks/useForm";
import { urlImg } from "../../Shared/baseUrl";

export const ViewImgByPark = ({route, navigation}) => {

    const {idPark} = route.params;

    const [getImgByPark, setImgByPark] = useState([]);
    const [getInfoPark, setInfoPark] = useState([]);

    useEffect( () => {

        try {

            requestGet('get_image_by_parks_data_id&parks_data_id=' + idPark)
            .then( resp => {
                console.log(resp);
                setImgByPark(JSON.parse(resp));
            })
            .catch( err => {
                console.log(err);
            })

            requestGet('get_park_by_id&id=' + idPark)
                .then( resp => {
                    console.log(resp);
                    setInfoPark(JSON.parse(resp)[0]);
                })
                .catch( err => {
                    console.log(err);
                })

        } catch (err) {

        }
    }, [idPark] )

    return (
        <ScrollView style={styles.container} >
            <View  
                    style={{flex: 1, width: '100%', display: 'flex', borderBottomWidth: 2, borderBottomColor: '#2c3e50'}}
                > 
                {
                    getImgByPark !== null &&
                    getImgByPark !== undefined && (
                        <FlatList
                            data={getImgByPark}
                            renderItem={ ({item}) => (  
                                    <CardImg
                                        data={item}  
                                        uri={urlImg.concat(item.ruta)}
                                        width={340}
                                    />
                                )
                            }
                            horizontal={true}
                            keyExtractor={ (item, index) => index.toString() }
                        />
                    )
                }
            </View>

            <View style={{flex: 1, display: 'flex', margin: 10, width: '90%' }} >
                <Text style={styles.title}> {getInfoPark.namePark} </Text>
                <Text style={styles.text} >Antecentes: {getInfoPark.trainingBackground} </Text>
                <Text style={styles.text} >Area: {getInfoPark.areaHa} </Text>
                <Text style={styles.text} >Forma: {getInfoPark.form} </Text>
                <Text style={styles.text} >Áreas de recreación: {getInfoPark.recreationAreas} </Text>
                <Text style={styles.text} >Ubicación: {getInfoPark.street} {' '} {getInfoPark.suburb} {' '} {getInfoPark.municipality} {' '} {getInfoPark.cityState}  </Text>
                <View style={{flex: 1, display: 'flex', width: '90%', padding: 10, marginBottom: 10,  }}>
                    <Maps
                        latitude={parseFloat(getInfoPark.latitude)}  
                        longitude= {parseFloat(getInfoPark.length)} 
                        customStyle={{
                            padding: 10,
                            alignItems: "center",
                            justifyContent: "center", 
                            borderRadius: 15,
                            width: "100%", 
                            marginBottom: 10, 
                        }}
                    />
                </View>

            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    details: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0008ff',
        textAlign: 'center',
        marginBottom: 10,
        textAlign: 'auto',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#0008ff',
        marginBottom: 10,
        textAlign: 'right',
    },
    text: {
        fontSize: 16,
        color: '#000',
        textAlign: 'justify',
        marginBottom: 6,
    }
})