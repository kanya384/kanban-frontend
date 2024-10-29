import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "tabler-icons-react"
import { UseCasesContext } from "../../../../context/useCases";
import { useContext, useEffect, useState } from "react";
import { Task } from "../../../../domain/task";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Target } from "./dnd/target";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

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
            useCases?.kanbanItemUseCase.CreateStatus(kanbanState?.kanban.getId(), form.title).then(()=>{
                setForm({title: ""})
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

    useEffect(()=>{
        if (idOfKanban != null) {
            useCases?.kanbanItemUseCase.ReadKanbanById(idOfKanban)
        }
    },[idOfKanban])

    return (
        <div className="layout-page" >
            <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
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
                                                onDrop={(item: {task: Task, statusId: number}) => {
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


                    {/* 
                    <div className="offcanvas offcanvas-end kanban-update-item-sidebar">
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title">Edit Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="nav nav-tabs tabs-line" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-update" aria-selected="true" role="tab">
                                        <i className="ti ti-edit me-2"></i>
                                        <span className="align-middle">Edit</span>
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab-activity" aria-selected="false" role="tab">
                                        <i className="ti ti-trending-up me-2"></i>
                                        <span className="align-middle">Activity</span>
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content px-0 pb-0">

                                <div className="tab-pane fade show active" id="tab-update" role="tabpanel">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="title">Title</label>
                                            <input type="text" id="title" className="form-control" placeholder="Enter Title" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="due-date">Due Date</label>
                                            <input type="text" id="due-date" className="form-control" placeholder="Enter Due Date" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="label"> Label</label>
                                            <select className="select2 select2-label form-select" id="label">
                                                <option value=""></option>
                                                <option data-color="bg-label-success" value="UX">UX</option>
                                                <option data-color="bg-label-warning" value="Images">Images</option>
                                                <option data-color="bg-label-info" value="Info">Info</option>
                                                <option data-color="bg-label-danger" value="Code Review">Code Review</option>
                                                <option data-color="bg-label-secondary" value="App">App</option>
                                                <option data-color="bg-label-primary" value="Charts &amp; Maps">Charts &amp; Maps</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Assigned</label>
                                            <div className="assigned d-flex flex-wrap"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="attachments">Attachments</label>
                                            <input type="file" className="form-control" id="attachments" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label">Comment</label>
                                            <div className="comment-editor border-bottom-0"></div>
                                            <div className="d-flex justify-content-end">
                                                <div className="comment-toolbar">
                                                    <span className="ql-formats me-0">
                                                        <button className="ql-bold"></button>
                                                        <button className="ql-italic"></button>
                                                        <button className="ql-underline"></button>
                                                        <button className="ql-link"></button>
                                                        <button className="ql-image"></button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap">
                                            <button type="button" className="btn btn-primary me-3 waves-effect waves-light" data-bs-dismiss="offcanvas">
                                                Update
                                            </button>
                                            <button type="button" className="btn btn-label-danger waves-effect" data-bs-dismiss="offcanvas">
                                                Delete
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="tab-pane fade" id="tab-activity" role="tabpanel">
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <span className="avatar-initial bg-label-success rounded-circle mt-1">HJ</span>
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0"><span className="fw-semibold">Jordan</span> Left the board.</p>
                                            <small className="text-muted">Today 11:00 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <img src="../../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle mt-1" />
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0">
                                                <span className="fw-semibold">Dianna</span> mentioned
                                                <span className="text-primary">@bruce</span> in a comment.
                                            </p>
                                            <small className="text-muted">Today 10:20 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <img src="../../assets/img/avatars/2.png" alt="Avatar" className="rounded-circle mt-1" />
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0">
                                                <span className="fw-semibold">Martian</span> added moved Charts &amp; Maps task to the done board.
                                            </p>
                                            <small className="text-muted">Today 10:00 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <img src="../../assets/img/avatars/1.png" alt="Avatar" className="rounded-circle mt-1" />
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0"><span className="fw-semibold">Barry</span> Commented on App review task.</p>
                                            <small className="text-muted">Today 8:32 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <span className="avatar-initial bg-label-secondary rounded-circle mt-1">BW</span>
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0"><span className="fw-semibold">Bruce</span> was assigned task of code review.</p>
                                            <small className="text-muted">Today 8:30 PM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <span className="avatar-initial bg-label-danger rounded-circle mt-1">CK</span>
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0">
                                                <span className="fw-semibold">Clark</span> assigned task UX Research to
                                                <span className="text-primary">@martian</span>
                                            </p>
                                            <small className="text-muted">Today 8:00 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <img src="../../assets/img/avatars/4.png" alt="Avatar" className="rounded-circle mt-1" />
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0">
                                                <span className="fw-semibold">Ray</span> Added moved
                                                <span className="fw-semibold">Forms &amp; Tables</span> task from in progress to done.
                                            </p>
                                            <small className="text-muted">Today 7:45 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <img src="../../assets/img/avatars/1.png" alt="Avatar" className="rounded-circle mt-1" />
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0">
                                                <span className="fw-semibold">Barry</span> Complete all the tasks assigned to him.
                                            </p>
                                            <small className="text-muted">Today 7:17 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <span className="avatar-initial bg-label-success rounded-circle mt-1">HJ</span>
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0"><span className="fw-semibold">Jordan</span> added task to update new images.</p>
                                            <small className="text-muted">Today 7:00 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <img src="../../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle mt-1" />
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0">
                                                <span className="fw-semibold">Dianna</span> moved task
                                                <span className="fw-semibold">FAQ UX</span> from in progress to done board.
                                            </p>
                                            <small className="text-muted">Today 7:00 AM</small>
                                        </div>
                                    </div>
                                    <div className="media mb-4 d-flex align-items-start">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <span className="avatar-initial bg-label-danger rounded-circle mt-1">CK</span>
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0">
                                                <span className="fw-semibold">Clark</span> added new board with name
                                                <span className="fw-semibold">Done</span>.
                                            </p>
                                            <small className="text-muted">Yesterday 3:00 PM</small>
                                        </div>
                                    </div>
                                    <div className="media d-flex align-items-center">
                                        <div className="avatar me-2 flex-shrink-0">
                                            <span className="avatar-initial bg-label-secondary rounded-circle mt-1">BW</span>
                                        </div>
                                        <div className="media-body">
                                            <p className="mb-0"><span className="fw-semibold">Bruce</span> added new task in progress board.</p>
                                            <small className="text-muted">Yesterday 12:00 PM</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </div>
    )
}