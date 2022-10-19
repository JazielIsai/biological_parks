import React from 'react-native';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export const CardPoster = ({specie, height = 420, width = 300}) => {

    const  uri = 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80';

    const navigation = useNavigation();

    return (
        <TouchableHighlight
            // onPress={ () => navigation.navigate('DetailScreen', specie ) }
            activeOpacity={0.8}
            style={ {
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7
            }}
        >
            <View style={ styles.imageContainer }>
                <Image
                    source={{ uri }}
                    style={ styles.image }
                />
            </View>
        </TouchableHighlight>
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
    }
});
