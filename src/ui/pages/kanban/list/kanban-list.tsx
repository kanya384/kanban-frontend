import { useContext, useEffect, useState } from "react"
import { UseCasesContext } from "../../../../context/useCases"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { KanbanModal } from "./kanban-modal"
import { Link } from "react-router-dom"

export const KanbanList = () => {

    const [show, setShow] = useState(false)

    let useCases = useContext(UseCasesContext)

    const kanbans = useTypedSelector(({ kanban }) => {
        return kanban
    })


    useEffect(() => {
        useCases?.kanbanUseCase.ReadUsersKanbans()
    }, [])

    return (
        <div className="layout-page" >
            <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row mx-1">
                        <div className="col-sm-12 col-md-4">
                            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Список /</span> Канбан-Доска</h4>
                        </div>

                        <div className="col-sm-12 col-md-8">
                            <div className="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center flex-wrap me-1">
                                <div className="dt-buttons py-3 mb-4">
                                    <button onClick={(e)=>{e.preventDefault(); setShow(true)}} className="dt-button add-new btn btn-primary mb-3 mb-md-0" ><span>Добавить Канбан</span></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-12">
                            <div className="accordion mt-3" id="accordionExample">
                                {kanbans?.kanbans?.map((kanban) => <div className="card" style={{padding: 10}}>
                                    <Link to={"/kanban/"+kanban.getId()} className="accordion-header" id="headingOne">
                                        <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="false" aria-controls="accordionOne">
                                            {kanban.getTitle()}
                                        </button>
                                    </Link>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {show? <KanbanModal closeCallback={() => {setShow(false)}} />:<></>}
        </div>
    )

}