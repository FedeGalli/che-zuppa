import { StatusBar, Text, View, Image , ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BanknotesIcon, BeakerIcon, BoltIcon, ChevronLeftIcon, ClockIcon, CurrencyEuroIcon} from 'react-native-heroicons/outline'
import { HeartIcon} from 'react-native-heroicons/solid'
import {  useLocalSearchParams, router } from 'expo-router';
import Animated, { FadeInDown, FadeIn, SlideInUp } from 'react-native-reanimated';


export default function RecipeDetail() {
    // Retrieve the search params
    const { recipe } = useLocalSearchParams();
    const [isFavourite, setIsFavorite] = useState(false);

    // Check if recipe exists and parse it
    const parsedRecipe = recipe ? JSON.parse(recipe as string) : null;

    const ingredientsKeys = Object.keys(parsedRecipe[Object.keys(parsedRecipe)[0]]["ingredients"])
    const stepsKeys = parsedRecipe[Object.keys(parsedRecipe)[0]]["steps"]
    //<Image source={{uri:parsedRecipe[Object.keys(parsedRecipe)[0]]['image']}} style={{width: wp(98), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}/>
    const goBack = () => {
        router.back()
    }
    return (
        <View className='flex-1 bg-white'>
        <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
            <StatusBar barStyle={"dark-content"} />
            


            {/* recipe image */}
            <Animated.View entering={SlideInUp.delay(200).springify().damping(20)} className="flex-row justify-center">
            <Image
                    source={{uri:parsedRecipe[Object.keys(parsedRecipe)[0]]['image']}}
                    style={{width: '98%', height: hp(35), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}
                    className='bj-black/5'
                />
            </Animated.View>

            <View className="px-4 flex justify-between space-y-4 pt-8">
                { /* name and area */}
                <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-2'>
                    <Text style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700'>
                        {Object.keys(parsedRecipe)}
                    </Text>
                    <Text style={{fontSize: hp(2)}} className='font-medium flex-1 text-neutral-500'>
                        {"Italian"}
                    </Text>
                </Animated.View>

                {/* misc */}
                <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='flex-row justify-around'>
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
                </Animated.View>

                {/* ingredients */}
                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4'>
                    <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                        Ingredients
                    </Text>
                
                    <View className='space-y-2 ml-3'>
                        {
                            ingredientsKeys.map((key: any, i: any) => {
                                return (
                                    <View key={i} className='flex-row space-x-4'>
                                        <View style={{height: hp(1), width:hp(1)}} className='bg-amber-300 rounded-full' />
                                        <View className='flex-row space-x-2'>
                                            <Text style={{fontSize: hp(1.7)}}className='font-extrabold text-neutral-700'>{key}</Text>
                                            <Text style={{fontSize: hp(1.7)}}className='font-medium text-neutral-600'>{parsedRecipe[Object.keys(parsedRecipe)[0]]["ingredients"][key]} g</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </Animated.View>

                {/* steps */}
                <Animated.View entering={FadeInDown.delay(500).duration(700).springify().damping(12)} className='space-y-4'>
                    <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                        Steps
                    </Text>
                
                    <View className='space-y-2 ml-3'>
                        {
                            stepsKeys.map((item: any, i: any) => {
                                return (
                                    <View key={i} className='flex-row space-x-4'>
                                        <View style={{height: hp(1.5), width:hp(1.5)}} className='bg-amber-300 rounded-full' />
                                        <View className='flex-row space-x-2'>
                                            <Text style={{fontSize: hp(1.7)}}className='font-medium text-neutral-600'>{item}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </Animated.View>
            </View>
        </ScrollView>
        {/* Back button and favorite button */}
        <Animated.View entering={FadeIn.delay(200).duration(500)} className='absolute w-full flex-row justify-between items-center pt-14' style={{zIndex: 1, top: 0}}>
                <TouchableOpacity className="p-2 rounded-full ml-5 bg-white" onPress={goBack}>
                    <ChevronLeftIcon size={hp(3)} strokeWidth={4.5} color='#fbbf24' />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 rounded-full mr-5 bg-white" onPress={() => {
                    if (isFavourite) {
                        setIsFavorite(false);
                    } else {
                        setIsFavorite(true);
                    }
                }}>
                    <HeartIcon size={hp(3)} strokeWidth={4.5} color={isFavourite ? 'red' : 'grey'} />
                </TouchableOpacity>
            </Animated.View>
        </View>

    );
}