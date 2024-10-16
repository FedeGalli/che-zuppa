import { StatusBar, Text, View, Image , ScrollView, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChatBubbleBottomCenterTextIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '@/components/categories';
import { getDatabase, ref, get } from "firebase/database";
import { app } from '@/app/firebaseConfig'
import Recipes from "@/components/recipes"

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const [recipes, setRecipes] = useState<object[]>([])

  const getCategories = async () => {
    const db = getDatabase(app);
    const conn = ref(db, '/');
    const snapshot = await get(conn);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const fetchedCategories = Object.keys(data["recipes"]);
      setCategories(fetchedCategories);
      return fetchedCategories;  // Return categories to use in chaining
    } else {
      console.error('No categories found');
      return [];
    }
  };

  // Fetch recipes based on categories
  const getRecipes = async (categories: string[]) => {
    const db = getDatabase(app);
    let formattedRecipes: object[] = [];

    const recipePromises = categories.map(async (category) => {
      const conn = ref(db, `/recipes/${category}`);
      const snapshot = await get(conn);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const recipeKeys = Object.keys(data);
        recipeKeys.forEach((recipeKey) => {
          formattedRecipes.push({ [recipeKey]: data[recipeKey] });
        });
      }
    });

    // Wait for all recipes to be fetched before updating the state
    await Promise.all(recipePromises);

    // Now call setRecipes after all data is retrieved
    setRecipes(formattedRecipes);  // Update the state with the fetched recipes
  };

  // Chained data fetching for categories and then recipes
  useEffect(() => {
    const fetchCategoriesAndRecipes = async () => {
      const fetchedCategories = await getCategories();
      if (fetchedCategories.length > 0) {
        await getRecipes(fetchedCategories);
      }
    };

    fetchCategoriesAndRecipes();  // Call the async fetch function
  }, []);  // Only runs once when the component mounts


  return(
    <View className='flex-1 bg-white'>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14">
        {/* Avatar image */}
        <View className="mx-4 flex-row justify-between items-centered mb-2">
          <Image source={require('../assets/images/avatar.png')} style={{height: hp(5), width: hp(5.5)}} className='rounded-full bg-slate-300'/>
          <ChatBubbleBottomCenterTextIcon size={hp(4)} color="#94a3b8"/>
        </View>

        {/* Main Text */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">Ciao, Federico</Text>
          <View>
            <Text style={{fontSize: hp(3.8)}}className="font-semibold text-neutral-600">Scegli cosa mangiare,</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}}className="font-semibold text-neutral-600">al resto ci pensiamo <Text className="text-amber-400">noi.</Text></Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Cerca cosa mangiare'
            placeholderTextColor={'#94a3b8'}
            style={{fontSize: hp(1.7)}}
            className='flex-1 text-base mb-1 pl-3 tracking-wider'
          />
          <View className='bg-white rounded-full p-3'>
            <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color={"#94a3b8"} />
          </View>
        </View>
        {/* Categories rendering */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}
        </View>

        {/* Recipes list */}
        <View>
          {recipes.length > 0 && <Recipes recipes={recipes} />}
        </View>
      </ScrollView>
    </View>
  )
}