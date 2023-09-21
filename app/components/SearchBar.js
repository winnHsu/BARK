import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import IconSmallSearch from '../../assets/icons/small_search.svg'
import IconVoice from '../../assets/icons/voice.svg'

const SearchBar = ({ placeholder, width, height, containerColor, iconSize, fontSize, iconLeft, fontLeft }) => {
    return (
        <View style={[{ width: width, height: height, backgroundColor: containerColor }, styles.container]}>
            <View style={{ position: 'absolute', marginTop: 11, marginLeft: 13, }}>
                <IconSmallSearch width={iconSize} height={iconSize} />
            </View>
            <TextInput
                style={[{ width: width - 41, fontSize: fontSize, paddingLeft: fontLeft, }, styles.input]}
                placeholder={placeholder}
                placeholderTextColor={colors.ironGray} />
            <TouchableOpacity style={{ position: 'absolute', left: width - iconLeft }}>
                <IconVoice width={iconSize} height={iconSize} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 56,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    input: {
        height: '100%',
        color: colors.darkGray,
    },
})

export default SearchBar;