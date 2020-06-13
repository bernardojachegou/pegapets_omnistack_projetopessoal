import React from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

const Places = () => {
    const navigation = useNavigation();

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail() {
        navigation.navigate('Detail');
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={24} color="#3F3B51" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo!</Text>
                <Text style={styles.description}>Encontre no mapa um local de adoção.</Text>

                <View style={styles.mapContainer}>
                    <MapView style={styles.map} initialRegion={{
                        latitude: -27.2092052,
                        longitude: -49.6401092,
                        latitudeDelta: 0.014,
                        longitudeDelta: 0.014,
                    }}
                    >
                        <Marker
                            style={styles.mapMarker}
                            onPress={handleNavigateToDetail}
                            coordinate={{
                                latitude: -27.2092052,
                                longitude: -49.6401092
                            }}
                        >
                            <View style={styles.mapMarkerContainer}>
                                <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1327&q=80' }} />
                                <Text style={styles.mapMarkerTitle}>Pet Anjos</Text>
                            </View>
                        </Marker>
                    </MapView>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    <TouchableOpacity style={styles.item} onPress={() => { }}>
                        <SvgUri width={50} height={50} uri="https://image.flaticon.com/icons/svg/2930/2930627.svg" />
                        <Text style={styles.itemTitle}>Gatos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { }}>
                        <SvgUri width={50} height={50} uri="https://image.flaticon.com/icons/svg/3021/3021356.svg" />
                        <Text style={styles.itemTitle}>Cães</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { }}>
                        <SvgUri width={50} height={50} uri="https://image.flaticon.com/icons/svg/1947/1947884.svg" />
                        <Text style={styles.itemTitle}>Outros</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 16,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#6A4671',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
    },

    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        height: 100,
        width: 100,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',

        textAlign: 'center',
    },

    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
        fontSize: 13,
    },
});

export default Places;