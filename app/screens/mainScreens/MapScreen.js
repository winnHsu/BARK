import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from '../../components/BottomSheet';
import SearchBar from '../../components/SearchBar';
import nums from '../../constants/nums';
import ExploreButton from '../../components/buttons/ExploreButton';
import CollectButton from '../../components/buttons/CollectButton';
import colors from '../../constants/colors';
import IconSmallSearch from '../../../assets/icons/small_search.svg'

function MapScreen({ navigation }) {
  const [curLocation, setCurLocation] = useState(null);
  const mapRef = useRef();

  const startWatchingLocation = async () => {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,  // Receive an update every 5 seconds
        distanceInterval: 10, // Or every 10 meters
      },
      (newLocation) => {
        setCurLocation(newLocation.coords);
        console.log(newLocation);
      }
    );
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      // Once permission is granted, get the current location if needed
      let location = await Location.getCurrentPositionAsync({});
      setCurLocation(location.coords);
      console.log(location);
      startWatchingLocation();
    };
    getLocationPermission();
  }, []);

  const onCenter = () => {
    console.log(curLocation.latitude + ', ' + curLocation.longitude)
    if (curLocation) {
      mapRef.current.animateToRegion({
        latitude: curLocation.latitude,
        longitude: curLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 40.696011,
          longitude: -73.993286,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={{ marginTop: nums.wH * 0.0645 }}>
        <SearchBar
          placeholder={'Search for destination'}
          width={nums.wW * 0.88}
          height={57}
          containerColor={'white'}
          iconSize={26}
          fontSize={19}
          iconLeft={43}
          fontLeft={52} />
      </View>
      <BottomSheet onPress={onCenter}>
        <TouchableOpacity style={styles.navigationButton} onPress={onCenter}>
          <IconSmallSearch width={30} height={30} />
        </TouchableOpacity>
        <ExploreButton
          containerLeft={nums.wW * 0.044}
          backgroundColor={colors.yellow}
          IconSVG={IconSmallSearch}
          text={'Get Me Somewhere'}
          onPress={null} />
        <ExploreButton
          containerLeft={nums.wW * 0.424}
          backgroundColor={colors.lightGray}
          IconSVG={IconSmallSearch}
          text={'Exploration Mode'}
          onPress={null} />
        <CollectButton
          containerTop={nums.wH * 0.074}
          IconSVG={IconSmallSearch}
          onPress={null} />
        <CollectButton
          containerTop={nums.wH * 0.196}
          IconSVG={IconSmallSearch}
          onPress={null} />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  navigationButton: {
    height: 45,
    width: 45,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginRight: '4.5%',
    borderRadius: 10,
    marginTop: '-30%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default MapScreen;