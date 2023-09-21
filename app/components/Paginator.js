import * as React from 'react';
import { Animated, useWindowDimensions, View, StyleSheet } from 'react-native';

export default Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 24, 8],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        style={[styles.dot, { width: dotWidth, opacity }]}
                        key={i.toString()}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: 8,
        borderRadius: 5,
        backgroundColor: '#4A8EDA',
        marginTop: 4,
        marginHorizontal: 8,
    },
});
