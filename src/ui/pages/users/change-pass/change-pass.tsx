import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UseCasesContext } from "../../../../context/useCases"
import { FiledType, Form } from "../../../components/form"
import { Menu } from "../../../components/menu"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"

export const ChangePass = () => {
    const navigate = useNavigate();

    let { id } = useParams();

    /*let useCases = useContext(UseCasesContext)
    const [form, setForm] = useState<{
        pass: string,
    }>({
        pass: "",
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.pass !== "" && id) {
            useCases?.userUseCase.ChangePassword(id!, form.pass!, () => { navigate(-1) })
        }
    }

    const updateForm = (name: string, value: any) => {
        setForm({
            ...form,
            [name]: value,
        })
    }

   

    const formatDate = (day: Date) => {
        const yyyy = day.getFullYear();
        let mm = (day.getMonth() + 1).toString(); // Months start at 0!
        let dd = day.getDate().toString();

        if (dd.length == 1) dd = '0' + dd;
        if (mm.length == 1) mm = '0' + mm;

        return dd + '.' + mm + '.' + yyyy;
    }

    return (
        <div className="layout-page" >
            <Menu />
            <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row mx-1">
                        <div className="col-sm-12 col-md-12">
                            <h4 className="fw-bold py-3 mb-4">Смена пароля пользователя</h4>
                        </div>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Изменение пароля</h5>
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
                                            name: "pass",
                                            title: "Новый пароль",
                                            placeholder: "Укажите пароль",
                                            value: form.pass,
                                            type: FiledType.Text,
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
    )*/
}
