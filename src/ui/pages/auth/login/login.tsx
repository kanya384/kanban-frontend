import { useContext, useState } from "react"
import { UseCasesContext } from "../../../../context/useCases"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { FiledType, Form } from "../../../components/form"
import "../auth.css"
import { Logo } from "../components/logo"
import { Link } from "react-router-dom"

export const Login = () => {
    const [form, setForm] = useState({
        login: "",
        pass: "",
    })
    let useCases = useContext(UseCasesContext)

    const login = useTypedSelector(({ login }) => {
        return login
    })

    const submitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        useCases?.authUseCase.SignIn(form.login, form.pass)
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
                        <div className="card-body">
                            <Logo />
                            <h3 className="mb-1 fw-bold">Добро пожаловать! 👋</h3>
                            <p className="mb-4">Пожалуйста авторизуйтесь чтобы продолжить</p>
                            {login?.error ? <div className="alert alert-danger alert-dismissible" role="alert">
                                {login?.error}
                            </div>
                                : ""}
                            <Form
                                state={{
                                    loading: login?.loading,
                                    error: login?.error,
                                }}

                                submit={submitSignIn}

                                fields={[
                                    {
                                        name: "login",
                                        title: "Email",
                                        placeholder: "Введите email",
                                        type: FiledType.Text,
                                        value: form.login,
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
                                submitBtnTitle={"Войти"}
                                updateForm={updateForm}
                            />

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Link to="/register" style={{ color: "#7367f0", cursor: "pointer" }}>Зарегистрироваться</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}