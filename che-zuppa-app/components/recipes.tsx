import { Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list'

export default function Recipes({recipes} : any) {
    
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600">Recipes</Text>
      <View>
        <MasonryList
            data={recipes}
            keyExtractor={(item): string => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => <RecipeCard item={item} index={i}/>}
            //refreshing={isLoadingNext}
            //onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            //onEndReached={() => loadNext(ITEM_CNT)}
        />
      </View>
    </View>
  )
}

const RecipeCard = ({item, index} : any) => {
    return (
        <View>
            <Text>{item["lactose_free"]}</Text>
        </View>
    )
        
}
