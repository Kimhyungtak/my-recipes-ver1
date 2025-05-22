'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import IngredientSearchForm from '@/components/IngredientSearchForm'

type Recipe = {
  id: number
  name: string
}

export default function FilteredRecipeList() {
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const [loading, setLoading] = useState(false)

	const searchRecipes = async (ingredients: string[]) => {
		if (ingredients.length === 0) {
			setRecipes([])
			return
		}

		setLoading(true)

		const { data, error } = await supabase
			.schema('recipes')
			.rpc('search_recipes_by_ingredients', {
				ingredients_param: ingredients
			})
			.select();

		console.log('RPC data:', data);
		console.log('RPC error:', error);
	
		if (error) {
			console.error('검색 오류:', error)
			setRecipes([])
		} else {
			setRecipes(data ?? [])
		}
		setLoading(false)
 }

	return (
		<div className="my-6">
			<h2 className="text-xl font-semibold mb-2">재료로 요리 검색하기</h2>
			<IngredientSearchForm onSearch={searchRecipes} />

		
			{loading ? (
				<p>검색 중...</p>
			) : recipes.length === 0 ? (
				<p>검색된 요리가 없습니다.</p>
			) : (
				<ul className="list-disc pl-6">
					{recipes.map(recipe => (
					<li key={recipe.id}>{recipe.name}</li>
					))}
				</ul>
			)}
		</div>
 )
}