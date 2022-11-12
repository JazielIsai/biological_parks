import React, { useEffect, useState } from "react";
import {Text, View, SafeAreaView, Image, StyleSheet, StatusBar} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {useFetchGet} from '../../hooks/useFetchGet';

import { CardPoster } from "../../components/CardPoster";
import { Background } from "../components/Background";

  

export const HomeScreen = () => {

    const {data} = useFetchGet('get_all_relation_biologic_data_and_parks_data_with_img_way_desc');

    const [cardItems, setCardItems] = useState([]);


    useEffect( ()=> {

        try {
            setCardItems(JSON.parse(data));
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
                source={{uri: 'https://i1.wp.com/montesdeoro.go.cr/wp-content/uploads/2021/11/Pajaro-Bobo-.-1.jpg?ssl=1'}}
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
                            keyExtractor={ (item) => item.id }

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
                        keyExtractor={ (item) => item.id }

                    />
                )
            }

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    scrollView: {
        marginHorizontal: 10,
      },
  });
  