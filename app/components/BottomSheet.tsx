import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Animated, TouchableOpacity, Platform, PanResponder } from 'react-native';
import nums from '../constants/nums';
import colors from '../constants/colors';
// import IconSmallSearch from '../../assets/icons/small_search.svg'

const MAX_HEIGHT = nums.wH * 0.365;
const MIN_HEIGHT = nums.wH * 0.06;
const MAX_UPWARD_Y = MIN_HEIGHT - MAX_HEIGHT;
const MAX_DOWNWARD_Y = 0;
const DRAG_THRESHOLD = 55;

export default function BottomSheet(props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // console.log('grant', lastGestureDy.current);
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        // console.log('move', gesture.dy);
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        // console.log('release', gesture.dy);
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;
        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    })
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_Y : MAX_UPWARD_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_Y, MAX_DOWNWARD_Y],
          outputRange: [MAX_UPWARD_Y, MAX_DOWNWARD_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
      <View style={styles.draggableArea} {...panResponder.panHandlers}>
        <View style={styles.dragHandle} />
      </View>
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: MAX_HEIGHT,
    bottom: MIN_HEIGHT - MAX_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#AAAAAA',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: { width: 2, height: 2 },
      },
    }),
  },
  draggableArea: {
    width: '100%',
    height: 64,
    alignSelf: 'center',
  },
  dragHandle: {
    width: 42,
    height: 8,
    marginTop: 13.5,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
  },
});
