import * as React from 'react';
import colors from '../../constants/colors';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import nums from '../../constants/nums';

export default ChatCard = ({ chatProfile }) => {

  return (
    <View style={styles.container}>
      <Image style={styles.profilePic} source={chatProfile.IMAGE} />
      <View style={{ paddingHorizontal: '4.5%', alignSelf: 'center', marginRight: 20, }}>
        <Text style={{ fontSize: nums.mediumText, fontWeight: '500', marginBottom: 3.5 }}>
          {chatProfile.NAME}
        </Text>
        <Text style={{ fontSize: nums.smallText, fontWeight: '500', color: colors.ironGray }}>
          {chatProfile.DESCRIPTION}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '7%',
    flexDirection: 'row',
    marginBottom: 26,
  },
  profilePic: {
    borderRadius: 100,
    height: 48,
    width: 48,
  },
});
