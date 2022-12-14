import React, { useEffect, useState, useId } from "react";
import { View, SafeAreaView, Image, StyleSheet, FlatList} from "react-native";
import {useFetchGet} from '../../hooks/useFetchGet';

import { CardPoster } from "../../components/CardPoster";
import { urlImg } from "../../Shared/baseUrl";
import { requestGet } from "../../helpers/requestGet";

  

export const HomeScreen = () => {

    const id = useId()

    const [cardItems, setCardItems] = useState([]);

    const {data} = useFetchGet('get_all_relation_biologic_data_and_parks_data_with_img_way_desc');


    const imgWait = 'https://us.123rf.com/450wm/musmellow/musmellow2011/musmellow201100058/159878472-icono-de-imagen.jpg?ver=6';


    useEffect( ()=> {

        try {

            requestGet('get_all_relation_biologic_data_and_parks_data_with_img_way_desc')
                .then( resp => {
                    setCardItems(JSON.parse(resp));                    
                })
                .catch( err => {
                    console.log(err);
                })

        } catch (error) {
            console.log("The error is: ",error);
        }

    },[data] )


    const itemsRender = ({item, index}) => {
        return (
            <View style={{
                    backgroundColor:'floralwhite',
                    borderRadius: 100,
                    height: 70,
                    width: 70,
                    marginLeft: 8,
                    marginRight: 8,
                    marginBottom: 5, 
                }}
            >
              <Image
                style={{height: 70, width: 70, borderRadius: 100}}
                source={{uri: item.path_img_biologic_data ? urlImg.concat(item.path_img_biologic_data) : item.path_img_parks ? urlImg.concat(item.path_img_parks) : imgWait}}
              />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            
            {
                cardItems !== null &&
                cardItems !== undefined && (
                    <View style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
                        <FlatList
                            data={cardItems}
                            renderItem={itemsRender}
                            horizontal={true}
                            keyExtractor={ (item, index) => index.toString() }
                        />
                    </View>
                )
            }

            {
                cardItems !== null &&
                cardItems !== undefined && (
                    <FlatList
                        style={{ marginTop: 20, display: 'flex' }}
                        data={cardItems}
                        renderItem={({ item }) => <CardPoster data={item} commonName={item.commonName} namePark={item.NamePark} />}
                        keyExtractor={ (item, index) => index.toString() }
                    />
                )
            }

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: '#000',
      backgroundColor: 'white'
    },
    scrollView: {
        marginHorizontal: 10,
      },
  });
  