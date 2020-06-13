import React from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';

const Detail = () => {
    const navigation = useNavigation();

    function handleNavigateBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={24} color="#3F3B51" />
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1327&q=80' }} />
                <Text style={styles.pointName}>Pet Anjos</Text>
                <Text style={styles.pointItems}>Cães, Gatos e Peixes.</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>Cuiabá, MT</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={() => { }}>
                    <FontAwesome name="whatsapp" size={20} color='#FFF' />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={() => { }}>
                    <Icon name="mail" size={20} color='#FFF' />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20,
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: '#6A4671',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#060609'
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#6A4671',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#060609'
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '48%',
        backgroundColor: '#6A4671',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default Detail;