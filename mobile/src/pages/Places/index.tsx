import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';

interface Pet {
    id: number;
    title: string;
    image_url: string;
}

interface Place {
    id: number;
    name: string;
    image: string;
    image_url: string;
    latitude: number;
    longitude: number;
}

interface Params {
    uf: string;
    city: string;
}

const Places = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedPets, setSelectedPets] = useState<number[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Ooops...', 'Precisamos de sua permissão para obter a localização');
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            setInitialPosition([
                latitude,
                longitude
            ]);
        }
        loadPosition();
    }, []);

    useEffect(() => {
        api.get('pets').then(response => {
            setPets(response.data);
        });
    }, []);

    useEffect(() => {
        api.get('places', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                pets: selectedPets
            }
        }).then(response => {
            setPlaces(response.data);
        })
    }, [selectedPets]);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail',  { place_id: id });
    }

    function handleSelectedPet(id: number) {
        const alreadySelected = selectedPets.findIndex(pet => pet === id);

        if (alreadySelected >= 0) {
            const filteredPets = selectedPets.filter(pet => pet !== id);
            setSelectedPets(filteredPets);
        } else {
            setSelectedPets([...selectedPets, id]);
        }

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
                    {initialPosition[0] !== 0 && (
                        <MapView
                            style={styles.map}

                            initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014,
                            }}
                        >
                            {places.map(place => (
                                <Marker
                                    key={String(place.id)}
                                    style={styles.mapMarker}
                                    onPress={() => handleNavigateToDetail(place.id)}
                                    coordinate={{
                                        latitude: place.latitude,
                                        longitude: place.longitude,
                                    }}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image style={styles.mapMarkerImage} source={{ uri: place.image_url }} />
                                        <Text style={styles.mapMarkerTitle}>{place.name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <View style={styles.itemsContainer}>
                    {pets.map(pet => (
                        <TouchableOpacity
                            key={String(pet.id)}
                            style={[
                                styles.item,
                                selectedPets.includes(pet.id) ? styles.selectedItem : {}
                            ]}
                            onPress={() => handleSelectedPet(pet.id)}
                            activeOpacity={0.7}
                        >
                            <SvgUri width={50} height={50} uri={pet.image_url} />
                            <Text style={styles.itemTitle}>{pet.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
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
        marginBottom: 16,
        marginLeft: 'auto',
        marginRight: 'auto'
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
        borderColor: '#6A4671',
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
        fontSize: 13,
    },
});

export default Places;