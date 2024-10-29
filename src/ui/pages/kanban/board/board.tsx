import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "tabler-icons-react"
import { UseCasesContext } from "../../../../context/useCases";
import { useContext, useEffect, useState } from "react";
import { Task } from "../../../../domain/task";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Target } from "./dnd/target";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { TaskModal } from "./task_modal";

export const Board = () => {
    const navigate = useNavigate();

    let { id } = useParams();

    const [idOfKanban, setIdOfKanban] = useState<null | number>(null)

    const [statusAddShow, setStatusAddShow] = useState(false)

    const [form, setForm] = useState({
        title: "",
    })

    const kanbanState = useTypedSelector(({ kanbanItem }) => {
        return kanbanItem
    })

    let useCases = useContext(UseCasesContext)

    const submit = async () => {
        if (form.title != "" && kanbanState?.kanban) {
            useCases?.kanbanItemUseCase.CreateStatus(kanbanState?.kanban.getId(), form.title).then(() => {
                setForm({ title: "" })
                setStatusAddShow(false)
            })
        }
    }

    useEffect(() => {
        if (id) {
            if (idOfKanban != parseInt(id)) {
                setIdOfKanban(parseInt(id))
            }
        }
    }, [id])

    useEffect(() => {
        if (idOfKanban != null) {
            useCases?.kanbanItemUseCase.ReadKanbanById(idOfKanban)
        }
    }, [idOfKanban])

    return (
        <div className="layout-page" >
            <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-sm-11 col-md-11">
                            <h4 className="fw-bold py-3"><ArrowLeft style={{ marginRight: "5px", cursor: "pointer" }} onClick={(e) => { e.preventDefault(); navigate(-1) }} /> <span className="text-muted fw-light">{kanbanState?.kanban?.getTitle()} /</span> Канбан-Доска</h4>
                            <DndProvider backend={HTML5Backend}>
                                <div className="app-kanban">
                                    <div className="kanban-wrapper">
                                        <div className="kanban-container">
                                            {
                                                kanbanState?.kanban?.getStatuses().map((status) => {
                                                    return <Target
                                                        status={status}
                                                        accept={["task"]}
                                                        onDrop={(item: { task: Task, statusId: number }) => {
                                                            useCases?.kanbanItemUseCase.ChangeTaskStatus(item.task.getId(), status.getId(), item.statusId)
                                                        }}
                                                    />
                                                })
                                            }

                                            <form className="kanban-add-new-board">
                                                {
                                                    !statusAddShow ? <label className="kanban-add-board-btn" htmlFor="kanban-add-board-input">
                                                        <Plus />
                                                        <span className="align-middle" onClick={(e) => { e.preventDefault(); setStatusAddShow(true) }}>Добавить статус</span>
                                                    </label> : <>
                                                        <input type="text" className="form-control w-px-250 kanban-add-board-input mb-2 mt-2" placeholder="Введите название статуса" id="kanban-add-board-input" required={true} value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }) }} />
                                                        <div className="mb-3 kanban-add-board-input">
                                                            <button className="btn btn-primary btn-sm me-2 waves-effect waves-light" onClick={(e) => { e.preventDefault(); submit() }}>Добавить</button>
                                                            <button type="button" className="btn btn-label-secondary btn-sm kanban-add-board-cancel-btn waves-effect" onClick={() => { setStatusAddShow(false) }}>Отменить</button>
                                                        </div>
                                                    </>
                                                }
                                            </form>
                                        </div>

                                    </div>

                                </div>
                            </DndProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}