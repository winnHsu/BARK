import React from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import nums from "../../constants/nums"
import colors from "../../constants/colors"

export default function HomeButton({ IconSVG, text, index, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, {
            left: nums.wW * 0.0698 + (index - 1) % 4 * nums.wW * 0.2157,
            top: (nums.wH * 0.0215 + nums.wW * 0.2157) * parseInt((index - 1) / 4) - nums.wH * 0.0933
        }]} onPress={onPress}>
            <View style={styles.backgroundView}>
                <IconSVG width={27} height={27} />
            </View>
            <Text style={{ marginTop: -1, fontSize: 14 }}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundView: {
        marginTop: nums.wH * 0.0097,
        borderRadius: 93,
        borderWidth: 16,
        borderColor: 'white',
        backgroundColor: colors.yellow,
        width: nums.wW * 0.2163,
        height: nums.wW * 0.2163,
        alignItems: 'center',
        justifyContent: 'center',
    }
})