import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native';
import nums from '../constants/nums';
import IconPlus from '../icons/plus.svg'

export default function ResizeBox() {
    const [height, setHeight] = useState(nums.wH * 0.365);
    const animatedHeight = useRef(new Animated.Value(height)).current;

    const toggleHeight = () => {
        const newHeight = height === nums.wH * 0.365 ? 50 : nums.wH * 0.365;
        setHeight(newHeight);

        Animated.timing(animatedHeight, {
            toValue: newHeight,
            duration: 400,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: height,
            duration: 400,
            useNativeDriver: false,
        }).start();
    }, [height]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, { height: animatedHeight }]} >
                <TouchableWithoutFeedback onPress={toggleHeight}>
                    <View style={styles.sheetSwitch}>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
    box: {
        backgroundColor: 'white',
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    sheetSwitch: {
        backgroundColor: 'blue',
        height: 69,
        width: nums.wW,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    shadowProp: {
        shadowColor: '#aaaaaa',
        shadowOffset: { width: -1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
