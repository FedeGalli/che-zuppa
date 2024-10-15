import { StatusBar, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import {  useRouter } from 'expo-router';

export default function WelcomeScreen() {

  const ring1Paddding = useSharedValue(0);
  const ring2Paddding = useSharedValue(0);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => ring1Paddding.value = withSpring(ring1Paddding.value + hp(4)), 100);
    setTimeout(() => ring2Paddding.value = withSpring(ring2Paddding.value + hp(5)), 300);

    setTimeout(() => router.push('../home'), 2500);
  }, [])

  return (
    <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
      <StatusBar barStyle={"light-content"}/>

      <Animated.View className='bg-white/20 rounded-full' style={{padding: ring1Paddding}}>
        <Animated.View className='bg-white/20 rounded-full' style={{padding: ring2Paddding}}>
          <Image source={require("../assets/images/logo.png")} style={{height: hp(20), width: hp(20)}}/>
        </Animated.View>
      </Animated.View>

      <View className='flex items-center space-y-2'>
        <Text className='font-bold text-white text-5xl' style={{fontSize: hp(5)}}>
          Che Zuppa!
        </Text>
        <Text className='font-medium text-white text-lg' style={{fontSize: hp(2)}}>
          Easy, ci pensiamo noi
        </Text>
      </View>
    </View>
  )
}