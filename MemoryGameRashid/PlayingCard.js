/* 
Here is my Custom Component named PlayingCard! Here, you are able to create a "card" which can be rendered inside a FlatList! I used this custom component to create all of the 
character cards you see in my Memory App! 
*/

import { React, useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Image} from 'react-native';

export default function Card({imagelink, flipCard, card, isFlipped, disabled}) {
  function checkACard(){
    flipCard(card)
  }

  console.log(imagelink);

  return (
    <TouchableOpacity 
        style={styles.card} 
        onPress={checkACard}
        disabled={disabled}
        >
      <Image
        style={styles.oneCard}
        resizeMode = 'contain'
        source={isFlipped ? {uri: imagelink} : {uri: "https://www.colorhexa.com/99baf0.png"}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    backgroundColor: '#99baf0',
    opacity: 0.7,
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  oneCard: {
    height: 55,
    width: 55,
  },
});
