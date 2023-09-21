import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import colors from '../../constants/colors';
import nums from '../../constants/nums';

function EditScreen({ navigation }) {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('InfoScreen'); }}>
            <Text style={{ alignSelf: 'center', marginTop: 200, textAlign: 'center', padding: 30, color: colors.red, fontSize: nums.smallText }}>
                Hey there! We're still crafting this page to perfection. Swing back later! Exciting news: we're launching on the App Store and Google Play in early 2024!
                {'\n'}
                Tap here to go back.
            </Text>
        </TouchableOpacity>
    )
}

export default EditScreen;