/*
Welcome to my Memory Game App! In this game, there are multiple characters from the famous TV show "PAW PATROL". Your job is to click on different "cards" (Touchable Opacities) and
obtain a matching pair. If the pair is matching, then the two cards will remain "unflipped" to display that. If they are not matching, however, then the cards will become 
unflipped once again. The goal is to match every single pair of cards, which is shuffled each time you start a new game, so no cheating! On the top, the number of attempts you have 
used will be displayed. At the end, this number is displayed again in an alert congratulating you on your victory. As for how I made this app function, it is as follows. I set the 
user's first flip to its own variable, and the same for its second flip. If the url's are the same, then the pair is matching, and the opposite if they are not the same. One neat
trick is that all other buttons will be disabled while the app checks if the pair is a match. On the bottom, there is a reset button, which reshuffles the array for the user to 
play again. My code does have its limitations, however. For example, it takes some time for all of the images to render, so pressing a button too early can lead to some complications
with what the user actually pressed. Moreover, some of the images are not transparent, so they have borders. This was simply an issue with the links I chose, and was not easy to fix
on its own. Besides these drawbacks, the app is still very enjoyable, and I hope you have fun playing with it!
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Moment, Vibration, Platform, Modal, View, Text, Button, TextInput, TouchableOpacity, SafeAreaView, Image, ImageBackground, Dimensions, Switch, Alert, ViewPagerAndroidComponent, Systrace, ScrollView, Touchable, FlatList} from 'react-native';
import { React, useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from "./PlayingCard";

function HomeScreen({ navigation }) {
  return (
      <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <View style={{...styles.row, ...{marginVertical: 200}, ...styles.titleBox}}>
            <Text style={{...styles.title, ...{fontFamily: 'HoeflerText-Regular'}}}>Paw Patrol Memory Game!</Text>
          </View>
          <View  style={{...styles.row, ...{marginVertical: 160}}}>
            <TouchableOpacity
              style={styles.start}
              title="Go to Details"
              onPress={() => navigation.navigate('Play')}
            >
              <Text style = {{...styles.startButton, ...{fontFamily: 'HoeflerText-Regular'}}}>Start!</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
  );
}

function GameScreen() {
  const image = {uri: "https://m.media-amazon.com/images/M/MV5BMTkzYWFlZjItZWE0My00YjBhLWE3MjgtNWJjZDhlZmUzMDg4XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_FMjpg_UX1000_.jpg"}
  const defaultCard = {uri: "https://www.colorhexa.com/99baf0.png"}
  const PawPatrolCrew = [
    {key: 0, name: "Chase", flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/7/71/Chase_PNG.png/revision/latest?cb=20180825085928"}, //Chase
    {key: 1, name: "Ryder", flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/f/fe/Pic-ryder.png/revision/latest?cb=20210418105340"}, //Ryder
    {key: 2, name: "Rubble",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/a/ad/Rubble_PNG.png/revision/latest/top-crop/width/360/height/360?cb=20190305234003"}, //Rubble
    {key: 3, name: "Rocky",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/6/64/Rocky_PNG.png/revision/latest?cb=20150520174057"}, //Rocky
    {key: 4, name: "Skye",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/9/9f/PAW_Patrol_Skye_PNG_2.png/revision/latest?cb=20150522121200"}, //Skye
    {key: 5, name: "Everest",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/8/8b/Xpaw-patrol-everest.png.pagespeed.ic.LZhNo62aEQ.png/revision/latest?cb=20180821164321"}, //Everest
    {key: 6, name: "Marshall",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/6/64/Marshall_PNG.png/revision/latest?cb=20150520174150"}, //Marshall
    {key: 7, name: "Jake",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/a/a4/Jakey4.png/revision/latest?cb=20160413012120"}, //Jake
    {key: 8, name: "Mr. Porter",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/c/cb/Mr_Porter_transparent.png/revision/latest/top-crop/width/360/height/450?cb=20210111165204"}, //Mr. Porter
    {key: 9, name: "Zuma",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/0/09/Screenshot_435_3_-removebg-preview.png/revision/latest/scale-to-width-down/1200?cb=20210409205947"}, //Zuma
    {key: 10, name: "Cap'n Turbot",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/a/a3/Cap%27n_Turbot_stock_art.png/revision/latest?cb=20190219213136"}, //Cap'n Turbot
    {key: 11, name: "Tracker",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/7/7f/Tracker_clear.png/revision/latest?cb=20180825092816"}, //Tracker
    {key: 12, name: "Farmer Yumi",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/f/fb/Yumi.png/revision/latest/top-crop/width/360/height/450?cb=20200918214901"}, //Farmer Yumi
    {key: 13, name: "Alex Porter",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/f/fd/Alex_Porter.png/revision/latest?cb=20201029002052"}, //Alex Porter
    {key: 14, name: "Francois",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/8/8c/Francois_Turbot_stock_art.png/revision/latest?cb=20190219213306"}, //Francois Turbot
    {key: 15, name: "Daring Danny",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/6/63/Dannyx1.png/revision/latest/scale-to-width-down/1200?cb=20160416084513"}, //Daring Danny X
    {key: 16, name: "Mayor Goodway",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/3/33/Mayorgoodway.png/revision/latest?cb=20200918221439"}, //Mayor Goodway
    {key: 17, name: "Mayor Humdinger",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/4/4d/Humding.png/revision/latest/scale-to-width-down/250?cb=20151114001653"}, //Mayor Humdinger
    {key: 18, name: "Chase",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/7/71/Chase_PNG.png/revision/latest?cb=20180825085928"}, //Chase
    {key: 19, name: "Ryder",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/f/fe/Pic-ryder.png/revision/latest?cb=20210418105340"}, //Ryder
    {key: 20, name: "Rubble",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/a/ad/Rubble_PNG.png/revision/latest/top-crop/width/360/height/360?cb=20190305234003"}, //Rubble
    {key: 21, name: "Rocky",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/6/64/Rocky_PNG.png/revision/latest?cb=20150520174057"}, //Rocky
    {key: 22, name: "Skye",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/9/9f/PAW_Patrol_Skye_PNG_2.png/revision/latest?cb=20150522121200"}, //Skye
    {key: 23, name: "Everest",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/8/8b/Xpaw-patrol-everest.png.pagespeed.ic.LZhNo62aEQ.png/revision/latest?cb=20180821164321"}, //Everest
    {key: 24, name: "Marshall",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/6/64/Marshall_PNG.png/revision/latest?cb=20150520174150"}, //Marshall
    {key: 25, name: "Jake",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/a/a4/Jakey4.png/revision/latest?cb=20160413012120"}, //Jake
    {key: 26, name: "Mr. Porter",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/c/cb/Mr_Porter_transparent.png/revision/latest/top-crop/width/360/height/450?cb=20210111165204"}, //Mr. Porter
    {key: 27, name: "Zuma",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/0/09/Screenshot_435_3_-removebg-preview.png/revision/latest/scale-to-width-down/1200?cb=20210409205947"}, //Zuma
    {key: 28, name: "Cap'n Turbot",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/a/a3/Cap%27n_Turbot_stock_art.png/revision/latest?cb=20190219213136"}, //Cap'n Turbot
    {key: 29, name: "Tracker",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/7/7f/Tracker_clear.png/revision/latest?cb=20180825092816"}, //Tracker
    {key: 30, name: "Farmer Yumi",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/f/fb/Yumi.png/revision/latest/top-crop/width/360/height/450?cb=20200918214901"}, //Farmer Yumi
    {key: 31, name: "Alex Porter",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/f/fd/Alex_Porter.png/revision/latest?cb=20201029002052"}, //Alex Porter
    {key: 32, name: "Francois",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/8/8c/Francois_Turbot_stock_art.png/revision/latest?cb=20190219213306"}, //Francois Turbot
    {key: 33, name: "Daring Danny",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/6/63/Dannyx1.png/revision/latest/scale-to-width-down/1200?cb=20160416084513"}, //Daring Danny X
    {key: 34, name: "Mayor Goodway",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/3/33/Mayorgoodway.png/revision/latest?cb=20200918221439"}, //Mayor Goodway
    {key: 35, name: "Mayor Humdinger",  flipped: false, enabled: true, url: "https://static.wikia.nocookie.net/paw-patrol/images/4/4d/Humding.png/revision/latest/scale-to-width-down/250?cb=20151114001653"}, //Mayor Humdinger
  ]
  
  function shuffleCards(){
    const PawPatrolCrewShuffled = PawPatrolCrew.sort(() => Math.random() - 0.5)
    setItems(PawPatrolCrewShuffled)
    setFlippedCard1(null)
    setFlippedCard2(null)
    setAttempts(0)
    setMatchedCards(0)
  }

  const [items, setItems] = useState(PawPatrolCrew);
  const [flippedCard1, setFlippedCard1] = useState(null);
  const [flippedCard2, setFlippedCard2] = useState(null);
  const [matchedCards, setMatchedCards] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [disableCards, setDisableCards] = useState(false);
  const [disableReset, setDisableReset] = useState(false)

  const flipCard = (card) => {
    flippedCard1 ? setFlippedCard2(card) : setFlippedCard1(card)
  }

  useEffect(() => {
    if (matchedCards == 36){
      Alert.alert("You matched the Paw Patrol Crew! Radical! \n Number of attempts: " + JSON.stringify(attempts))
    }
    else if (flippedCard1 != null && flippedCard2 != null){
      setDisableCards(true)
      setDisableReset(true)
      if (flippedCard1.url === flippedCard2.url){
        setItems(items.map(card => {
            if (card.url === flippedCard1.url){
              setMatchedCards(matchedCards => matchedCards + 1)
              return {...card, match: true}
            }
            else
              return card
          })
        )
        newRound()
      }
      else{
        setTimeout(() =>
          newRound()
        , 1500)
      }
    }
  }, [flippedCard1, flippedCard2])

  function newRound(){
    setFlippedCard1(null);
    setFlippedCard2(null);
    setAttempts(attempts => attempts + 1)
    setTimeout(() =>{
      setDisableCards(false)
      setDisableReset(false)
    }
  , 500)
  }

  function resetGame(){
    setItems(items.map(card => {
      return {...card, match: false}
    }))
    setAttempts(0)
    shuffleCards()
  }

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container2}>
        <View style={styles.attemptsCount}>
            <Text style = {{...styles.gameInfoText, ...{fontFamily: 'HoeflerText-Regular'}}}>Attempts: {attempts}</Text>
        </View>
        <SafeAreaView style={{...styles.row, ...{marginVertical: 60}}}>
          <FlatList 
            numColumns={6}
            data={items}
            scrollEnabled = {false}
            renderItem={({ item }) => (
              <Card
                imagelink={item.url}
                flipCard={flipCard} 
                card = {item} 
                isFlipped = { item == flippedCard1 || item == flippedCard2 || item.match == true}
                disabled = {disableCards || item.match == true || item == flippedCard1 || item == flippedCard2}
              />

            )}
          />
        </SafeAreaView>
            <TouchableOpacity
              style={styles.reset}
              onPress={() => resetGame()} 
              disabled = {disableReset}
            >
              <Text style = {{...styles.gameInfoText, ...{fontFamily: 'HoeflerText-Regular'}}}>Play Again!</Text>
            </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        options={{headerShown: false}}
        name="Home" 
        component={HomeScreen}
        />
        <Stack.Screen 
        options={{headerShown: false}}
        name="Play" 
        component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5877c4',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: "row",
    //backgroundColor: 'rgba(53, 65, 232, 0.5)',
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  attemptsCount: {
    resizeMode: 'contain',
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 10,
    backgroundColor: "grey",
    opacity: 0.9,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'rgba(53, 65, 232, 0.25)',
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 10,
    backgroundColor: "grey",
    height: 60,
    width: 60,
  },
  titleBox: {
    textAlign: "center",
  },
  title: {
    fontSize: 38,
    textAlign: 'center',
    color: "white",
  },
  start: {
    borderWidth: 3,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
  },
  reset: {
    borderWidth: 5,
    borderRadius: 10,
    backgroundColor: "grey",
    opacity: 0.8,
  },
  startButton: {
    fontSize: 120,
    textAlign: 'center',
    color: "white",
    textAlign: "center"

  },
  gameInfo: {
    borderWidth: 5,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  gameInfoText: {
    fontSize: 60,
    textAlign: 'center',
    color: "black",
    
  },
  scores: {
    borderWidth: 5,
    borderRadius: 10,
    backgroundColor: "grey"
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pic: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    height: 55,
    width: 55,
  },
  iconFlipped: {
    height: 0,
    width: 0,
  },
});
