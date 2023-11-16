import { createSlice } from "@reduxjs/toolkit";


const todos = createSlice({
    name:'todos',
    initialState:{
        data:[
            {
                id:1,
                title:"Redux",
                complete:false
            },
            {
                id:2,
                title:"Redux2",
                complete:false
            },
            {
                id:3,
                title:"Redux3",
                complete:false
            },
            {
                id:4,
                title:"Redux4",
                complete:false
            },
            {
                id:5,
                title:"Redux5",
                complete:false
            }
        ],
        text:'',
        modal:false,
        text2:'',
        idx:null,
        fil:'All',
        search:''

    },
    reducers:{

        setText: (state,action) => {
            state.text = action.payload
        },

        deletUser: (state, action) =>{
            state.data = state.data.filter((e)=>{
                return e.id != action.payload
            })
        },
        addUser:(state,action) =>{
            let newObj = {
                id:Date.now(),
                title:state.text,
                complete:false
            }
            state.data.push(newObj)
            state.text = ''
        },
        checkUser:(state,action) =>{
            state.data = state.data.map((e)=>{
                if(action.payload == e.id){
                    e.complete= !e.complete
                }
                return e
            })
        },  



        handleChange :(state, action) =>{
            state[action.payload.type] = action.payload.setType 
        },

        // handleChange:(state,action) =>{
        //     state[action.payload.type] = action.payload.setType
        // },
        editUser:(state,action) =>{
            state.idx = action.payload.id
            state.text2 = action.payload.title
            state.modal = true
        },

        editTodo:(state,action) =>{
            state.data = state.data.map((e)=>{
                console.log(state.idx);
                if(e.id == state.idx){
                    e.title = state.text2
                }
                return e
            })
            console.log(state.data);
            state.modal = false
        }

        
    }

})

export const {deletUser,setText,checkUser,handleChange,addUser,editTodo,editUser} = todos.actions;

export default todos.reducer