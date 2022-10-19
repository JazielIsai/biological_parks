import React, { useState } from "react";
import {Text, View, SafeAreaView, ScrollView, VirtualizedList, StyleSheet, StatusBar} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CardPoster } from "../../components/CardPoster";

const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index+1}`
  });
  
  const getItemCount = (data) => 50;

export const HomeScreen = () => {

    const [carouselItems, setCarouselItems] = useState(
        [
            {
                title:"Item 1",
                text: "Text 1",
            },
            {
                title:"Item 2",
                text: "Text 2",
            },
            {
                title:"Item 3",
                text: "Text 3",
            },
            {
                title:"Item 4",
                text: "Text 4",
            },
            {
                title:"Item 5",
                text: "Text 5",
            },
            {
                title:"Item 5",
                text: "Text 5",
            },
            {
                title:"Item 5",
                text: "Text 5",
            },
            {
                title:"Item 5",
                text: "Text 5",
            },
            {
                title:"Item 5",
                text: "Text 5",
            },
            {
                title:"Item 5",
                text: "Text 5",
            },
          ]
    )


    const itemsRender = ({item, index}) => {
        return (
            <View style={{
                    backgroundColor:'floralwhite',
                    borderRadius: 100,
                    height: 70,
                    width: 70,
                    padding: 20,
                    marginLeft: 8,
                    marginRight: 8,
                    marginBottom: 5, 
                }}
            >
              <Text style={{fontSize: 20}}>{item.title}</Text>
              <Text>{item.text}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={{display: 'flex', alignItems: 'center'}}>
                <FlatList
                    data={carouselItems}
                    renderItem={itemsRender}
                    horizontal={true}
                />

            </View>


            <VirtualizedList
                style={{ marginTop: 20, display: 'flex' }}
                data={carouselItems}
                renderItem={({ item }) => <CardPoster specie={item.title} />}
                keyExtractor={item => item.title}
                getItemCount={getItemCount}
                getItem={getItem}
            />


        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight - 20,
    },
    scrollView: {
        marginHorizontal: 10,
      },
  });
  