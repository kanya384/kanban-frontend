import { useContext, useState } from "react";
import { DotsVertical } from "tabler-icons-react";
import { Task } from "../../../../domain/task";
import { UseCasesContext } from "../../../../context/useCases";

export const TaskComponent = (props: { task: Task, statusId: number }) => {
    const [showMenu, setShowMenu] = useState(false)
    let useCases =  useContext(UseCasesContext)

    return <div className="kanban-item"  onMouseLeave={()=>{setShowMenu(false)}}>
        <div className="d-flex justify-content-between flex-wrap align-items-center mb-2">
            <div className="dropdown kanban-tasks-item-dropdown mt-4">
                <DotsVertical onClick={(e)=>{e.preventDefault(); setShowMenu(!showMenu)}} />
                <div className={showMenu?"dropdown-menu dropdown-menu-end show":"dropdown-menu dropdown-menu-end"}>
                    <a className="dropdown-item" href="javascript:void(0)">Скопировать ссылку</a>
                    <a className="dropdown-item">Создать копию</a>
                    <a className="dropdown-item delete-task" onClick={() => {useCases?.kanbanItemUseCase.DeleteTask(props.task.getId(), props.statusId)}}>Удалить</a>
                </div>
            </div>
        </div>
        <h6 className="kanban-title">{props.task.getTitle()}</h6>
        <span className="kanban-text" >{props.task.getContent()}</span>

        <div className="d-flex justify-content-end align-items-center flex-wrap mt-2">
            <div className="item-badges">
                <div className="badge bg-secondary"> {props.task.getAssignee()? props.task.getAssignee()?.getName(): "не распределена"}</div>
            </div>
        </div>
    </div>
}