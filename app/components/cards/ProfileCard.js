import React, { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import { Text, Image, View, TouchableOpacity, StyleSheet, Alert } from "react-native"
import colors from '../../constants/colors';
import nums from '../../constants/nums';

export default function ProfileCard({ onPress, profileData, profileUrl }) {
    const currentYear = new Date().getFullYear();

    const formatNumber = (num) => {
        try {
            if (num >= 1000000) return (num / 1000000).toFixed(2) + 'm';
            else if (num >= 10000) return (num / 1000).toFixed(1) + 'k';
            else if (num >= 1000) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            else return num.toString();
        }
        catch (err) {
            console.error(err)
        }
    };

    return (
        <View style={{ flex: 1, marginTop: '14.8%', alignItems: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
                <Text style={styles.dogName}>{profileData.name}</Text>
                <Feather name="chevron-down" size={28} color={'black'} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                <Image style={styles.profilePicture} source={{ uri: profileUrl }} resizeMode='cover' />
                <View style={{ width: '63%', margin: '3.6%' }}>
                    <Text style={styles.userInfo}>@ {profileData.username}</Text>
                    <Text style={styles.userInfo}>{profileData.bio}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '8.5%' }}>
                <View style={{ marginRight: '6.5%' }}>
                    <Text style={styles.dogTitle}>BREED</Text>
                    <Text style={styles.dogText}>{profileData.breed}</Text>
                </View>
                <View style={{ marginRight: '6.5%' }}>
                    <Text style={styles.dogTitle}>SIZE</Text>
                    <Text style={styles.dogText}>{profileData.size}</Text>
                </View>
                <View style={{ marginRight: '6.5%' }}>
                    <Text style={styles.dogTitle}>SEX</Text>
                    <Text style={styles.dogText}>{profileData.isboy ? 'Boy' : 'Girl'}</Text>
                </View>
                <View style={{ marginRight: '6.5%' }}>
                    <Text style={styles.dogTitle}>AGE</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.dogText}>{currentYear - profileData.birthyear} </Text>
                        <Text style={[styles.dogText, { color: colors.darkGray, fontWeight: '400' }]}>Years</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '8.5%', marginTop: '9%' }}>
                <View style={{ marginRight: '6.5%' }}>
                    <Text style={styles.dogTitle}>FRIENDS</Text>
                    <Text style={styles.dogText}>{formatNumber(profileData.friends)}</Text>
                </View>
                <View style={{ marginRight: '6.5%' }}>
                    <Text style={styles.dogTitle}>LIKES</Text>
                    <Text style={styles.dogText}>{formatNumber(profileData.likes)}</Text>
                </View>
                <View style={{ marginRight: '6.5%' }}>
                    <Text style={styles.dogTitle}>LOCATION</Text>
                    <Text style={styles.dogText}>{profileData.location}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.editBtnContainer} onPress={onPress}>
                    <Text style={styles.editButton}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profilePicture: {
        borderRadius: 72,
        height: 72,
        width: 72,
        marginTop: '3%'
    },
    userInfo: {
        fontSize: nums.littleText,
        marginTop: 7,
        color: colors.semiBlack
    },
    editBtnContainer: {
        alignSelf: 'flex-end',
        borderRadius: 72,
        borderWidth: 0.9,
        borderColor: colors.darkGray
    },
    editButton: {
        fontSize: nums.littleText,
        color: colors.semiBlack,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    dogName: {
        fontSize: nums.bigText,
        fontWeight: 'bold',
        marginRight: 2
    },
    dogTitle: {
        fontSize: nums.tinyText,
        color: colors.darkGray,
        fontWeight: '500',
    },
    dogText: {
        fontSize: nums.littleText,
        fontWeight: '600',
        marginTop: 1.5
    },
});