import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";


export const CardText = ({title, subtitle, description, onPressLink, link, backgroundColor = '#fffcee'}) => {



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
        color: '#000',
        
    },
    titleMain: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
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
    btnLink: {
        backgroundColor: '#EEEEEE',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        color: '#000',

    }


});