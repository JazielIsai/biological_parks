import React, { useEffect, useState } from "react";
import { View, Text, TextInput, LogBox, FlatList, StyleSheet, ScrollView } from "react-native";
import { CardImg } from "../../components/CardImg";
import { Maps } from "../../components/Maps";
import { requestGet } from "../../helpers/requestGet";
import { useFetchGet } from "../../hooks/useFetchGet";
import { useForm } from "../../hooks/useForm";
import { urlImg } from "../../Shared/baseUrl";


export const ViewImgByBiologicData = ({route, navigation}) => {

    const {idBiologicData} = route.params;

    const [getImgByBiologicData, setImgByBiologicData] = useState([]);
    const [getInfoBiologicData, setInfoBiologicData] = useState([]);

    useEffect( () => {

        try {

            requestGet('get_img_by_biologic_data_id&biologic_data_id=' + idBiologicData)
            .then( resp => {
                console.log(resp);
                setImgByBiologicData(JSON.parse(resp));
            })
            .catch( err => {
                console.log(err);
            })

            requestGet('get_biologic_data_by_id&id=' + idBiologicData)
                .then( resp => {
                    console.log(resp);
                    setInfoBiologicData(JSON.parse(resp)[0]);
                })
                .catch( err => {
                    console.log(err);
                })

        } catch (err) {

        }
    }, [idBiologicData] )

    return (
        <ScrollView style={styles.container} >
            <View  
                    style={{flex: 1, width: '100%', display: 'flex', borderBottomWidth: 2, borderBottomColor: '#2c3e50'}}
                > 
                {
                    getImgByBiologicData !== null &&
                    getImgByBiologicData !== undefined && (
                        <FlatList
                            data={getImgByBiologicData}
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
                 <View style={{ display: 'flex', flexDirection: 'column', width: '90%' }} >
                    <Text style={styles.title}> {getInfoBiologicData.commonName} </Text>
                    <Text style={styles.subtitle}> {getInfoBiologicData.scientificName} </Text>
                </View>
                <Text style={styles.text}> {getInfoBiologicData.description} </Text>
                <Text style={styles.text}> {getInfoBiologicData.naturalHistory} </Text>
                <Text style={styles.text}> {getInfoBiologicData.geographicalDistribution} </Text>
                <Text style={{...styles.subtitle, marginTop: 6, fontSize: 16, }}> 
                    Autor de la Ficha Biologica: {' '}
                    <Text style={{...styles.subtitle, fontSize: 17}} >
                        {getInfoBiologicData.authorBiologicData} 
                    </Text>
                </Text>
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