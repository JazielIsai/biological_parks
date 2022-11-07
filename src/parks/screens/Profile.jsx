import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, VirtualizedList, SafeAreaView} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import {useFetchGet} from '../../hooks/useFetchGet';
import { CardPoster } from '../../components/CardPoster';
import { BtnLink } from '../components/BtnLink';
import {useNavigation} from '@react-navigation/native';


const Stack = createNativeStackNavigator();


const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

const getItemCount = (data) => 50;



export const Profile = () => {

    const {data} = useFetchGet('');
    const url = 'https://www.bbvaopenmind.com/wp-content/uploads/2013/02/BBVA-OpenMind-Fronteras-9-El-siglo-del-gen-Biologi%CC%81a-molecular-y-gene%CC%81tica-Gines-morata.jpg';

    const navigation = useNavigation();

    return (
        <ScrollView style={{flex:1, display: 'flex', backgroundColor: 'white'}}>

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
                        
                        <BtnLink
                            onPress = {() => {}}  
                            text='Registrar'
                            stylesBtnLink = {{ marginLeft: 25, marginRight: 25}}
                        />

                        <BtnLink
                            onPress = {() => {navigation.navigate('Account')}}  
                            text='Editar perfil'
                            stylesBtnLink = {{ marginLeft: 25, marginRight: 25}}
                        />

                    </View>


                    <View>

                        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10, textAlign: 'center'}}>
                            Visualizar
                        </Text>
                        

                        <View style= {styles.viewsCards}>

                            <BtnLink
                                onPress = {() => {}}  
                                text='Parques'
                                stylesBtnLink = {{ marginLeft: 5, marginRight: 5}}
                            />

                            <BtnLink
                                onPress = {() => {}}  
                                text='Imagenes'
                                stylesBtnLink = {{ marginLeft: 5, marginRight: 5}}
                            />

                            <BtnLink
                                onPress = {() => {}}  
                                text='Ficha Biologica'
                                stylesBtnLink = {{ marginLeft: 5, marginRight: 5}}
                            />

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
    viewsCards:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});
