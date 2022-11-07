import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import openMap from 'react-native-open-maps';


export const Maps = ({latitude, longitude}) => {
    
    const tokyoRegion = {
      latitude: 35.6762,
      longitude: 139.6503,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const onPress = () => {
        openMap({ latitude: latitude, longitude: longitude });
    }

    return (
        <View style={styles.container}>
            <Button
                color={'#bdc3c7'}
                onPress={onPress}
                title="Click To Open Maps 🗺" 
            />
        </View>
      );
};


//create our styling code:
const styles = StyleSheet.create({
    container: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    },
  });
