'use client'


export default function IngredientPill({ingredient, index, onClick} : {
    ingredient: string,
    index: number
    onClick: (ingredient: string) => void
}) {
    const colors: string[] = ["primary-bg", "secondary-bg", "tertiary-bg"];
    const hoverColors: string[] = ["hover:dark-primary-bg", "hover:dark-secondary-bg", "hover:dark-tertiary-bg"];

    const color: string = colors[index % colors.length];
    const hoverColor: string = hoverColors[index % hoverColors.length];

    return (
        <div className={`${color} ${hoverColor} py-1 px-2 w-max h-max rounded-xl inline-block m-1`}>
            <button type='button' className='w-max' onClick={() => onClick(ingredient)}>
                <p className='w-max text-center text-sm'>{ingredient}</p>
            </button>
        </div>
    )
}