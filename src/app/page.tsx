/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from '@/lib/supabaseClient'
import FilteredRecipeList from '@/components/FilteredRecipeList'

type Recipe = {
  id: number
  name: string
  recipe_ingredients?: {
    ingredients: { name: string }
  }[];
} 

export default async function Home() {
  const { data } = await supabase
  .from('recipes')
  .select(`
    id,
    name,
    recipe_ingredients (
      ingredients (
        name
      )
    )
  `)

  const recipes = data as unknown as Recipe[] // recipes 데이터 타입을 unknown으로 지정정

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">요리 목록</h1>
    
    <FilteredRecipeList />
  
    {/* <ul className="list-disc pl-6">
      {recipes.map((recipe: Recipe) => {
        //1. 재료 배열 추출출
        const 재료 = Array.isArray(recipe.recipe_ingredients)
          ? recipe.recipe_ingredients.flatMap((ri) =>
            ri.ingredients ? [ri.ingredients.name] : []
          )
        :[]
      
       //2. 재료 출력용 문자열 생성
        const 재료문자열 = 재료.length > 0 ? 재료.join(', ') : '재료 없음'
      
        return (
          <li key={recipe.id}>
            <strong>🍽 {recipe.name}</strong> - 재료 :{재료문자열}  
          </li>
        )
      })}
    </ul> */}
  </div>
  )
}