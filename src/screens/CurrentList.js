import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  SectionList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import nachos from '../data/nachos';
import ListItem, {Separator, SectionHeader} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager';

export default ({navigation}) => {
  const {
    list,
    loading,
    addItem,
    removeItem,
    cart,
    addToCart,
  } = useCurrentList();

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <SectionList
          sections={[
            {title: 'List', data: list},
            {title: 'Cart', data: cart}]}
            renderSectionHeader= {({section}) => (
              <SectionHeader title={section.title}/>
            )} 
           // data={list}
          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onFavoritePress={() => alert('todo: handle favorite')}
              isFavorite={index < 2}
              onAddedSwipe={() => addToCart(item)}
              onDeleteSwipe={() => removeItem(item.id)}
              onRowPress={() => {
                navigation.navigate('ItemDetails', {item});
              }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => (
            <AddItem
              onSubmitEditing={({nativeEvent: {text}}) => addItem(text)}
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
{
  /* <ScrollView>
{nachos.map((item, index) => (
  <React.Fragment key={item.id}>
    <ListItem
      name={item.name}
      onFavoritePress={() => alert('todo: handle favorite')}
      isFavorite={index < 2}
    />
    <Separator />
  </React.Fragment>
))}
</ScrollView> */
}
