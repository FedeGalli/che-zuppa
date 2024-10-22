import { Pressable, Text, View, Image } from 'react-native'
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
                <Image
                    source={require('../assets/images/category_placeholder.jpg')}
                    style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius:35}}
                    className='bj-black/5'
                />
                <Text style={{fontSize: hp(1.5)}} className='font-samibold ml-2 text-neutral-600'>
                    {
                        Object.keys(item).length > 25? Object.keys(item).slice(0, 20) + '...': Object.keys(item)
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
        
}
