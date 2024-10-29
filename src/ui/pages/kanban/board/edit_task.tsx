import { useContext, useEffect, useState } from "react";
import { Task } from "../../../../domain/task"
import { UseCasesContext } from "../../../../context/useCases";

export const EditTask = (props: { task: Task, statusId: number, closeModal: () => void }) => {
    const [show, setShow] = useState(false)
    const [form, setForm] = useState({
        title: "",
        content: "",
    })

    useEffect(() => {
        setShow(true)
        setForm({
            title: props.task.getTitle(),
            content: props.task.getContent(),
        })
    }, [])

    let useCases = useContext(UseCasesContext)

    let editTask =  async () => {
        if (form. title != "" && form.content != "") {
            useCases?.kanbanItemUseCase.UpdateTask(props.statusId, props.task.getId(), form.title, form.content, () => {props.closeModal()}).then(()=>{
                setForm({
                    title: "",
                    content: "",
                })
            })
        }
    }

    return (<div className={show ? "offcanvas offcanvas-end kanban-update-item-sidebar show" : "offcanvas offcanvas-end kanban-update-item-sidebar"}>
        <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title">Редактировать таску</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" onClick={(e) => { e.preventDefault(); props.closeModal() }} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <form className="new-item-form not-draggable">
                <div className="mb-2">
                    <input className="form-control add-new-item" placeholder="Тайтл таски" required={true} value={form.title} onChange={(e) => {
                        e.preventDefault(); setForm({
                            ...form,
                            title: e.target.value
                        })
                    }} />
                </div>
                <div className="mb-4">
                    <textarea className="form-control add-new-item" rows={15} placeholder="Описание таски" value={form.content} required={true}
                        onChange={(e) => {
                            e.preventDefault(); setForm({
                                ...form,
                                content: e.target.value
                            })
                        }}
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="btn btn-primary  me-4 waves-effect waves-light" onClick={(e) => { e.preventDefault(); editTask() }}>Сохранить</button>
                    <button type="button" className="btn btn-label-secondary  cancel-add-item waves-effect waves-light" onClick={() => { props.closeModal() }}>Отменить</button>
                </div>
            </form>

        </div>
    </div>
    )
}