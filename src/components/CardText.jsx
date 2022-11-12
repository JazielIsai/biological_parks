import React from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, VirtualizedList} from "react-native";


export const CardText = ({title, subtitle, description, onPressLink, link}) => {



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

            <TouchableOpacity
                onPress={onPressLink}
                style={styles.btnLink}
            >
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
        backgroundColor: '#fffcee',
        margin: 10,
        padding: 10,
        width: 350,
        borderRadius: 10,
        shadowColor: "#eee",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    titleMain: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitleMain: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    descriptionMain: {
        fontSize: 12,
        textAlign: 'justify',
    },
    btnLink: {
        backgroundColor: '#EEEEEE',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,

    }


});