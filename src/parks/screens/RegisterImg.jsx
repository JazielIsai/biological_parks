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
                placeholder="Nombre de la imagen"
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