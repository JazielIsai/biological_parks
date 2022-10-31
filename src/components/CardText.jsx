import React from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, VirtualizedList} from "react-native";


export const CardText = ({title, subtitle, description, link}) => {



    return (
        <View style={styles.container}>

            <Text style={styles.titleMain}>
                { title }
            </Text>
            
            <Text style={styles.subtitleMain}>
                { subtitle }
            </Text>
            
            <Text style={styles.descriptionMain}>
                { description }
            </Text>

            <TouchableOpacity style={styles.btnLink}>
                <View>
                    <Text>
                        { link }
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        width: 350,
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    titleMain: {
        fontSize: 20,
    },
    subtitleMain: {
        fontSize: 15,
    },
    descriptionMain: {
        fontSize: 10,
    },
    btnLink: {
        backgroundColor: '#AFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,

    }


});