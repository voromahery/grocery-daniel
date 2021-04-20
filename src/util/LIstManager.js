import {useEffect, useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const addItem = text => {
    const newList = [{id: uuid(), name: text}, ...list];
    setList(newList);
    updateStoreCurrentList(newList);
  };

  const updateStoreCurrentList = list => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
  };

  const updateStoreCurrentCart = list => {
    AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(list));
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    updateStoreCurrentList(newList);
  };

  const addToCart = item => {
    removeItem(item.id);
    const newCart = [item, ...cart];
    setCart(newCart);
    updateStoreCurrentCart(newCart);
  };

  const addToFavorite = item => {
    const newList = list.some(item => item.id === item.id);
    setFavorite(newList);
  };
  const removeFavorite = id => {
    const newList = list.filter(item => item.id !== id);
    setFavorite(newList);
  };

  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        AsyncStorage.getItem('@@GroceryList/currentList'),
        AsyncStorage.getItem('@@GroceryList/currentCart'),
      ])
        .then(([list, cartItems]) => [JSON.parse(list), JSON.parse(cartItems)])
        .then(([list, cartItems]) => {
          if (list) {
            setList(list);
          }
          if (cartItems) {
            setCart(cartItems);
          }
          setLoading(false);
        });
    }, 1000);
  }, []);

  return {
    list,
    loading,
    addItem,
    removeItem,
    addToCart,
    cart,
    favorite,
    setFavorite,
    addToFavorite,
    removeFavorite
  };
};
