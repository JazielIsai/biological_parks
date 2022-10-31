import React from 'react';
import {View} from 'react-native';

export const Background = () => {

    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#C6EBC5',
                top: 150,
                width: 1000,
                height: 1200,
                transform: [
                    { rotate: '-45deg' }
                ]
            }}
        >
        </View>
    )
}