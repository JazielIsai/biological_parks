import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, VirtualizedList, SafeAreaView} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { CardPoster } from '../../components/CardPoster';

const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

const getItemCount = (data) => 50;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


export const Profile = () => {

    const url = 'https://www.bbvaopenmind.com/wp-content/uploads/2013/02/BBVA-OpenMind-Fronteras-9-El-siglo-del-gen-Biologi%CC%81a-molecular-y-gene%CC%81tica-Gines-morata.jpg';

    return (
        <ScrollView style={{flex:1, display: 'flex'}}>
            <View style={{flex:1, display: 'flex', alignItems: 'center', marginTop: 9}} >


                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: url}}
                            style={{width: 400, height: 200}}
                        />
                    </View>

                    <View style={styles.imgProfile}>
                        <TouchableOpacity>
                            <Image
                                style={{width: 150, height: 150, borderRadius: 100}}
                                source={{uri:'http://www.ateneo.edu/sites/default/files/2021-11/istockphoto-517998264-612x612.jpeg'}}
                            />
                        </TouchableOpacity>
                        <Text 
                            style={{fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}
                        >
                            Efrain Gonzalez
                        </Text>
                    </View>

                    <View style={styles.infoBtnContacto}>
                        
                        <TouchableOpacity style={{...styles.btn, marginLeft: 25, marginRight: 25}}>
                            <View>
                                <Text>
                                    Registrar
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{...styles.btn, marginLeft: 25, marginRight: 25}}>
                            <View>
                                <Text>
                                    Editar perfil
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View>

                        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10, textAlign: 'center'}}>
                            Visualizar
                        </Text>
                        

                        <View style= {styles.viewsCards}>
                            <TouchableOpacity 
                                style={{...styles.btn, marginLeft: 5, marginRight: 5}}
                                
                            >
                                <View>
                                    <Text>
                                        Parques
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{...styles.btn, marginLeft: 5, marginRight: 5}}>
                                <View>
                                    <Text>
                                        Imagenes
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{...styles.btn, marginLeft: 5, marginRight: 5}}>
                                <View>
                                    <Text>
                                        Ficha Biologica
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <SafeAreaView style={styles.container}>
                        <VirtualizedList
                            data={DATA}
                            initialNumToRender={4}
                            renderItem={({ item }) => <CardPoster specie={item.title} />}
                            keyExtractor={item => item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                    </SafeAreaView>


            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
      },
      item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
      },
      title: {
        fontSize: 32,
      },
    imageContainer:{
        borderRadius: 18,
        shadowRadius: 7,
        elevation: 9,
        
    },
    imgProfile: {
        width: 150,
        height: 120,
        float: 'top',
        top: -80,
    },
    infoBtnContacto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    btn : {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 120,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    viewsCards:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});
