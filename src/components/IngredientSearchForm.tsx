'use client'

import { useState } from 'react'

type IngredientSearchFormProps = {
    onSearch: (ingredients: string[]) => void
}

export default function IngredientSearchForm({ onSearch }: IngredientSearchFormProps) {
  const [input, setInput] = useState('')
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const ingredients = input.split(',')
			.map(item => item.trim())
			.filter(item => item.length > 0)
		onSearch(ingredients)
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2 mb-4">
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="재료를 입력 해주세요. (예: 소금, 돼지고기"
				className="border px-2 flex-1"
			/>
			<button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
				검색
			</button>
		</form>
	)
}