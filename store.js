import { configureStore, createSlice } from "@reduxjs/toolkit";
const recipeSlice = createSlice({
    name: 'recipes',
    initialState : {
        recipes: [
        {
            id: Date.now(), 
            name: "eggs",
            ingredients: "eggs, salt, pepper"
        }
        ],
        editingRecipe: null
    },
    reducers: {
        addRecipe: (state, action) => {
            state.recipes.push({
                id: Date.now(), ...action.payload
            });
        },
        editRecipe: (state, action)=>{
            const {id, name, ingredients
            } = action.payload;
            const existingRecipe = state.recipes.find(recipe=>recipe.id === id);
            if(existingRecipe){
                existingRecipe.name = name;
                existingRecipe.ingredients = ingredients;
            }
        },
        deleteRecipe: (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
        },
        setEditingRecipe: (state, action) =>{
            state.editingRecipe = action.payload;
        }
    }
});
export const {addRecipe, editRecipe, deleteRecipe, setEditingRecipe} = recipeSlice.actions;
export const store = configureStore({reducer: recipeSlice.reducer});
