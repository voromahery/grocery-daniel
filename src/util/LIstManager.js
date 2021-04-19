import {useEffect, useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const addItem = text => {
    const newList = [{id: uuid(), name: text}, ...list];
    setList(newList);
    updateStoreCurrentList(newList);
  };

  const updateStoreCurrentList = list => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
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
  };

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('@@GroceryList/currentList')
        .then(data => JSON.parse(data))
        .then(data => {
          if (data) {
            setList(data);
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
  };
};
