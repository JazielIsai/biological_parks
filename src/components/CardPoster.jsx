import React from 'react-native';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { urlImg } from '../Shared/baseUrl';

export const CardPoster = ({data, commonName, namePark, height = 420, width = 400}) => {

    const  uri = 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80';
    const imgWait = 'https://us.123rf.com/450wm/musmellow/musmellow2011/musmellow201100058/159878472-icono-de-imagen.jpg?ver=6';

    const navigation = useNavigation();

    console.log("This is the specie: ",commonName, namePark );

    const onPress = () => {
        
        navigation.navigate('DetailScreen', {idBiologic: data?.idBiologic, idParksData: data?.idParksData});
    }

    return (
        <View style={{flex: 1, marginBottom: 20}} >
            <TouchableHighlight
                onPress={ () => onPress() }
                activeOpacity={0.8}
                style={ {
                    width,
                    height,
                }}
            >
                <View style={ styles.imageContainer }>
                    <Image
                        source={{ uri: data.path_img_biologic_data ? urlImg.concat(data.path_img_biologic_data) : data.path_img_parks ? urlImg.concat(data.path_img_parks) : imgWait }}
                        style={ styles.image }
                    />
                </View>
            </TouchableHighlight>
            <View style={ styles.textContainer }>
                <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row', marginTop: 6 }}>
                    <Text style={ styles.text }>{ commonName }</Text>
                    <Text style={ styles.text }>{ namePark }</Text>
                    <Text style={ styles.text }>{ new Date().toDateString()  }</Text>
                </View>
                <Text style={ {...styles.textSave, marginTop: 5} }> Guardar </Text>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
    },
    text: {

    },
    textSave: {
        color: 'rgb(187,204,246)',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
