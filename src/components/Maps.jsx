import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import openMap from 'react-native-open-maps';


export const Maps = ({latitude, longitude, customStyle}) => {

    const onPress = () => {
        openMap({ latitude: latitude, longitude: longitude });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style = {{
                    padding: 0,
                    marginTop: 0,
                    backgroundColor: '#EEEEEE',
                    ...customStyle
                }}
                onPress={onPress}
             >
                <Text
                    style = {{
                        padding: 0,
                        marginTop: 0,
                    }}
                >
                    Click To Open Maps 🗺
                </Text>
            </TouchableOpacity>
        </View>
      );
};


//create our styling code:
const styles = StyleSheet.create({
    container: {
        
        
    },
  });
