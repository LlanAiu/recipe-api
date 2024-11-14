'use client'


export default function IngredientPill({ingredient, onClick} : {
    ingredient: string,
    onClick: (ingredient: string) => void
}) {


    return (
        <div className='bg-blue-200 hover:bg-blue-400 py-1 px-2 w-max h-max rounded-xl inline-block m-1'>
            <button type='button' className='w-max' onClick={() => onClick(ingredient)}>
                <p className='w-max text-center text-sm'>{ingredient}</p>
            </button>
        </div>
    )
}