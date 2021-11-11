import './Header.scss'
import {useEffect, useState, useRef} from 'react';
import Todo from '../Todo/Todo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' 



function Header(){
   let langu ={
        uz:{
            submit: 'Topshirish',
            title: 'Vazifalar',
            delete: 'O\'chirish',
            guide:'Qo\'llanma',
            text:'Ushbu veb-saytda siz kundalik faoliyatingizni yana ham osonroq rejalashtirishingiz mumkin. Bu erda ba\'zi ko\'rsatmalar mavjud: kiritishga rejalashtirayotgan faoliyatingizni kiriting, faollik ro\'yxatida "O\'chirish" tugmasini bosish orqali faoliyatni o\'chirishingiz mumkin, nihoyat, agar bajargan bo\'lsangiz, rejangizni belgilash katagiga bosing.'
        },
        eng:{
            submit:'Submit',
            title:'Todos',
            delete:'Delete',
            guide :'Guidelines',
            text:'In this Website you can plan your daily activities in more easy way. Here ere some  instructions:enter activity you are planning into the input, on acticity list you can delete activity by clicking \'delete\' button. Finally, if you have done, your plan you click checkbox.'
        },
        ru:{
            submit:'Разместить',
            title :'Планы',
            delete: 'Удалять',
            guide:'Руководящие указания',
            text:'На этом веб-сайте вы можете упростить планирование своей повседневной деятельности. Вот несколько инструкций: введите действие, которое вы планируете, в поле ввода, в списке действий вы можете удалить действие, нажав кнопку «Удалить», наконец, если вы сделали, ваш план вы отметите флажком.'
        }
    }



    const [todo, setTodo] = useState(JSON.parse(window.localStorage.getItem('todos')) || [])
    const [input, setInput] = useState('');
    const [lang , setLang] = useState('uz');
    const value = useRef();
    const modal = useRef()
    // console.log(window.localStorage.getItem('todos'))
    function handle(e){
        e.preventDefault();
        setInput(value.current.value);
     
        value.current.value = null;
        
    }

    useEffect(()=>{
        if(input !== ''){
            console.log('smth')
            let newObj = {
                id : new Date().getTime(),
                task : input,
                isCompleted : false
            }
            setTodo([newObj, ...todo])
            window.localStorage.setItem('todos', JSON.stringify(todo))
        } 
    },[input] )
    
    // console.log(input)
  
    
    function Delete(e){
        let id = Number(e.target.dataset.id );
        let filtered =todo.filter(t=>t.id !==id)
        setTodo(filtered);
    }
    function Checked(e){
        let id = Number(e.target.dataset.id);
        let found = todo.find(e=> e.id ===id)
        found.isCompleted = !found.isCompleted
        setTodo([...todo]);
        console.log(todo)
        window.localStorage.setItem('todos', JSON.stringify(todo))
         
    }
    
    
    
    window.localStorage.setItem('todos',JSON.stringify(todo))
    
    return(
        <div className = 'wrapper'>
            <span className="about" onClick={()=>{
                console.log(modal.current.classList.add('active'))
            }}><FontAwesomeIcon className='bookopen' icon='book-open'/>{langu[lang].guide}</span>
            <select className='lang' onChange = {(e)=>setLang(e.target.value) } name="lang">
                <option value="uz">Uz</option>
                <option value="eng">Eng</option>
                <option value="ru">Ru</option>
            </select>
            <h1 className="title">{langu[lang].title}</h1>
        <header className="header">
        <form action="" className="form"onSubmit = {handle} >
        <input type="text" ref={value} className="header__input"/>
        <button className="header__submit" style = {{marginLeft : 10}}>{langu[lang].submit}</button>
        </form>
        <div ref={modal} className="modal">
            
           <div className="modal__wrapper">
           <button className= 'modal__btn' onClick = {()=>{ modal.current.classList.remove('active')}}>X</button>
           <h2 className='modal__header'>{langu[lang].guide}</h2>
            <p className="modal__text">
            {langu[lang].text}
            </p>
           </div>
        </div>


        <ul className="header__list">
        {
            todo.map((t)=><Todo
            key = {t.id.toString()}
            id = {t.id}
            task = {t.task}
            Delete = {Delete}
            Checked = {Checked}
            isCompleted = {t.isCompleted}
            lang = {langu[lang].delete}
            />
            )
        }
        </ul>
        </header>
        </div>
        )
        
    }
    
    
    export default Header;