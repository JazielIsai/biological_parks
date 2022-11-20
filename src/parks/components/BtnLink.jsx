import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export const BtnLink = ({text, onPress, stylesBtnLink = {}}) => {

    return (
        <TouchableOpacity
            style={{...styles.btn, ...stylesBtnLink}}
            onPress={onPress}
        >
            <View>
                <Text style={{color: '#fff'}} >{text}</Text>
            </View>
        </TouchableOpacity>
    )

};


const styles = StyleSheet.create({
    btn : {
        backgroundColor: '#0093E9',
        borderRadius: 20,
        width: 120,
        height: 40,
        display: 'flex',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
