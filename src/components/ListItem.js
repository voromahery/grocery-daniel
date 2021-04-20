import React from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#69696969',
  },
  icon: {
    height: 30,
    tintColor: '#69696969',
    ...Platform.select({
      ios: {
        tintColor: 'blue',
      },
      android: {
        tintColor: 'red',
      },
    }),
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'center',
  },
  rightAction: {
    flex: 1,
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
  sectionContainer: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
  },
  sectionText: {
    fontWeight: '600',
  },
});

export const Separator = () => <View style={styles.separator} />;

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
        Add to Cart
      </Animated.Text>
    </View>
  );
};

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.rightAction}>
      <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
        Delete
      </Animated.Text>
    </View>
  );
};

export const SectionHeader = ({title}) => {
  return (
    <View style={[styles.container, styles.sectionContainer]}>
      <Text style={styles.sectionText}>{title}</Text>
    </View>
  );
};

const ListItem = ({
  name,
  onFavoritePress,
  isFavorite,
  onAddedSwipe,
  onDeleteSwipe,
  onRowPress,
  unFavoritePress
}) => {
  let starIcon;
  if (isFavorite) {
    starIcon = Platform.select({
      ios: require('../assets/icons/ios-star.png'),
      android: require('../assets/icons/md-star.png'),
    });
  } else {
    starIcon = Platform.select({
      ios: require('../assets/icons/ios-star-outline.png'),
      android: require('../assets/icons/md-star-outline.png'),
    });
  }
  return (
    <Swipeable
      renderRightActions={onDeleteSwipe && RightActions}
      renderLeftActions={onAddedSwipe && LeftActions}
      onSwipeableRightOpen={onDeleteSwipe}
      onSwipeableLeftOpen={onAddedSwipe}>
      <TouchableOpacity onPress={onRowPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{name}</Text>
          {onFavoritePress && (
            <>
            <TouchableOpacity onPress={onFavoritePress}>
              <Image
                source={starIcon}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={unFavoritePress}>
            <Image
              source={starIcon}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          </>
          )}

        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ListItem;

// if (Platform.OS === 'ios') {
//   starIcon = require('../assets/icons/ios-star-outline.png');
// } else {
//   starIcon = require('../assets/icons/md-star.png');
// }
