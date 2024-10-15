import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { categories } from '@/constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '@/app/firebaseConfig'

interface CategoriesProps {
  activeCategory: string;                       // The current active category
  setActiveCategory: (category: string) => void;
  categories: string[] // Function to set the active category
}

export default function Categories({ categories, activeCategory, setActiveCategory }: CategoriesProps) {


  const getUser = () => {
    const auth = getAuth(app);

    createUserWithEmailAndPassword(
        auth,
        "jane.doe@example.com",
        "SuperSecretPassword!"
    )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  }

  return (
    <Animated.View entering={FadeInDown.duration(1000).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}>

          {
            categories.map((cat, index) => {
              let isActive = cat == activeCategory
              let activeButtonClass = isActive? 'bg-amber-400' : 'bg-black/10'
              return (
                <TouchableOpacity
                  key={index}
                  className="flex items-center space-y-1"
                  onPress={() => setActiveCategory(cat)}
                >
                  <View className={'rounded-full p-[6px] ' + activeButtonClass}>
                    <Image 
                      source={require('../assets/images/category_placeholder.jpg')} 
                      style={{width: hp(6), height: hp(6)}} 
                      className="rounded-full"/>
                  </View>
                  <Text className='text-neutral-600' style={{fontSize: hp(1.3)}}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
    </Animated.View>
  )
}
