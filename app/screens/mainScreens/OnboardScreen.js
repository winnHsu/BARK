import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import OnboardCard from '../../components/cards/OnboardCard';
import Paginator from '../../components/Paginator';

export default OnboardScreen = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const onboardData = [
        {
            id: '1',
            title: 'Discover Dog-Friendly Spots',
            description: 'Easily find highly rated dog-friendly spots in the city and connect with dog-related resources. Customize your preferences for perfect dog-friendly routes.',
            image: require('../../../assets/images/logo_dog.png'),
        },
        {
            id: '2',
            title: 'Curate Perfect Dog Walks',
            description: 'BARK utilizes AI to generate custom dog-friendly walking routes based on your needs. Design the perfect dog walk for you and your furry friend.',
            image: require('../../../assets/images/logo_dog.png'),
        },
        {
            id: '3',
            title: 'Connect with Other Dog Owners',
            description: 'Share experiences, read and write reviews, and build friendships with city pawrents in your community. Get insider tips and support.',
            image: require('../../../assets/images/logo_dog.png'),
        },
        {
            id: '4',
            title: 'BARK',
            description: 'NYC',
            image: require('../../../assets/images/logo_dog.png'),
        },
    ]

    useEffect(() => {
        const timer = setTimeout(() => { setIsVisible(false); }, 3000); // 3 seconds
        return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={onboardData}
                    renderItem={({ item }) => (
                        <View>
                            <OnboardCard item={item} />
                            {item.id === '4' && (
                                <View style={styles.btnView}>
                                    <TouchableOpacity
                                        style={[styles.startBtn, { backgroundColor: '#FDF226', }]}
                                        onPress={() => { navigation.navigate('LoginScreen') }}>
                                        <Text style={[styles.btnText, { color: 'black', }]}>Get Started</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.startBtn, { backgroundColor: 'white', }]}
                                        onPress={() => { navigation.navigate('LoginScreen') }}>
                                        <Text style={[styles.btnText, { color: '#888888', }]}>Sign In</Text>
                                    </TouchableOpacity>
                                </View>

                            )}
                        </View>
                    )}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <View style={{ position: 'absolute', top: '75%' }}>
                <Paginator data={onboardData} scrollX={scrollX} />
            </View>
            {isVisible && (
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>BARK</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    btnView: {
        height: '12.3%',
        width: '86%',
        position: 'absolute',
        top: '83.9%',
        alignSelf: 'center',
    },
    startBtn: {
        height: '50%',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontWeight: '500',
        fontSize: 19
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#FDF266',
    },
    title: {
        fontSize: 66,
        marginBottom: '20.5%',
        fontWeight: '800',
        textAlign: 'center',
    },
});
