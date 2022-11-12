import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image} from "react-native";

export const EncabezadoProfile = ( {uirBackground, uriProfile, userName} ) => {

    return (
        <>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: uirBackground}}
                    style={{width: 400, height: 200}}
                />
            </View>

            <View style={styles.imgProfile}>
                <TouchableOpacity>
                    <Image
                        style={{width: 150, height: 150, borderRadius: 100}}
                        source={{uri: uriProfile}}
                    />
                </TouchableOpacity>
                <Text 
                    style={{fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}
                >
                    {userName}
                </Text>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    imageContainer:{
        borderRadius: 18,
        shadowRadius: 7,
        elevation: 9,
        
    },
    imgProfile: {
        width: 150,
        height: 120,
        float: 'top',
        top: -80,
    },


});
