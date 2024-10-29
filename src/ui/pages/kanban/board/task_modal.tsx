import { Task } from "../../../../domain/task"

export const TaskModal = (props: { task: Task, closeModal: () => void, editClick: () => void }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="modal fade show" tabIndex={-1} style={{ display: "block", paddingLeft: "0px" }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel4">{props.task.getTitle()}</h5>
                            <button type="button" onClick={(e) => { e.preventDefault(); props.closeModal() }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{paddingTop: 5}}>
                            <div className="d-flex justify-content-end align-items-center flex-wrap mb-4">
                                <div className="item-badges">
                                    <div className="badge bg-secondary"> {props.task.getAssignee() ? props.task.getAssignee()?.getName() : "не распределена"}</div>
                                </div>
                            </div>
                            <div className="row">
                                <p>{props.task.getContent()}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary waves-effect waves-light" onClick={(e)=>{e.preventDefault(); props.editClick(); props.closeModal()}}>Редактировать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}