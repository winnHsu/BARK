import React, { useState, useRef, useEffect } from 'react';
import colors from '../../constants/colors';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import translator from '../../components/translator';
import images from '../../constants/images';
import nums from '../../constants/nums';
import { Ionicons } from "@expo/vector-icons";

function ChatRoomScreen({ navigation }) {
    const [message, setMessage] = useState('');
    const [translatedMessages, setTranslatedMessages] = useState([]);
    const [showTranslated, setShowTranslated] = useState(false);
    const scrollViewRef = useRef(null);

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours %= 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    };

    const [messages, setMessages] = useState([{
        text: 'Our chat room is now under construction, so messages might not save. But rest assured, we see every word! Share your thoughts to help us improve BARK. If we love your idea, it might just become a feature! Let\'s co-create magic! ✨',
        timestamp: formatTime(new Date()),
        isAnnouncement: true,
    }]);

    const handleToggleTranslate = async () => {
        if (showTranslated) {
            setTranslatedMessages([]);
        } else {
            const newTranslatedMessages = await Promise.all(
                messages.map(msg => translator({ initialText: msg.text }))
            );
            setTranslatedMessages(newTranslatedMessages);
        }
        setShowTranslated(!showTranslated);
    };

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const currentTime = new Date();
            const formattedTime = formatTime(currentTime);
            const newMessage = {
                text: message,
                timestamp: formattedTime,
                isAnnouncement: false,
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');

            if (showTranslated) {
                const translated = await translator({ initialText: message });
                setTranslatedMessages(prevTranslated => [...prevTranslated, translated]);
            }
        }
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <View style={[{ paddingTop: 1 }, StyleSheet.absoluteFill]}>
            {/* <View style={{ flexDirection: 'row', marginTop: 9 }}>
                <Ionicons name='information-circle' size={28} style={{ marginLeft: 12 }} />
                <Text>
                    Our chat room's under construction, so messages might not save. But rest assured, we see every word! Share your thoughts to help us improve BARK. If we love your idea, it might just become a feature! Let's co-create magic! ✨
                </Text>
            </View> */}
            <ScrollView ref={scrollViewRef} style={styles.chatSpace}>
                {messages.map((msg, index) => msg.isAnnouncement ? (
                    <View key={index} style={styles.announcementBox}>
                        <Text style={styles.announcementTime}>{msg.timestamp}</Text>
                        <Text style={styles.announcementText}>
                            {showTranslated && translatedMessages[index]
                                ? translatedMessages[index]
                                : msg.text}
                        </Text>
                    </View>
                ) : (
                    <View key={index} style={styles.messageBox}>
                        <Text style={styles.messageText}>
                            {showTranslated && translatedMessages[index]
                                ? translatedMessages[index]
                                : msg.text}
                        </Text>
                        <Text style={styles.timeText}>{msg.timestamp}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.icon} onPress={handleToggleTranslate}>
                    <Image
                        style={{ width: 52, height: 52, }}
                        source={showTranslated ? images.user_dog : images.user_ellie} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder={'Say Something  }:p'}
                    placeholderTextColor={colors.ironGray}
                    multiline={true}
                    value={message}
                    onChangeText={text => setMessage(text)}
                    onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity style={styles.icon} onPress={handleSendMessage}>
                    <AntDesign name={'enter'} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '15%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 52,
        height: 52,
        marginVertical: '4.5%',
        marginHorizontal: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: colors.darkYellow,
    },
    input: {
        flex: 1,
        height: 52,
        marginTop: '4.5%',
        paddingTop: '3.6%',
        fontSize: nums.mediumText,
        color: colors.darkGray,
        fontWeight: '500'
    },
    chatSpace: {
        flex: 1,
        marginBottom: 1,
        backgroundColor: colors.grayWhite
    },
    messageText: {
        textAlign: 'left',
        fontSize: nums.smallText,
        maxWidth: '75%',
        flexWrap: 'wrap'
    },
    timeText: {
        textAlign: 'right',
        fontSize: nums.tinyText,
        color: colors.darkGray,
        fontWeight: '500',
        marginBottom: -5
    },
    messageBox: {
        alignSelf: 'flex-end',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: colors.brightBlue,
        padding: 15,
        marginBottom: 6,
        marginTop: 2,
        marginRight: 4,
    },
    announcementBox: {
        marginTop: 15,
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: colors.gray,
        alignItems: 'center',
        marginBottom: 50
    },
    announcementTime: {
        color: colors.ironGray,
        fontWeight: '500',
        marginTop: -9,
        fontSize: nums.smallText,
        paddingHorizontal: 9,
        backgroundColor: colors.grayWhite,
        marginBottom: 9,
    },
    announcementText: {
        color: colors.ironGray,
        fontWeight: '500',
        fontSize: nums.smallText,
        textAlign: 'center',
        marginHorizontal: 35,
        paddingHorizontal: 9,
        backgroundColor: colors.grayWhite,
        marginBottom: -43
    },
})

export default ChatRoomScreen;