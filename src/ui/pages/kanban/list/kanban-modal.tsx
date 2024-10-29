import { useContext, useState } from "react"
import { FiledType, Form } from "../../../components/form"
import { UseCasesContext } from "../../../../context/useCases"

export const KanbanModal = (props: {closeCallback: () => void}) => {
    const [form, setForm] = useState({
        title: "",
    })

    let useCases = useContext(UseCasesContext)

    const submit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await useCases?.kanbanUseCase.CreateKanban(form.title)
        props.closeCallback();
    }

    const updateForm = (name: string, value: any) => {
        setForm({
            ...form,
            [name]: value,
        })
    }

    return (<div className="modal fade show" style={{ display: "block" }} >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalCenterTitle">Создание Канбан-Доски</h5>
                    <button type="button" onClick= {(e)=>{e.preventDefault(); props.closeCallback();}}className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Form
                        state={{
                            loading: false,
                            error: "",
                        }}

                        submit={submit}

                        fields={[
                            {
                                name: "title",
                                title: "Название",
                                placeholder: "Введите название",
                                type: FiledType.Text,
                                value: form.title,
                            },
                        ]}
                        submitBtnTitle={"Создать"}
                        updateForm={updateForm}
                    />
                </div>
            </div>
        </div>
    </div>
    )
}