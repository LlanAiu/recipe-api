

export default function IngredientSearchResult({ingredient, addIngredient, removeIngredient, initialCheck} : {
    ingredient: string,
    addIngredient: (ingredient: string) => void,
    removeIngredient: (ingredient: string) => void
    initialCheck: boolean
}) {

    let checked = initialCheck;

    function handleCheck(){
        checked = !checked;
        if(checked){
            addIngredient(ingredient);
        } else {
            removeIngredient(ingredient);
        }
    }
    
    return (
        <div className='bg-slate-50 hover:bg-slate-300 pl-2 h-max rounded-sm'>
            <button type='button' className='w-full text-left pl-2 py-1' onClick={handleCheck}>
                {checked ? <p>✓ {ingredient}</p> : <p>+ {ingredient}</p>}
            </button>
        </div>
    );
}