import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import Switcher from './Component/Switcher';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './reducers/counter'
import { addUser, deletUser, setText, checkUser, handleChange, editTodo, editUser } from './reducers/todos';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {

  const count = useSelector((store) => store.counter.value);
  const data = useSelector((store) => store.todos.data);
  const text = useSelector((store) => store.todos.text);
  const modal = useSelector((store) => store.todos.modal);
  const text2 = useSelector((store) => store.todos.text2);
  const idx = useSelector((store) => store.todos.idx);
  const fil = useSelector((store) => store.todos.fil);
  const search = useSelector((store) => store.todos.search);


  console.log(count);




  const dispatch = useDispatch()








  return (
    <>


      <div className="w-[50%] m-auto">

        <div className="flex gap-[40px] mt-[30px] justify-center">
          <div className="flex items-center gap-[5px]">
            <input value={text}  onChange={(e) =>dispatch(handleChange({type:"text", setType:e.target.value}))}  className='border-[1px] rounded-[5px] px-[10px] py-[5px] border-[grey]' type="text" placeholder='Add User' />
           
            <Button onClick={() => dispatch(addUser())} variant="contained">Add</Button>

          </div>

          <input className='border-[1px] border-[black] px-[10px] rounded-[5px]' type="search" value={search} onChange={(e) => dispatch(handleChange({ type: "search", setType: e.target.value }))} placeholder='serach . . .' />

          <select className='border-[1px] border-[black] px-[10px] rounded-[5px]' value={fil} onChange={(e) => dispatch(handleChange({ type: "fil", setType: e.target.value }))}>
            <option value="All">All</option>
            <option value="Complete">Complete</option>
            <option value="Uncomplete">Uncomplete</option>
          </select>

        </div>

        {
        modal ?
          <div className="flex w-[350px] bg-[#cfd3d4] ml-[40px] mt-[30px] rounded-[10px] px-[30px] py-[15px] items-center gap-[5px]">
            <input className='border-[1px] border-[black] rounded-[5px] px-[10px] py-[7px]' type="text" value={text2} onChange={(e) => dispatch(handleChange({ type: "text2", setType: e.target.value }))} />
            <Button onClick={() => dispatch(editTodo())} variant="contained">Confirm</Button>
          </div> : null
      }

        <div className="flex flex-wrap gap-[84px]">
          {
            data.filter((e) => {
              if (fil == 'Complete') {
                return e.complete == true
              }
              else if (fil == 'Uncomplete') {
                return e.complete == false
              }
              else {
                return e
              }
            }).filter((el) => {
              return el.title.toLowerCase().includes(search.toLowerCase())
            }).map((e) => {
              return (

                <div className="">

                  <div className="w-[200px] px-[20px] py-[20px] mt-[30px] bg-[#efefef] rounded-[20px] shadow-xl">
                    <h1 style={{ color: e.complete ? "red" : null }} className='text-[22px] text-center py-[10px]'>{e.title}</h1>
                    <div className="flex justify-center gap-[10px] items-center">
                      <DeleteIcon color='error'  onClick={() => dispatch(deletUser(e.id))}/>
                      <EditIcon color='success' onClick={() => dispatch((editUser(e)))}/>
                      <input onClick={() => dispatch(checkUser(e.id))} className='w-[30px] h-[15px] mt-[5px]' type="checkbox" checked={e.complete} />

                    </div>
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








// <select
// className="bg-[white] border-none text-[black] h-[30px] w-[55px] font-[600] rounded-[2px]"
// value={lng}
// onChange={(e) => {
//   changeLanguage(e.target.value);
//   setLng(e.target.value);
// }}
// >
// <option value={"en"}>En</option>
// <option value={"ru"}>Ru</option>
// </select>




// const [, setLng] = useState('en')
// const {t, i18n} = useTranslation();

// const changeLanguage = (language) => {
// console.log(language)   ;
// i18n.changeLanguage(language);
// }
