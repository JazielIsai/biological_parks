import React, {useState} from "react";
import {Text, View} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { TextInput } from "react-native-gesture-handler";


export const RegisterImg = () => {

    const [selectedCardBiological, setSelectedCardBiological] = useState();

    return (
        <View>
            <Text>
                Imagen:
            </Text>
            <TextInput
                        placeholder={'Nombre comun'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}

                    />

            <TextInput
                placeholder="Nombre de la imagen"
            />

            <TextInput
                placeholder="Autor de la imagen"
            />

            <Picker
                selectedValue={selectedCardBiological}
                onValueChange={ (itemValue, itemIndex) => {
                    setSelectedCardBiological(itemValue)
                } }
            >
                <Picker.Item label="Pajaro" value={'Pajaro'} />
                <Picker.Item label="Gato" value={'Pajaro'} />
                <Picker.Item label="Alacran" value={'Pajaro'} />
            </Picker>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 200,
        marginVertical: 10,
    }
});