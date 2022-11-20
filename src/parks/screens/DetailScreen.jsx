import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import { CardImg } from '../../components/CardImg';
import { Maps } from '../../components/Maps';
import { useFetchGet } from '../../hooks/useFetchGet';
import { urlImg } from '../../Shared/baseUrl';


export const DetailScreen = ({navigation}) => {

    const {idBiologic, idParksData} = navigation.getState().routes[1].params;

    console.log("navigation",idBiologic, idParksData);

    const {data: getBiologicImage} = useFetchGet(`get_img_by_biologic_data_id&biologic_data_id=${idBiologic}`);
    const {data: getParkImage} = useFetchGet(`get_image_by_parks_data_id&parks_data_id=${idParksData}`);

    const {data: getRelationBewttenBiologicDataAndParks } = useFetchGet(`get_all_relation_biologic_data_and_parks_data_by_biologic_data_id&biologic_data_id=${idBiologic}`);

    const [biologicImage, setBiologicImage] = useState([]);
    const [parkImage, setParkImage] = useState([]);
    const [getBiologicAndParksData, setBiologicAndParksData] = useState([]);

    const [images, setImages] = useState([]);

    useEffect( () => {

        try {

            setBiologicImage(JSON.parse(getBiologicImage));
            setParkImage(JSON.parse(getParkImage));

            setBiologicAndParksData(JSON.parse(getRelationBewttenBiologicDataAndParks)[0]);

            console.log("IMGANES----->",getBiologicImage, getParkImage);
            setImages([...JSON.parse(getBiologicImage), ...JSON.parse(getParkImage)]);
        } catch (error) {
            console.log("The error is: ",error);
        }


    },[getBiologicImage, getParkImage, getRelationBewttenBiologicDataAndParks, idBiologic, idParksData] )

    return (
        <ScrollView>


            <View style={styles.container}>

                <View  
                    style={{flex: 1, width: '100%', display: 'flex', borderBottomWidth: 2, borderBottomColor: '#2c3e50'}}
                > 
                {
                    images !== null &&
                    images !== undefined && (
                        <FlatList
                            data={images}
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

                <View style={styles.details}>

                    {
                        getBiologicAndParksData !== null &&
                        getBiologicAndParksData !== undefined ? (
                            <View style={{flex: 1, display: 'flex', margin: 10, width: '90%' }}>
                                <View style={{ display: 'flex', flexDirection: 'column', width: '90%' }} >
                                    <Text style={styles.title}> {getBiologicAndParksData.commonName} </Text>
                                    <Text style={styles.subtitle}> {getBiologicAndParksData.scientificName} </Text>
                                </View>
                                <Text style={styles.text}> {getBiologicAndParksData.description} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData.naturalHistory} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData.geographicalDistribution} </Text>
                                <Text style={{...styles.subtitle, marginTop: 6, fontSize: 16, }}> 
                                    Autor de la Ficha Biologica: {' '}
                                    <Text style={{...styles.subtitle, fontSize: 17}} >
                                        {getBiologicAndParksData.authorBiologicData} 
                                    </Text>
                                </Text>
                                <View style={{borderBottomWidth:1, borderBottomColor:'#0008ff', margin: 20, }} >

                                </View>
                                <Text style={styles.title}> {getBiologicAndParksData.namePark} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData?.recreationAreas} </Text>
                                
                                <View style={{flex: 1, display: 'flex', width: '90%', padding: 10, }}>
                                    <Maps 
                                        latitude={getBiologicAndParksData.latitude}  
                                        longitude= {getBiologicAndParksData.length} 
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

                                <Text style={styles.text}> {getBiologicAndParksData.street} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData.suburb} </Text>
                            </View>
                        ) :
                        (
                            <Text> No hay datos relacionados </Text>
                        )
                    }
                    
                
                </View>
            </View>

        </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    }
    
});