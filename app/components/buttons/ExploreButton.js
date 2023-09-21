import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import nums from '../../constants/nums';
import colors from '../../constants/colors';

export default function ExploreButton({ containerLeft, backgroundColor, IconSVG, text, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, {
            left: containerLeft,
            backgroundColor: backgroundColor
        }]} onPress={onPress}>
            <View style={styles.circleIcon}>
                <IconSVG width={26} height={26} />
            </View>
            <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: nums.wH * 0.074,
        height: nums.wH * 0.2331,
        width: nums.wW * 0.355,
        borderRadius: 40,
    },
    circleIcon: {
        height: 46,
        width: 46,
        backgroundColor: colors.transparentWhite,
        borderRadius: 30,
        marginLeft: nums.wW * 0.035,
        marginTop: nums.wH * 0.03,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginLeft: nums.wW * 0.056,
        marginTop: nums.wH * 0.035,
        fontSize: 17,
        fontWeight: 'bold'
    },
    sheetSwitch: {
        backgroundColor: 'white',
        height: nums.wH * 0.074,
        width: nums.wW,
        borderTopLeftRadius: 29,
        borderTopRightRadius: 29,
    },
    shadowProp: {
        shadowColor: '#000000',
        shadowOffset: { height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
});

