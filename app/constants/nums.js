import { Dimensions, StatusBar, } from 'react-native';

export default {
    wW: Dimensions.get('window').width,
    wH: Dimensions.get('window').height,
    tabIconSize: 30,
    btnPosTop: 65,
    btnPosLeft: 25,
    iconBtnBottom: 60,
    iconBtnHigher: 110,
    screenHeight: Dimensions.get('window').height + StatusBar.currentHeight,
    topBarHeight: StatusBar.currentHeight,

    tinyText: 11.5,
    littleText: 13.5,
    smallText: 15,
    mediumText: 18,
    bigText: 21,
    largeText: 27,
}