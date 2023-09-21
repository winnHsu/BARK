import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import IconButton from '../../components/buttons/IconButton'
import IconSmallSearch from '../../../assets/icons/small_search.svg'
import TextButton from '../../components/buttons/TextButton'
import SearchBar from '../../components/SearchBar'
import nums from '../../constants/nums'
import colors from '../../constants/colors'
import ChatCard from '../../components/cards/ChatCard'
import profile from '../../components/profile'
import ChatRoomScreen from './ChatRoomScreen'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// function ChatListScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, backgroundColor: 'white', paddingTop: nums.wH * 0.1225 }}>
//       <IconButton IconSVG={IconSmallSearch} index={1} onPress={null} />
//       <SearchBar
//         placeholder={'Search'}
//         width={nums.wW * 0.864}
//         height={42}
//         containerColor={'#F2F2F4'}
//         iconSize={20.5}
//         fontSize={17}
//         iconLeft={33}
//         fontLeft={43} />
//       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '4.3%' }}>
//         <TextButton
//           IconSVG={IconSmallSearch}
//           backgroundColor={colors.yellow}
//           text={'Notifications'}
//           onPress={null} />
//         <TextButton
//           IconSVG={IconSmallSearch}
//           backgroundColor={colors.lightGray}
//           text={'Notifications'}
//           onPress={null} />
//       </View>
//       <ScrollView style={{ marginTop: '7%' }}>
//         {profile.map((item) => (
//           <TouchableOpacity key={item.id} onPress={() => { navigation.navigate('ChatRoomScreen') }}>
//             <ChatCard chatProfile={item} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   )
// }

function MessageScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: nums.wH * 0.1225 }}>
      <IconButton IconSVG={IconSmallSearch} index={1} onPress={null} />
      <SearchBar
        placeholder={'Search'}
        width={nums.wW * 0.864}
        height={42}
        containerColor={'#F2F2F4'}
        iconSize={20.5}
        fontSize={17}
        iconLeft={33}
        fontLeft={43} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '4.3%' }}>
        <TextButton
          IconSVG={IconSmallSearch}
          backgroundColor={colors.yellow}
          text={'Notifications'}
          onPress={null} />
        <TextButton
          IconSVG={IconSmallSearch}
          backgroundColor={colors.lightGray}
          text={'Notifications'}
          onPress={null} />
      </View>
      <ScrollView style={{ marginTop: '7%' }}>
        {profile.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => {
            item.id === 0 ? null : navigation.navigate('ChatRoomScreen')
          }}>
            <ChatCard chatProfile={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default MessageScreen;
