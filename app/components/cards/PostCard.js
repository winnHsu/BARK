import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import colors from '../../constants/colors';
import nums from '../../constants/nums';

export default function PostCard({ postData, postImages, profilePic, isHome }) {

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'm';
        else if (num >= 10000) return (num / 1000).toFixed(1) + 'k';
        else if (num >= 1000) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        else return num.toString();
    };

    const PostItem = ({ index }) => (
        <TouchableOpacity style={styles.container} onPress={null}>
            <View style={[styles.postContainer, styles.shadowProp]}>
                {postImages[index] ? <Image
                    style={{ width: '100%', height: '76%', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
                    source={{ uri: postImages[index] }}
                    resizeMode='cover' />
                    :
                    <View style={{ width: '100%', height: '76%', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={colors.darkYellow} />
                    </View>
                }
                <Text style={styles.caption}>{postData[index].caption}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3.2%' }}>
                    <Image source={{ uri: profilePic[index] }} resizeMode='cover' style={styles.profileImage} />
                    <Text style={[styles.userInfo, { marginLeft: '3.5%', flex: 1 }]}>{postData[index].userName}</Text>
                    <Text style={[styles.userInfo, { marginRight: '4%' }]}>{formatNumber(postData[index].likes)} likes</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: nums.wH * (isHome ? 0.15 : 0.103) }}>
                {Array.from({ length: Math.ceil(postData.length / 2) }, (_, i) => i + 1).map((_, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <PostItem index={index * 2} />
                        {(index * 2 + 1) < postData.length && <PostItem index={index * 2 + 1} />}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = {
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: nums.wH * 0.0193,
    },
    postContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: nums.wW * 0.012,
        width: nums.wW * 0.482,
        height: nums.wW * 0.72,
    },
    shadowProp: {
        shadowColor: '#aaaaaa',
        shadowOffset: { width: -1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    caption: {
        flex: 1,
        fontSize: nums.smallText,
        paddingTop: '2%',
        paddingHorizontal: '4%'
    },
    userInfo: {
        fontSize: nums.tinyText,
        color: colors.darkGray,
    },
    profileImage: {
        width: 22,
        height: 22,
        borderRadius: 19,
        marginLeft: '4%',
    },
};