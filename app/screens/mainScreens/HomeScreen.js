import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import SearchBar from '../../components/SearchBar';
import nums from '../../constants/nums';
import { SelectList } from 'react-native-dropdown-select-list'
import colors from '../../constants/colors';
import { Feather } from "@expo/vector-icons";
import FriendScreen from '../stackScreens/FriendScreen'
import DiscoverScreen from '../stackScreens/DiscoverScreen'
import NearbyScreen from '../stackScreens/NearbyScreen'
import HomeButton from '../../components/buttons/HomeButton';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import IconLike from '../../../assets/icons/like.svg'
import IconRestaurants from '../../../assets/icons/restaurants.svg'
import IconCafes from '../../../assets/icons/cafes.svg'
import IconDogWalks from '../../../assets/icons/dog_walks.svg'
import IconDogParks from '../../../assets/icons/dog_parks.svg'
import IconGroomers from '../../../assets/icons/groomers.svg'
import IconVets from '../../../assets/icons/vets.svg'
import IconPhotoSpots from '../../../assets/icons/photo_spots.svg'
import IconMore from '../../../assets/icons/more.svg'

const TopTab = createMaterialTopTabNavigator();

const data = [
  { key: '0', value: 'United States', disabled: true },
  { key: '1', value: 'NYC' },
  { key: '2', value: 'LAX' },
  { key: '3', value: 'CHI' },
  { key: '4', value: 'HOU' },
  { key: '5', value: 'PHL' },
  { key: '6', value: 'DAL' },
  { key: '7', value: 'SEA' },
  { key: '8', value: 'SFO' },
  { key: '9', value: 'Canada', disabled: true },
  { key: '10', value: 'YTO' },
  { key: '11', value: 'YMQ' },
  { key: '12', value: 'YVR' },
]

function HomeTopTabs() {
  return (
    <NavigationContainer independent={true}>
      <TopTab.Navigator
        initialRouteName="DISCOVER_SCREEN"
        screenOptions={{
          tabBarIndicatorStyle: { width: 36, marginBottom: 9, backgroundColor: colors.ironGray, marginLeft: nums.wW / 2 - 98 },
          tabBarShowLabel: false,
          tabBarItemStyle: { width: 80, marginTop: 5, },
          tabBarStyle: { paddingLeft: nums.wW / 2 - 120, }
        }}>
        <TopTab.Screen name="FRIEND_SCREEN" component={FriendScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.topTabTitle, { color: focused ? 'black' : colors.ironGray, }]}>Friend</Text>
            ),
          }} />
        <TopTab.Screen name="DISCOVER_SCREEN" component={DiscoverScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.topTabTitle, { color: focused ? 'black' : colors.ironGray, }]}>Discover</Text>
            ),
          }} />
        <TopTab.Screen name="NEARBY_SCREEN" component={NearbyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.topTabTitle, { color: focused ? 'black' : colors.ironGray, }]}>Nearby</Text>
            ),
          }} />
      </TopTab.Navigator>
    </NavigationContainer >
  );
}

function HomeScreen({ navigation }) {

  const [selectedRegion, setSelectedRegion] = React.useState("");

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: nums.wH * 0.0547, height: 150, }}>
        <View style={{ marginLeft: nums.wW * 0.0233 }}>
          <SearchBar
            placeholder={'Search for dog-friendly cafe'}
            width={nums.wW * 0.6372}
            height={45}
            containerColor={'#F2F2F4'}
            iconSize={23}
            fontSize={17}
            iconLeft={33}
            fontLeft={43} />
        </View>
        <TouchableOpacity style={styles.heartIcon}>
          <IconLike width={30} height={30} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 193, }} >
        <HomeButton IconSVG={IconRestaurants} text={'Restaurants'} index={1} onPress={null} />
        <HomeButton IconSVG={IconCafes} text={'Cafes'} index={2} onPress={null} />
        <HomeButton IconSVG={IconDogWalks} text={'Dog Walks'} index={3} onPress={null} />
        <HomeButton IconSVG={IconDogParks} text={'Dog Parks'} index={4} onPress={null} />
        <HomeButton IconSVG={IconGroomers} text={'Groomers'} index={5} onPress={null} />
        <HomeButton IconSVG={IconVets} text={'Vets'} index={6} onPress={null} />
        <HomeButton IconSVG={IconPhotoSpots} text={'Photo Spots'} index={7} onPress={null} />
        <HomeButton IconSVG={IconMore} text={'More'} index={8} onPress={null} />
      </View>
      <View style={styles.cuttingLine} />
      <HomeTopTabs />
      <View style={{ marginTop: nums.wH * 0.0547, position: 'absolute', }}>
        <SelectList
          boxStyles={{ hight: 45, width: 96, borderWidth: 0, }}
          inputStyles={{ fontSize: 16 }}
          dropdownStyles={{ backgroundColor: 'white' }}
          arrowicon={<Feather name="chevron-down" size={21} color={'black'} />}
          defaultOption={{ key: '1', value: 'NYC' }}
          search={false}
          setSelected={(val) => setSelectedRegion(val)}
          data={data}
          save="value" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heartIcon: {
    position: 'absolute',
    top: nums.wH * 0.0075,
    right: ((nums.wW * 0.3395) / 4) - 16
  },
  cuttingLine: {
    height: 1.5,
    width: '96%',
    backgroundColor: '#ededed',
    alignSelf: 'center'
  },
  topTabTitle: {
    width: 80,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center'
  },

})


export default HomeScreen;
