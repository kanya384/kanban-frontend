import { useContext, useState } from "react"
import { UseCasesContext } from "../../../../context/useCases"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { FiledType, Form } from "../../../components/form"
import "../auth.css"
import { Logo } from "../components/logo"
import { Link } from "react-router-dom"

export const Register = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        name: "",
        email: "",
        pass: "",
    })
    
    let useCases = useContext(UseCasesContext)

    const login = useTypedSelector(({ login }) => {
        return login
    })

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let response = await useCases?.authUseCase.Registration(form.name, form.email, form.pass)

        if (response instanceof Error) {
            setError(response.message)
        } else {
            setSuccess(true)
        }
    }

    const updateForm = (name: string, value: any) => {
        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <div className="authentication-wrapper authentication-basic authentication-bg">
            <div className="authentication-inner row">
                <div className="authentication-inner py-4">
                    <div className="card">
                        {!success ? <div className="card-body">
                            <Logo />
                            <h3 className="mb-1 fw-bold">Регистрация</h3>
                            <p className="mb-4">Пожалуйста введите данные для регистрации</p>
                            {error ? <div className="alert alert-danger alert-dismissible" role="alert">
                                {error}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={(e)=>{e.preventDefault(); setError(null)}}></button>
                            </div>
                                : ""}
                            <Form
                                state={{
                                    loading: login?.loading,
                                    error: login?.error,
                                }}

                                submit={submit}

                                fields={[
                                    {
                                        name: "name",
                                        title: "Ваше Имя",
                                        placeholder: "Введите имя",
                                        type: FiledType.Text,
                                        value: form.name,
                                    },
                                    {
                                        name: "email",
                                        title: "Ваш email",
                                        placeholder: "Введите email",
                                        type: FiledType.Text,
                                        value: form.email,
                                    },
                                    {
                                        name: "pass",
                                        title: "Введите пароль",
                                        placeholder: "············",
                                        type: FiledType.Password,
                                        value: form.pass,
                                        param: true,
                                    },
                                ]}
                                submitBtnTitle={"Зарегистрироваться"}
                                updateForm={updateForm}
                            />

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                Уже зарегистрированы? <Link to="/login" style={{ color: "#7367f0", cursor: "pointer", marginLeft: "5px" }}> Войти</Link>
                            </div>
                        </div> : <div className="card-body">
                            <h3 className="mb-1 fw-bold">Все хорошо</h3>
                            <p className="mb-4">Регистрация прошла успешно! Теперь можно войти в систему</p>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Link to="/login" style={{ color: "#7367f0", cursor: "pointer", marginLeft: "5px" }}> Авторизация</Link>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div >
    )
}