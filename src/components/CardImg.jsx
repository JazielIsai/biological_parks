import React from 'react-native';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export const CardImg = ({data, uri, height = 380, width = 340}) => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('DetailScreen', {idBiologic: data?.idBiologic, idParksData: data?.idParksData});
    }

    return (
        <View style={{flex: 1, marginBottom: 20}} >
            <TouchableHighlight
                //onPress={ () => onPress() }
                activeOpacity={0.8}
                style={ {
                    width,
                    height,
                }}
            >
                <View style={ styles.imageContainer }>
                    <Image
                        source={{ uri }}
                        style={ styles.image }
                    />
                </View>
            </TouchableHighlight>
          
        </View>
    )

};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
        margin: 10,
    },
    imageContainer: {
        flex: 1,
        backgroundColor:'floralwhite',
        borderRadius: 100,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 5, 
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
