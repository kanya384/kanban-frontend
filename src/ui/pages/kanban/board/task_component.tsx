import { useContext, useState } from "react";
import { DotsVertical, Edit, Trash } from "tabler-icons-react";
import { Task } from "../../../../domain/task";
import { UseCasesContext } from "../../../../context/useCases";
import { TaskModal } from "./task_modal";
import { EditTask } from "./edit_task";

export const TaskComponent = (props: { task: Task, statusId: number }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [task, setTask] = useState<Task | null>(null)
    const [editTask, setEditTask] = useState<Task | null>(null)
    let useCases =  useContext(UseCasesContext)

    return <><div className="kanban-item"  onMouseLeave={()=>{setShowMenu(false)}}>
        <div className="d-flex justify-content-between flex-wrap align-items-center mb-2">
            <div className="dropdown kanban-tasks-item-dropdown mt-4">
                <DotsVertical onClick={(e)=>{e.preventDefault(); setShowMenu(!showMenu)}} />
                <div className={showMenu?"dropdown-menu dropdown-menu-end show":"dropdown-menu dropdown-menu-end"}>
                    <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setEditTask(props.task); setShowMenu(false)}}><Edit size={16} /> Редактировать</a>
                    <a className="dropdown-item delete-task" onClick={() => {useCases?.kanbanItemUseCase.DeleteTask(props.task.getId(), props.statusId)}}><Trash size={16} /> Удалить</a>
                </div>
            </div>
        </div>
        <div onClick={()=>{setTask(props.task)}}>
            <h6 className="kanban-title">{props.task.getTitle()}</h6>
            <span className="kanban-text" >{props.task.getContent()}</span>
        </div>

        <div className="d-flex justify-content-end align-items-center flex-wrap mt-2">
            <div className="item-badges">
                <div className="badge bg-secondary"> {props.task.getAssignee()? props.task.getAssignee()?.getName(): "не распределена"}</div>
            </div>
        </div>
    </div>
    {task? <TaskModal task={task} closeModal={()=>{setTask(null)}} editClick={()=>{setEditTask(props.task); setShowMenu(false)}} />:<></>}
    {editTask?<EditTask task={editTask} statusId={props.statusId} closeModal={()=>{setEditTask(null)}} />:<></>}
    </>
}