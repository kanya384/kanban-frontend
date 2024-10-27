import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UseCasesContext } from "../../../../context/useCases"
import { Menu } from "../../../components/menu"
import { FiledType, Form } from "../../../components/form"
import { Decision, DecisionDescription } from "../../../../domain/lead/leadEnums"

export const Cause = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const moderateRef = useRef<HTMLInputElement>(null)
    const selectRef = useRef<HTMLSelectElement>(null)
    const [causeList, setCauseList] = useState<{title: string;value: string;}[]>([])

    let useCases = useContext(UseCasesContext)
    const [form, setForm] = useState<{
        cause: string,
    }>({
        cause: "",
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (id) {
            useCases?.leadUseCase.ClientCause(parseInt(id!), form.cause, () => { navigate(-1) })
        }
    }

    const readLeadById = async (id: UniqueId) => {
        let response = await useCases?.leadUseCase.ReadLeadById(parseInt(id))
        if (response instanceof Error) {

        } else {
            setForm({
                cause: response?.Cause()!,
            })
        }
    }

    const getDecisionOptions = async () => {
        let response = await useCases?.causeUseCase.ReadCauseForLead(parseInt(id!))
        if (response instanceof Error) {
        } else {
            let causeList: {title: string, value: string}[] =[]
            response!.Items().forEach((item)=>{
                causeList.push({title: item, value: item})
            })
            setCauseList([...causeList])
        }
    }

    useEffect(() => {
        if (id) {
            readLeadById(id)
            getDecisionOptions()
        }
    }, [id])

    const updateForm = (name: string, value: any) => {
        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <div className="layout-page" >
            <Menu />
            <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row mx-1">
                        <div className="col-sm-12 col-md-12">
                            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Модерация /</span> Решение по модерации</h4>
                        </div>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Решение по модерации</h5>
                            </div>
                            <div className="card-body">
                                <Form
                                    state={{
                                        loading: false,
                                        error: "",
                                    }}

                                    submit={submit}

                                    fields={[
                                        {
                                            name: "cause",
                                            title: "Причина клиента",
                                            placeholder: "Выберите причину клиента из списка",
                                            value: form.cause,
                                            type: FiledType.Select,
                                            options: causeList,
                                        },
                                    ]}
                                    btnSmall={true}
                                    submitBtnTitle={"Сохранить"}
                                    updateForm={updateForm}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
