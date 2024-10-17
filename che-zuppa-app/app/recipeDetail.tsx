import { StatusBar, Text, View, Image , ScrollView, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChatBubbleBottomCenterTextIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '@/components/categories';
import { getDatabase, ref, get } from "firebase/database";
import { app } from '@/app/firebaseConfig'
import Recipes from "@/components/recipes"

export default function RecipeDetail() {
  return(
    <View className='flex-1 bg-white'>
    </View>
  )
}