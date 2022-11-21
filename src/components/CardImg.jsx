import React from 'react-native';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export const CardImg = ({data, uri, height = 380, width = '100%', marginBottom=20, onPressLink = () => {} }) => {

    const navigation = useNavigation();
    console.log("This is the uri: ",uri );

    // const onPress = () => {
    //     navigation.navigate('DetailScreen', {idBiologic: data?.idBiologic, idParksData: data?.idParksData});
    // }

    return (
        <View style={{flex: 1, marginBottom: marginBottom, ...styles.container  }} >
            <TouchableHighlight
                onPress={ () => onPressLink() }
                activeOpacity={0.9}
                underlayColor="#FFF"
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
    container: {
        flex: 1,

    },
    image: {
        flex: 1,
        borderRadius: 18,
        margin: 5,
        resizeMode: 'cover',
        
    },
    imageContainer: {
        flex: 1,
        backgroundColor:'#FFF',
        borderRadius: 100,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 5, 
        
    },

});
