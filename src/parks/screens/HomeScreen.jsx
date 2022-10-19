import React, { useState } from "react";
import {Text, View, SafeAreaView, VirtualizedList, StyleSheet, StatusBar} from "react-native";
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
          ]
    )


    const itemsRender = ({item, index}) => {
        return (
            <View style={{
                backgroundColor:'floralwhite',
                borderRadius: 5,
                height: 250,
                width: 350,
                padding: 50,
                marginLeft: 25,
                marginRight: 25, }}>
              <Text style={{fontSize: 30}}>{item.title}</Text>
              <Text>{item.text}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <View >
                <FlatList
                    data={carouselItems}
                    renderItem={itemsRender}
                    horizontal={true}
                />

            </View>

            <View style={{ marginTop: 20, display: 'flex', alignItems: 'center' }} >
                <VirtualizedList
                    data={carouselItems}
                    renderItem={({ item }) => <CardPoster specie={item.title} />}
                    keyExtractor={item => item.key}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
  });
  