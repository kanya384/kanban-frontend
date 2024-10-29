import { Fragment, useContext, useState } from "react"
import { Box } from "./dnd/box"
import { Status } from "../../../../domain/status"
import { DotsVertical, Edit, Trash } from "tabler-icons-react"
import { UseCasesContext } from "../../../../context/useCases"

export const StatusComponent = (props: { status: Status }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [addTaskForm, setShowAddTaskForm] = useState(false)
    const [form, setForm] = useState({
        title: "",
        content: "",
    })
    
    let useCases =  useContext(UseCasesContext)
    
    let addTask =  async () => {
        if (form. title != "" && form.content != "") {
            useCases?.kanbanItemUseCase.CreateTask(props.status.getId(), form.title, form.content, () => {setShowMenu(false)}).then(()=>{
                setForm({
                    title: "",
                    content: "",
                })
                setShowAddTaskForm(false)
            })
        }
    }

    return <Fragment>
        <header className="kanban-board-header" style={{paddingRight: "3px", paddingLeft: "3px"}} onMouseLeave={() => { setShowMenu(false) }}>
            <div className="kanban-title-board" >{props.status.getTitle()}</div>
            <div className="dropdown">
                <DotsVertical style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); setShowMenu(!showMenu) }} />
                <div className={showMenu ? "dropdown-menu dropdown-menu-end show" : "dropdown-menu dropdown-menu-end"} aria-labelledby="board-dropdown">
                    <a className="dropdown-item" href="#" > <Edit size={16} /> <span className="align-middle">Редактировать</span></a>
                    <a className="dropdown-item delete-board" href="#" onClick={(e)=>{e.preventDefault(); useCases?.kanbanItemUseCase.DeleteStatus(props.status.getId())}}><Trash size={16} /> <span className="align-middle">Удалить</span></a>
                </div>
            </div>
        </header>
        <main className="kanban-drag" style={{minHeight: "100vh"}}>
            {props.status.getTasks().map((task) => {
                return <Box task={task} statusId={props.status.getId()} />
            })}
            {!addTaskForm ?
                <button className={"kanban-title-button btn"} onClick={()=>{setShowAddTaskForm(true)}}>+ Добавить новую таску</button> :
                <form className="new-item-form not-draggable">
                    <div className="mb-2"><input className="form-control add-new-item" placeholder="Тайтл таски" required={true} value={form.title} onChange={(e)=>{e.preventDefault(); setForm({
                        ...form,
                        title: e.target.value
                    })}} /></div>
                    <div className="mb-4"><textarea className="form-control add-new-item" rows={2} placeholder="Описание таски" value={form.content} required={true}
                    onChange={(e)=>{e.preventDefault(); setForm({
                        ...form,
                        content: e.target.value
                    })}}
                    ></textarea></div>
                    <div className="mb-4"><button type="submit"
                        className="btn btn-primary btn-sm me-4 waves-effect waves-light" onClick={(e)=>{e.preventDefault(); addTask()}}>Добавить</button><button type="button"
                            className="btn btn-label-secondary btn-sm cancel-add-item waves-effect waves-light" onClick={()=>{setShowAddTaskForm(false)}}>Отменить</button>
                    </div>
                </form>
            }
            
        </main>
        <footer></footer>
    </ Fragment>
}