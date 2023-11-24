import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



let api = ' http://localhost:3000/data'


export const getData = createAsyncThunk(
    'todos/getData',
    async function(_, {getState}){
        let api2 = api

        if(getState().todos.length !== 0){
            api2 = `${api}?q=${getState().todos.search}`
        }

        try {
            const {data} = await axios.get(api2)
            return data
        } catch (error) {
            
        }
    }
)




export const deletUser = createAsyncThunk(
    'todos/deletUser',
    async function(id, {dispatch}){
        try {
            const {data} = await axios.delete(`${api}/${id}`)
            dispatch(getData())
        } catch (error) {
            console.log(error);
        }
    }
)

export const checkUser = createAsyncThunk(
    'todos/checkUser',
    async function(check, {dispatch}){

        try {
            const {data} = await axios.put(`${api}/${check.id}`,{
                title:check.title,
                bg:check.bg,
                complite:!check.complite
            })
            dispatch(getData())
        } catch (error) {
            console.log(error);
        }
    }
)



export const editUser = createAsyncThunk(
    'todos/editUser',
    async function(check, {dispatch}){

        try {
            const {data} = await axios.put(`${api}/${check.id}`,{
                title:check.title,
                bg:check.bg,
                complite:!check.complite
            })
            dispatch(getData())
        } catch (error) {
            console.log(error);
        }
    }
)



export const addUser = createAsyncThunk(
    'todos/addUser',
    async function(id, {dispatch,getState}){

        let text = getState().todos.text;
        let bg = getState().todos.bg;

        try {

            let newUser ={
                title:text,
                bg:bg,
                complite:false
            }

            const {data} = await axios.post(api, newUser)
            dispatch(getData())
        } catch (error) {
            console.log(error);
        }
    }
)











export const todos = createSlice({
    name:'todos',
    initialState:{
        data:[],
        text:'',
        text2:'',
        bg2:'',
        idx:null,
        search:'',
        modal:false,
        bg:'',
        loading:false
    },
    reducers:{
        handlechange:(state,action) =>{
            state[action.payload.type] = action.payload.setType
        },
        handleModal:(state,action) =>{
          state.idx = action.payload.id
          state.modal = true
          state.text2 = action.payload.title
          state.bg2 = action.payload.bg
        },
      
    },
    extraReducers:(builder) => {
        builder.addCase(getData.pending,(state,action) =>{
            state.loading = true
        });
        builder.addCase(getData.fulfilled,(state,action) =>{
            state.data = action.payload
            state.text = ''
        });
        builder.addCase(getData.rejected,(state,action) =>{
            state.loading.false
        });
    }
  
})

export const {handlechange,handleModal} = todos.actions
export default todos.reducer