import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import nums from "../../constants/nums"

export default function TextButton({ IconSVG, backgroundColor, text, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: backgroundColor, }]} onPress={onPress}>
            <View style={styles.icon}>
                <IconSVG width={22} height={22} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        width: '43.2%',
        height: 48,
        margin: '1%',
    },
    icon: {
        position: 'absolute',
        top: 13,
        marginLeft: nums.wW * 0.072
    },
    text: {
        position: 'absolute',
        top: 16,
        marginLeft: nums.wW * 0.138,
        textAlignVertical: 'center',
        fontWeight: '500'
    },
})