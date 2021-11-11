import "./Todo.scss"


function Todo ({ id, task, isCompleted, Delete, Checked, lang }){

    
    return(
        <>
            <li className="list__item" >
                <input className = 'check' type="checkbox" data-id = {id} onChange = {Checked} checked = { isCompleted} name="" id="" />{task} <button className="item__btn" data-id = {id} onClick = {Delete}>{lang}</button></li>
           
        </>
    )
}

export default Todo;