/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { CloseSquare, DirectDown, EyeSlash, Warning2 } from 'iconsax-react-native';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, TouchableOpacity, FlatList, Share } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { captureRef } from 'react-native-view-shot';

import AnimationScreen from '~/app/component/Animation';
import IconContainer from '~/app/component/iconContainer'; 
import { colors } from '~/app/constants/theme';
import { Screen, Text } from '~/app/lib';
import { background_1, background_2, background_3, background_4, background_5, background_6 } from '~/assets/images/image';

const { width, height } = Dimensions.get('window');
const imageSources = [ background_3, background_1, background_2, background_4, background_5, background_6 ];
const botToken = '6997363744:AAHWzUYdGY-WQgvhrQoq4Us7OSbhCD3ok3A'

const Quote = () => {
  const [telegramMessages, setTelegramMessages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null){
    requestPermission();
  }

  const flatListRef = useRef(null);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const handleSave = async () => {
    try {
      const uri = await captureRef(flatListRef, {
        format: 'png',
        quality: 1,
      });
     await MediaLibrary.saveToLibraryAsync(uri);
     if(uri){
      console.log('Image saved successfully');
     }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleShare = async () => {
    try {
      if (flatListRef.current) {
        const uri = await captureRef(flatListRef, {
          format: 'png',
          quality: 1,
        });
         await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  const fetchTelegramMessages = async () => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
      const messages = await response.json();
      setTelegramMessages(messages.result); // Store messages in state
      return messages.result
    } catch (error) {
      console.error('Error fetching Telegram messages:', error);
      throw error;
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey:['messages'], 
    queryFn: fetchTelegramMessages
    
  })

  if (data) {
    console.log('Fetched messages:', JSON.stringify(data, null, 2));
  } else if (error) {
    console.error('Error fetching messages:', error);
  } else if (isLoading) {
    console.log('Loading messages...');
  } else {
    console.log('No data fetched yet.');
  }

  if (isLoading) 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AnimationScreen/>
      <Text family='bold' size={10} color='#000000' style={{fontStyle: 'italic', marginTop: 20}}>Gathering your favorite quotes and books.....</Text>
    </View>
      );

  if (error) 
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginTop: 50}}>Please  check your internet connection and try again</Text>
    </View>
    )

    const renderItem = ({item, index}: any) => {
      const randomImageIndex = Math.floor(Math.random() * imageSources.length);
      const randomImageSource = imageSources[randomImageIndex];
      return (
        <View style={{flex: 1, height: Dimensions.get("window").height, width, }}>

        <ImageBackground source={randomImageSource} style={styles.imageBackground} >
          <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
            <View style={styles.quoteContainer}>
              <Text size={50} family='bold' color={colors.theme.primary} style={styles.apros}>"</Text>
            <Text color='white' size={23} family='semi-bold' style={styles.quoteText}>{item.channel_post.text}</Text> 
          
          <Text size={16} family='light' color={colors.theme.primary} 
            style={styles.author} >@_Spiritual</Text>
            </View>
          </BlurView>
        </ImageBackground>
      
        </View>
      )
    }

  return (
    <Screen
      statusBarStyle="dark"
      safeAreaEdges={['top', 'bottom', 'start', 'end']}
      contentContainerStyle={styles.container}
    >
     <FlatList 
        ref={flatListRef}
        data={telegramMessages}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      />

      <View style={styles.iconContainer}>
        <IconContainer
          onSave={toggle}
          onShare={handleShare}
        />
      </View>
    
      <View style={styles.bottomsheetContainer}>
        <BottomSheet visible={visible} onBackButtonPress={toggle} onBackdropPress={toggle}>
          <View style={styles.card}>
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', margin: 15 }}>
              <CloseSquare size="32" color="#000000" onPress={toggle}/>
            </View>
            <View style={{ marginHorizontal: 20, flexDirection: 'row' }}>
              <View style={styles.downloads}>
               
              <TouchableOpacity style={styles.downloadsIcon} onPress={handleSave}>
                <DirectDown size="30" color="#FF8A65" variant='Bold'/>
              </TouchableOpacity>
              <Text family='light'color='#000000' size={10}>Download</Text>
              </View>
              <View  style={styles.downloads}>
             
                <TouchableOpacity style={styles.downloadsIcon}>
                  <Warning2 size="30" color="#FF8A65" variant='Bold' />
                </TouchableOpacity>
                <Text family='light' color='#000000' size={10}>Remove Water mark</Text>
              </View>
              <View style={styles.downloads}>
             <TouchableOpacity  style={styles.downloadsIcon}>
             <EyeSlash size="30" color="#FF8A65" variant='Bold'/>
             </TouchableOpacity>
             <Text family='light' color='#000000' size={10}>Remove Ads</Text>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  imageBackground: {
    flex: 1,
    width,
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  apros: {
    alignSelf: 'flex-start',
  },
  quoteContainer: {
    marginHorizontal: 40, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  quoteText: {
    textAlign: 'center'
  },
  author: {
    alignSelf: 'flex-end',
     marginVertical: 40, 
     fontStyle: 'italic',
     },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tabContentBtn: {
    flexDirection: 'row',
    marginTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
  },
  blurContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
   alignItems: 'center'
  },
  bottomsheetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  card: {
    backgroundColor: '#f2f2f0',
    height: 150,
    borderRadius: 20,
    margin: 10,
    marginBottom: 40,
  },
  downloads: {
    alignItems: 'center',
    marginRight: 10
  },
  downloadsIcon: {
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
    borderRadius: 10,
    borderColor: '#000000'
  }
});

export default Quote;
