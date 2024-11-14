'use client'


export default function IngredientPill({ingredient, index, onClick} : {
    ingredient: string,
    index: number
    onClick: (ingredient: string) => void
}) {
    const colors = ["primary-bg", "secondary-bg", "tertiary-bg"];

    const color: string = colors[index % colors.length];

    return (
        <div className={`${color} hover:bg-blue-400 py-1 px-2 w-max h-max rounded-xl inline-block m-1`}>
            <button type='button' className='w-max' onClick={() => onClick(ingredient)}>
                <p className='w-max text-center text-sm'>{ingredient}</p>
            </button>
        </div>
    )
}