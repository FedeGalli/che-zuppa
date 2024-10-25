import { Pressable, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list'
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useRouter } from 'expo-router';

export default function Recipes({recipes} : any) {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(false);
        const timer = setTimeout(() => {
            if (recipes.length === 0) {
            setShowLoading(true);  // Show loading after 400ms delay
            }
        }, 400);

        // Cleanup the timeout if recipes update before the 200ms is up
        return () => clearTimeout(timer);
        }, [recipes]);
    
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600">Recipes</Text>
      <View>
        {
            showLoading && recipes.length === 0 ? (
                <Loading size='large' className='mt-20'/>
            ) :
                <MasonryList
                    data={recipes}
                    keyExtractor={(item): string => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, i}) => <RecipeCard key={Math.random().toString()} item={item} index={i}/>}
                    //refreshing={isLoadingNext}
                    //onRefresh={() => refetch({first: ITEM_CNT})}
                    onEndReachedThreshold={0.1}
                    //onEndReached={() => loadNext(ITEM_CNT)}
                />

        }
      </View>
    </View>
  )
}

const RecipeCard = ({item, index} : any) => {
    let isEven = index % 2 == 0;
    const router = useRouter()

    const [isChecked, setIsChecked] = useState(false);
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(20)}>
            <Pressable
                style={{width: '100%', paddingLeft: isEven? 0 : 8, paddingRight: isEven? 8: 0}}
                className='flex justify-center mb-4 space-y-1'
                onPress={() => {
                    router.push({
                        pathname: '/recipeDetail',
                        params: {
                          recipe: JSON.stringify(item),  // Convert the object to a string
                        }
                      });
                }}
            >
                <View style={{position: 'relative', width: '100%'}}>
                    <Image
                        source={{uri:item[Object.keys(item)[0]]['image']}}
                        style={{width: '100%', height: hp(25), borderRadius:35}}
                        className='bj-black/5'
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 10,   // Top position of the button
                            right: 10, // Right position of the button
                            backgroundColor: isChecked ? '#5ced73' : 'white', // Change color based on state
                            width: hp(4),  // Width of the circle
                            height: hp(4), // Height of the circle (same as width)
                            borderRadius: 20,  // Half of the width/height to make it a circle
                            justifyContent: 'center',  // Center the text inside the circle
                            alignItems: 'center',  // Center the text inside the circle
                        }}
                        onPress={() => {
                            // Toggle the button state between checked and unchecked
                            setIsChecked(!isChecked);
                        }}
                    >
                        {/* Display checkmark or + based on state */}
                        <Text style={{color: 'black', fontSize: hp(2.5), fontWeight: 'bold'}}>
                            {isChecked ? '✓' : '+'}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 10, // Stick to the bottom of the image
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
                            borderRadius: 35, // Match the image's bottom-left radius
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            flexDirection: 'row', // Align text and slots horizontally
                            alignItems: 'center', // Center items vertically
                            justifyContent: 'space-between', // Space out text and slots
                            marginLeft: hp(1.5),
                            marginRight: hp(1.5),
                            height: 60, // Fixed height for consistent layout
                            overflow: 'hidden'
                        }}
                    >
                        {/* Left-aligned text */}
                        <Text
                            style={{
                                fontSize: hp(1.3),
                                flex: 1, // Allow the text to take up available space
                            }}
                            className='font-semibold ml-2 text-neutral-800'
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {
                                Object.keys(item)[0]
                            }
                        </Text>

                        {/* Right-aligned cost and time slots */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* Pipe for cost */}
                            <View style={{ width: 1, height: hp(2), backgroundColor: 'gray', marginHorizontal: hp(0.5)}} />
                            <Text style={{ fontSize: hp(1.5), color: 'black' }}>5'</Text>

                            {/* Pipe for time */}
                            <View style={{ width: 1, height: hp(2), backgroundColor: 'gray', marginHorizontal: hp(0.5)}} />
                            <Text style={{ fontSize: hp(1.5), color: 'black' }}>20$</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    )
        
}
