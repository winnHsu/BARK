import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import nums from '../../constants/nums';
import colors from '../../constants/colors';

export default function CollectButton({ containerTop, IconSVG, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, { top: containerTop }]}
            onPress={onPress}>
            <IconSVG width={26} height={26} />
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        height: nums.wH * 0.1111,
        width: nums.wW * 0.151,
        left: nums.wW * 0.8,
        borderRadius: 21,
        borderWidth: 1.7,
        borderColor: colors.gray,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
});

