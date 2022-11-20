import React from 'react';
import {View, StatusBar} from 'react-native';


export const Background = () => {

    return (
        <>
        <StatusBar
            animated={true}
            backgroundColor="#0008ff"
        />
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#0008ff',
                top: -350,
                width: 1000,
                height: 1200,
                transform: [
                    { rotate: '-65deg' }
                ]
            }}
        >
        </View>
        </>
    )
}