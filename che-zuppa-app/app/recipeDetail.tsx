import { StatusBar, Text, View, Image , ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BanknotesIcon, BeakerIcon, BoltIcon, ChevronLeftIcon, ClockIcon, CurrencyEuroIcon} from 'react-native-heroicons/outline'
import { HeartIcon} from 'react-native-heroicons/solid'
import {  useLocalSearchParams, router } from 'expo-router';


export default function RecipeDetail() {
    // Retrieve the search params
    const { recipe } = useLocalSearchParams();
    const [isFavourite, setIsFavorite] = useState(false);

    // Check if recipe exists and parse it
    const parsedRecipe = recipe ? JSON.parse(recipe as string) : null;
    console.log(recipe)

    const goBack = () => {
        router.back()
    }
    return (
        <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
            <StatusBar barStyle={"light-content"} />
            {/* recipe image */}
            <View className="flex-row justify-center">
                <Image source={require('../assets/images/category_placeholder.jpg')} style={{width: wp(98), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}} />
            </View>

            { /* back button */}
            <View className='w-full absolute flex-row justify-between items-center pt-14'>
                <TouchableOpacity className="p-2 rounded-full ml-5 bg-white" onPress={goBack}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24' />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 rounded-full mr-5 bg-white" onPress={() => {
                    if (isFavourite) {
                        setIsFavorite(false)
                    } else {
                        setIsFavorite(true)
                    }

                }}>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color= {isFavourite? 'red': 'grey'} />
                </TouchableOpacity>
            </View>

            <View className="px-4 flex justify-between space-y-4 pt-8">
                { /* name and area */}
                <View className='space-y-2'>
                    <Text style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700'>
                        {Object.keys(parsedRecipe)}
                    </Text>
                    <Text style={{fontSize: hp(2)}} className='font-medium flex-1 text-neutral-500'>
                        {"Italian"}
                    </Text>
                </View>
                {/* misc */}
                <View className='flex-row justify-around'>
                    <View className='flex rounded-full p-1 items-center'>
                        <View style={{height: hp(3.5), width:hp(3.5)}} className='rounded-full flex items-center justify-center'>
                            <BeakerIcon size={hp(3)} strokeWidth={2.5} color={"black"} />
                        </View>
                        <View className='flex items-center'>
                            <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-800'>
                                {parsedRecipe[Object.keys(parsedRecipe)[0]]["Preparazione"]}
                            </Text>
                            <Text style={{fontSize: hp(1.2)}} className='font-bold text-neutral-800'>
                                min
                            </Text>
                        </View>
                    </View>
                    <View className='flex rounded-full p-1 items-center'>
                        <View style={{height: hp(3.5), width:hp(3.5)}} className='rounded-full flex items-center justify-center'>
                            <ClockIcon size={hp(3)} strokeWidth={2.5} color={"black"} />
                        </View>
                        <View className='flex items-center'>
                            <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-800'>
                                {parsedRecipe[Object.keys(parsedRecipe)[0]]["Cottura"]}
                            </Text>
                            <Text style={{fontSize: hp(1.2)}} className='font-bold text-neutral-800'>
                                min
                            </Text>
                        </View>
                    </View>
                    <View className='flex rounded-full p-1 items-center'>
                        <View style={{height: hp(3.5), width:hp(3.5)}} className='rounded-full flex items-center justify-center'>
                            <CurrencyEuroIcon size={hp(3)} strokeWidth={2.5} color={"black"} />
                        </View>
                        <View className='flex items-center'>
                            <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-800'>
                                {parsedRecipe[Object.keys(parsedRecipe)[0]]["Costo"]}
                            </Text>
                            <Text style={{fontSize: hp(1.2)}} className='font-bold text-neutral-800'>
                                min
                            </Text>
                        </View>
                    </View>
                    <View className='flex rounded-full p-1 items-center'>
                        <View style={{height: hp(3.5), width:hp(3.5)}} className='rounded-full flex items-center justify-center'>
                            <BoltIcon size={hp(3)} strokeWidth={2.5} color={"black"} />
                        </View>
                        <View className='flex items-center'>
                            <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-800'>
                                {parsedRecipe[Object.keys(parsedRecipe)[0]]["Difficoltà"]}
                            </Text>
                            <Text style={{fontSize: hp(1.2)}} className='font-bold text-neutral-800'>
                                dif
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            
            {/* ingredients */}
            <View className='space-y-4'>
                <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                    Ingredients
                </Text>
            
                <View className='space-y-2 ml-3'>
                    {
                        parsedRecipe[Object.keys(parsedRecipe)[0]].forEach((key: any, index: any) => {
                            return (
                                <View key={index} className='flex-row space-x-4'>
                                    <View style={{height: hp(1.5), width:hp(1.5)}} className='bg-amber-300 rounded-full'>
                                        <View className='flex-row space-x-2'>
                                            <Text>{key}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
    );
}