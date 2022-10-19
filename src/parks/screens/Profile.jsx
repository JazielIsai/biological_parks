import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from "react-native";


export const Profile = () => {

    const url = 'https://www.bbvaopenmind.com/wp-content/uploads/2013/02/BBVA-OpenMind-Fronteras-9-El-siglo-del-gen-Biologi%CC%81a-molecular-y-gene%CC%81tica-Gines-morata.jpg';

    return (
        <View style={{flex:1, display: 'flex', alignItems: 'center', marginTop: 9}} >

            <View style={styles.imageContainer}>
                <Image
                    source={{uri: url}}
                    style={{width: 400, height: 200}}
                />
            </View>

            <View style={styles.imgProfile}>
                <TouchableOpacity>
                    <Image
                        style={{width: 150, height: 150, borderRadius: 100}}
                        source={{uri:'http://www.ateneo.edu/sites/default/files/2021-11/istockphoto-517998264-612x612.jpeg'}}
                    />
                </TouchableOpacity>
            </View>

        </View>
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
        height: 150,
        borderRadius: 100,
        float: 'top',
        top: -80,
        elevation: 4,
    },

});
