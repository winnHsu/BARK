import React from "react"
import { View, Image, Text } from "react-native"
import colors from "../../constants/colors"

export default function TabButton({ IconSVG, text, focused, margin, color }) {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            top: 5,
            marginLeft: margin,
        }}>
            <IconSVG width={30} height={30} />
            <Text
                style={{
                    color: focused ? '#000000' : colors.ironGray,
                    marginTop: 5,
                    fontSize: 12,
                    alignSelf: 'center',
                    fontWeight: '500'
                }}>
                {text}
            </Text>
        </View>
    )
}