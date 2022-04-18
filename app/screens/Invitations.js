import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Pool Play",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Pool Play - pending",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "JW orgy @ Downtown",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d7",
        title: "Dorm sex",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d",
        title: "Pool play",
    },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);

const App = () => {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#E5E5E5" : "#FFFFFF";
        const color = item.id === selectedId ? 'black' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 30,
    },
});

export default App;