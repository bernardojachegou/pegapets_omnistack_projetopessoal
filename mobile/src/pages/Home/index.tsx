import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navitation = useNavigation();

    function handleNavigateToPlaces() {
        navitation.navigate('Places');
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.jpg')} />
                <Text style={styles.title}>Seu pet pode está próximo de você...</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem o seu próximo animal de estimação</Text>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleNavigateToPlaces}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        color: "#3F3B51",
        fontSize: 32,
        fontFamily: "Ubuntu_700Bold",
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: "#060609",
        fontSize: 16,
        marginTop: 16,
        fontFamily: "Roboto_400Regular",
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#6A4671",
        height: 60,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
    },
});

export default Home;