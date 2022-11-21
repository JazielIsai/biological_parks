import React, { Component } from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";


export const CardText = ({title, subtitle, description, onPressLink, link = '', backgroundColor = '#e0e0e0'}) => {



    return (
        <View style={{...styles.container, backgroundColor: backgroundColor}}>

            <Text style={styles.titleMain}>
                { title }
            </Text>
            
            <Text style={styles.subtitleMain}>
                { subtitle }
            </Text>
            
            <Text style={styles.descriptionMain}>
                { description }
            </Text>

            {
                link !== '' && onPressLink !== undefined && (
                    <View style={styles.containerBtn} >
                        <TouchableOpacity
                            onPress={onPressLink}
                            style={styles.btnLink}
                        >
                            <View>
                                <Text style={{color: '#000',}} >
                                    { link }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) 
            }

        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        margin: 10,
        padding: 10,
        width: '95%',
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color: '#000',
        
    },
    titleMain: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000fff',
    },
    subtitleMain: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#000',
    },
    descriptionMain: {
        fontSize: 12,
        textAlign: 'justify',
        color: '#000',
    },
    containerBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    btnLink: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color: '#000',
    }


});