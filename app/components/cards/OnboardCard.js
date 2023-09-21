import * as React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions, } from 'react-native';
import nums from '../../constants/nums';

export default OnboardCard = ({ item }) => {
    const { width, height } = useWindowDimensions();

    return (
        <View style={[styles.container, { width, height }]}>
            {(item.id == 4) ? <Text style={styles.topTitle}>{item.title}</Text> : null}
            <Image
                source={item.image}
                style={[styles.image, { resizeMode: 'contain' }]}
            />
            <View style={{ flex: 0.4, }}>
                <Text style={(item.id == 4) ? [styles.finalTitle, { marginTop: '-14%' }] : styles.title}>
                    {item.title}
                </Text>
                <Text style={(item.id == 4) ? [styles.finalTitle, { marginTop: '-6.5%' }] : styles.description}>
                    {item.description}
                </Text>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '84%',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '700',
        fontSize: 25,
        marginHorizontal: 35,
        color: '#493d8a',
        textAlign: 'center',
    },
    description: {
        marginTop: 25,
        fontWeight: '300',
        color: '#493d8a',
        textAlign: 'center',
        paddingHorizontal: 60,
    },
    topTitle: {
        position: 'absolute',
        fontSize: 30,
        fontWeight: '700',
        top: '9.5%'
    },
    finalTitle: {
        fontSize: 80,
        alignSelf: 'center',
        fontWeight: '900',
    },
});
