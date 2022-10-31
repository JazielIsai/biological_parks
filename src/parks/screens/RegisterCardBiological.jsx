import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image,ScrollView,Button} from "react-native";



export const RegisterCardBiological = () => {
    const [selectedCategoryValue, setSelectedCategoryValue]=useState("");
    const [selectedParkValue, setSelectedParkValue]=useState("");
    const [selectedUserValue, setSelectedUserValue]=useState("");
    
    const [date, setDate] = useState(new Date());
    

   

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 18}}
                >
                    Ficha biologíca
                </Text>

                <View>

                    <TextInput
                        placeholder={'Nombre comun'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}

                    />

                    <TextInput
                        placeholder={'Nombre cientifico'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'} 
                    />

                    <TextInput
                        placeholder={'Fecha de avistamiemnto'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />
                    
                   <DatePicker date={date} onDateChange={setDate} />
                    
                    <TextInput
                        placeholder={'Descripcion'}
                        style={styles.textInput}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                        maxLength={30}
                        multiline={true}
                    />
                    
                    

                    <TextInput
                        placeholder={'Dsitrubucion geografica'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                    />
                    
                    <TextInput
                        placeholder={'Historia natural'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />
                    
                    <TextInput
                        placeholder={'Estado de conservacion'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'gray'}
                    />
                    
                    <TextInput
                        placeholder={'Autor'}
                        placeholderTextColor={'rgba(128,128,128,0.8)'}
                        style={styles.textInput}
                        underlineColorAndroid={'gray'}
                        selectionColor={'white'}
                    />
                
                    <Picker
                        selectedValue={selectedCategoryValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedCategoryValue(itemValue)}
                    >
                        <Picker.Item label="Category 1" value="category 1"/>
                        <Picker.Item label="Category 2" value="category 2"/>
                        <Picker.Item label="Category 3" value="category 3"/>
                        <Picker.Item label="Category 4" value="category 4"/>
                    </Picker>

                    <Picker
                        selectedValue={selectedParkValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedParkValue(itemValue)}
                    >
                        <Picker.Item label="Park 1" value="park 1"/>
                        <Picker.Item label="Park 2" value="park 2"/>
                        <Picker.Item label="Park 3" value="park 3"/>
                        <Picker.Item label="Park 4" value="park 4"/>
                    </Picker>

                    <Picker
                        selectedValue={selectedUserValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedUserValue(itemValue)}
                    >
                        <Picker.Item label="User 1" value="user 1"/>
                        <Picker.Item label="User 2" value="user 2"/>
                        <Picker.Item label="User 3" value="user 3"/>
                    </Picker>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnLogin} >
                            <View style={styles.btnView}>
                                <Text style={styles.textButton}> Registrarse </Text>
                            </View>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
        </ScrollView>
    );
};

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
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    btnLogin: {
        borderWidth: 2,
        borderColor: 'rgba(0,128,0,0.9)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'rgb(0,0,0)',
        fontSize: 20,
        textAlign: 'center',
    },
    btnLink: {
        marginTop: 20,
        alignItems: 'flex-end'
    },
    btnLinkGoRegister: {
        borderColor: 'rgba(128,128,128,1)',
        borderBottomWidth: 1
    }
    
});