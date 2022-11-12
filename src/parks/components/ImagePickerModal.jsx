import React from 'react';
import { SafeAreaView, Text, View, Image, Pressable, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function ImagePickerModal({
    onImageLibraryPress,
    onCameraPress,
  }) {
    return (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onImageLibraryPress}>
            
            <Text style={styles.buttonText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCameraPress}>

            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        </View>
    );
  }


const styles = StyleSheet.create({

    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
        color: '#aaa',
    },
  });