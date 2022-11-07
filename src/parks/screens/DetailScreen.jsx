import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CardImg } from '../../components/CardImg';
import { Maps } from '../../components/Maps';
import { useFetchGet } from '../../hooks/useFetchGet';


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
            console.log("getRelationBewttenBiologicDataAndParks ",JSON.parse(getRelationBewttenBiologicDataAndParks)[0]);

            setBiologicAndParksData(JSON.parse(getRelationBewttenBiologicDataAndParks)[0]);

            setImages([...JSON.parse(getBiologicImage), ...JSON.parse(getParkImage)]);
        } catch (error) {
            console.log("The error is: ",error);
        }


    },[getBiologicImage, getParkImage] )

    return (
        <ScrollView>


            <View style={styles.container}>

                <View> 
                {
                    biologicImage !== null &&
                    biologicImage !== undefined && (
                        <FlatList
                            data={images}
                            renderItem={ ({item}) => (<CardImg data={item} />) }
                            horizontal={true}
                        />
                    )
                }
                </View>

                <View style={styles.details}>

                    {
                        getBiologicAndParksData !== null &&
                        getBiologicAndParksData !== undefined && (
                            <View style={{flex: 1, display: 'flex', margin: 10, width: '90%' }}>
                                <View style={{ display: 'flex', flexDirection: 'column', width: '90%' }} >
                                    <Text style={styles.title}> {getBiologicAndParksData.commonName} </Text>
                                    <Text style={styles.title}> {getBiologicAndParksData.scientificName} </Text>
                                </View>
                                <Text style={styles.text}> {getBiologicAndParksData.description} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData.naturalHistory} </Text>
                                <Text style={styles.title}> {getBiologicAndParksData.authorBiologicData} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData.geographicalDistribution} </Text>
                                <Text style={styles.title}> {getBiologicAndParksData.namePark} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData?.recreationAreas} </Text>
                                
                                <View style={{flex: 1, display: 'flex', width: '90%' }}>
                                    <Maps latitude={getBiologicAndParksData.latitude}  longitude= {getBiologicAndParksData.length} />
                                </View>

                                <Text style={styles.text}> {getBiologicAndParksData.street} </Text>
                                <Text style={styles.text}> {getBiologicAndParksData.suburb} </Text>
                            </View>
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
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
        textAlign: 'auto',
    },
    text: {
        fontSize: 16,
        color: '#000',
        textAlign: 'justify',
    }
    
});