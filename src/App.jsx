import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import Switcher from './Component/Switcher';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { deletUser, getData,checkUser, handlechange, addUser ,handleModal,editUser} from './reducers/todos';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';





function App() {



   const data = useSelector((store) => store.todos.data)
   const text = useSelector((store) => store.todos.text)
   const text2 = useSelector((store) => store.todos.text2)
   const modal = useSelector((store) => store.todos.modal)
   const search = useSelector((store) => store.todos.search)
   const bg = useSelector((store) => store.todos.bg)
   const bg2 = useSelector((store) => store.todos.bg2)
   const idx = useSelector((store) => store.todos.idx)



  const dispatch = useDispatch()





  useEffect(() => {
    dispatch(getData())
  }, [dispatch,search])


  return (
    <>

      <div className="w-[75%] m-auto">
         
        <div className="flex items-center mt-[50px] justify-center gap-[10px]">
          <div className="">
            
          <input value={text} onChange={(e)=>dispatch(handlechange({type:"text", setType:e.target.value}))} className='border-[2px] px-[5px] py-[5px] rounded-[10px] border-[green] shadow-xl' type="text" placeholder='  Add user' />
          <input   value={bg} onChange={(e)=>dispatch(handlechange({type:"bg", setType:e.target.value}))} className='border-[1px] w-[100px] h-[35px] rounded-[10px] pt-[5px] px-[5px] py-[5px] border-[black]' type="color" />

          <button onClick={()=>dispatch(addUser())} className='border-[1px] px-[5px] py-[5px] border-[black]'>Add</button>
          </div>
          <input value={search} onChange={(e)=>dispatch(handlechange({type:"search", setType:e.target.value}))} className='border-[1px] border-[black] px-[5px] py-[5px]'placeholder='Search . . . ' />
        </div>

        {
          modal?
          <div className="">
           <input value={text2} onChange={(e)=>dispatch(handlechange({type:"text2", setType:e.target.value}))} className='border-[1px] px-[5px] py-[5px] border-[black]' type="text" />
          <input  value={bg2} onChange={(e)=>dispatch(handlechange({type:"bg2", setType:e.target.value}))} className='border-[1px] px-[5px] py-[5px] border-[black]' type="color" />
          <button onClick={()=>{
            dispatch(editUser({
              id:idx,
              title:text2,
              bg:bg2,
              complite:false
            },
            ))
            dispatch(handlechange({type:"modal",setType:false}))
          }} className='border-[1px] px-[5px] py-[5px] border-[black]'>Edit</button>
          </div>:null
        }


        <div className="flex gap-[30px] flex-wrap mt-[70px]">
          
        {
          data.map((e)=>{
            return(
              <div key={e.id} style={{background:e.bg}} className="w-[200px] shadow-2xl bg-[#D1D7E0] px-[20px] py-[20px] rounded-[20px]">
                  <h1 className='text-center text-[24px] font-[600]' style={{color:e.complite?"red":null}}>{e.title}</h1>
                  <div className="flex pt-[20px] justify-center gap-[20px] items-center">
                  <button onClick={()=>dispatch(deletUser(e.id))}><DeleteIcon/></button>
                  <button onClick={()=>dispatch(handleModal(e))}><EditIcon/></button>
                  <input className='w-[20px] h-[20px]' checked={e.complite} onClick={()=>dispatch(checkUser(e))} type="checkbox" />
                  </div>
              </div>
            )
          })
        }
        </div>




      </div>


    </>
  )
}

export default App



