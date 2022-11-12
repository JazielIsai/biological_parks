import React, {useState, useEffect, useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, SafeAreaView, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native";
import {AuthContext} from "../../auth/context/AuthContext";
import {useNavigation} from '@react-navigation/native';
import {useFetchGet} from '../../hooks/useFetchGet';
import { BtnLink } from '../components/BtnLink';
import { CardText } from '../../components/CardText';
import { CardPoster } from '../../components/CardPoster';
import { EncabezadoProfile } from '../../components/EncabezadoProfile';
import { CardImg } from '../../components/CardImg';
import { urlImg } from '../../Shared/baseUrl';

const Stack = createNativeStackNavigator();


const DATA = [];


export const Profile = () => {

    const {user} = useContext(AuthContext);

    const { data : getJoinTable } = useFetchGet(`get_data_and_img_parks_biologic&parks_user_id=${user.id}&biologic_user_id=${user.id}&img_parks_user_id=${user.id}&img_biologic_user_id=${user.id}`);

    const [ joinTable, setJoinTable ] = useState([]);

    const url = 'https://www.bbvaopenmind.com/wp-content/uploads/2013/02/BBVA-OpenMind-Fronteras-9-El-siglo-del-gen-Biologi%CC%81a-molecular-y-gene%CC%81tica-Gines-morata.jpg';
    const uriProfile = 'http://www.ateneo.edu/sites/default/files/2021-11/istockphoto-517998264-612x612.jpeg';

    const navigation = useNavigation();

    const itemsRender = ({item, index}) => {
        console.log(item)
        return (
            item.verificate === 'Biologic Data'
                ?
                    <CardText 
                        title = {item.names}
                        subtitle = {item.column1}
                        description = {
                            <>
                                <Text> {item.column2} </Text>
                                <Text>  </Text>
                                <Text> {item.column3} </Text>
                                <Text>  </Text>
                                <Text> {item.column4} </Text>
                            </>
                        }
                        onPressLink
                        link
                    />
                : item.verificate === 'Parks Data' ?
                    <CardText 
                        title = {item.names}
                        subtitle = {item.column1}
                        description = {
                            <>
                                <Text> {item.column4} </Text>
                                <Text>  </Text>
                                <Text> {item.column5} </Text>
                            </>
                        }
                        onPressLink = {() => navigation.navigate('Parks', {id: item.id})}
                        link = 'See more'
                    />
                : item.verificate === 'img parks data' | item.verificate === 'img biologic data' ?
                    <CardImg
                        uri = {`${urlImg}${item.column2}`}
                    />
                : ''
        );

    }

    useEffect( () => {
        try {
            console.log(joinTable);
            setJoinTable(JSON.parse(getJoinTable));

        } catch (err) {
            console.log("This is error: ",err);
        }
    }, [getJoinTable]) 

    return (
        <SafeAreaView style={{flex:1, display: 'flex', backgroundColor: 'white'}}>
            <ScrollView>
                <View style={{flex: 1, display: 'flex', alignItems: 'center', marginTop: 9}} >

                    <EncabezadoProfile uirBackground={url} uriProfile={uriProfile} userName={user.firstname} />

                    <View style={styles.infoBtnContacto}>
                        <BtnLink
                            onPress = {() => navigation.navigate('Register') }  
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
                                onPress = {() => {navigation.navigate('ViewParks')}}  
                                text='Parques'
                                stylesBtnLink = {{ marginLeft: 5, marginRight: 5}}
                            />

                            <BtnLink
                                onPress = {() => { navigation.navigate('ViewImg') }}  
                                text='Imagenes'
                                stylesBtnLink = {{ marginLeft: 5, marginRight: 5}}
                            />

                            <BtnLink
                                onPress = {() => { navigation.navigate('ViewBiological') }}  
                                text='Ficha Biologica'
                                stylesBtnLink = {{ marginLeft: 5, marginRight: 5}}
                            />
                        </View>

                    </View>
                
                    <View style={{marginTop: 10, marginBottom: 10}}>
                        <FlatList
                            data={joinTable}
                            renderItem={itemsRender}
                            keyExtractor={ (item, index) => index.toString() }
                        />
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
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
