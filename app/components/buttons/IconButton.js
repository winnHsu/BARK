import React from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import nums from "../../constants/nums"

export default function IconButton({ IconSVG, index, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, {
            left: nums.wW * Math.abs(index - 0.06) - 29 * index,
            top: nums.wH * 0.0686
        }]} onPress={onPress}>
            <IconSVG width={29} height={29} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
})