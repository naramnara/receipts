import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, editRecipe, deleteRecipe, setEditingRecipe } from './store';


const App =() =>{
  const dispatch = useDispatch();
  const recipes = useSelector (state=>state.recipes);
  const editingRecipe = useSelector(state=>state.editingRecipe);
  const [name, setName] = useState(editingRecipe ? editingRecipe.name : "");
  const [ingredients, setIngredients] = useState (editingRecipe ? editingRecipe.ingredients : "");
  const handleSubmit = (e)=>{
e.preventDefault();
if(editingRecipe){
  dispatch(editRecipe({
    id: editingRecipe.id, name, ingredients
  }));
  dispatch(setEditingRecipe(null));
}
else{
  dispatch(addRecipe({
    name, ingredients
  }));
}
setName("");
setIngredients("");
  };
  const handleEdit = (recipe) =>{
setName (recipe.name);
setIngredients(recipe.ingredients);
dispatch(setEditingRecipe(recipe));

  };
  const handleDelete  = (id)=>{
dispatch(deleteRecipe(id));
  };
  return (
    <div>
      <h1>recipes</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value = {name} onChange={(e) => setName(e.target.value)} placeholder='Name of dish' required></input>
      <textarea value={ingredients} onChange={(e)=>setIngredients(e.target.value)} placeholder='ingredients' required></textarea>
      <button type="submit">{editingRecipe ? 'edit':'add'}</button>
      </form>
      <ul>
        {recipes.map(recipe => (
          <li key ={recipe.id}><h3>{recipe.name}</h3>
          <p>{recipe.ingredients}</p>
          <button onClick={()=>handleEdit(recipe)}>edit</button>
          <button onClick={()=>handleDelete(recipe.id)}>delete</button></li>
        ))}
      </ul>
    </div>
  );
};

export default App;
