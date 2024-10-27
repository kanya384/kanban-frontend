import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UseCasesContext } from "../../../../context/useCases"
import { FiledType, Form } from "../../../components/form"
import { Menu } from "../../../components/menu"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"

export const UserAdd = () => {
    const navigate = useNavigate();
    const [managerList, setManager] = useState<{ title: string, value: number }[]>([])
    let { id } = useParams();
    const userRoles = [
        {
            title: "Администратор",
            value: "admin",
        },
        {
            title: "Менеджер",
            value: "manager",
        },
        {
            title: "Модератор",
            value: "moderator",
        },
        {
            title: "Модератор реалиста",
            value: "moderator_realist",
        },
    ]

    /*let useCases = useContext(UseCasesContext)
    const [form, setForm] = useState<{
        id: number,
        name: string,
        surname: string,
        login: string,
        pass: string,
        role: string,
        enabled: boolean,
        deputy: number[],
    }>({
        id: 0,
        name: "",
        surname: "",
        login: "",
        pass: "",
        role: "",
        enabled: false,
        deputy: [],
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.name !== "" && form.login !== "" && form.pass !== "" && form.role.length !== 0) {
            if (id) {
                useCases?.userUseCase.UpdateUser(id!, form.name!, form.surname, form.login!, form.role!, form.enabled!, form.deputy!, () => { navigate(-1) })
            } else {
                useCases?.userUseCase.CreateUser(form.id!, form.name!, form.surname, form.login!, form.pass!, form.role!, form.enabled!, form.deputy!, () => { navigate(-1) })
            }
        }
    }

    const updateForm = (name: string, value: any) => {
        setForm({
            ...form,
            [name]: value,
        })
    }

    const readUserById = async (id: UniqueId) => {
        let response = await useCases?.userUseCase.ReadUserById(id)
        if (response instanceof Error) {

        } else {
            setForm({
                id: response?.Id()!,
                name: response?.Name()!,
                surname: response?.Surname()!,
                login: response?.Login()!,
                pass: response?.Pass()!,
                role: response?.Role()!,
                enabled: response?.Enabled()!,
                deputy: response?.Deputy()!,
            })
        }
    }

    const formatDate = (day: Date) => {
        const yyyy = day.getFullYear();
        let mm = (day.getMonth() + 1).toString(); // Months start at 0!
        let dd = day.getDate().toString();

        if (dd.length == 1) dd = '0' + dd;
        if (mm.length == 1) mm = '0' + mm;

        return dd + '.' + mm + '.' + yyyy;
    }

    useEffect(() => {
        if (id) {
            readUserById(id)
        }
    }, [id])

    const users = useTypedSelector(({ user }) => {
        return user
    })

    const getManagersOptions = async () => {
        let managersList: { title: string, value: number }[] = []
        users?.users?.map((user) => {
            if (user.Role() === "manager" && user.Id().toString() !== id!) {
                managersList.push({ title: user.Name() + " " + user.Surname(), value: user.Id() })
            }
        })
        setManager([...managersList])
    }

    const updateFields = [
        {
            name: "name",
            title: "Имя",
            placeholder: "Укажите имя",
            value: form.name,
            type: FiledType.Text,
        },
        {
            name: "surname",
            title: "Фамилия",
            placeholder: "Укажите фамилию",
            value: form.surname,
            type: FiledType.Text,
        },
        {
            name: "login",
            title: "Логин",
            placeholder: "Укажите логин",
            value: form.login,
            type: FiledType.Text,
        },
        {
            name: "role",
            title: "Роль пользователя",
            placeholder: "Выберите роль пользователя",
            value: form.role,
            type: FiledType.Select,
            options: userRoles,
        },
        {
            name: "enabled",
            title: "Активность",
            placeholder: "Выберите активный пользователь или нет",
            value: form.enabled,
            type: FiledType.Select,
            options: [
                {
                    title: "Да",
                    value: true
                },
                {
                    title: "Нет",
                    value: false
                }
            ],
        },
        {
            name: "deputy",
            title: "Замещает менеджера",
            placeholder: "Выберите кого замещает менеджер",
            value: form.deputy,
            type: FiledType.MultiSelectInt,
            options: managerList,
        },
    ]

    useEffect(() => {
        useCases?.userUseCase.ReadUsers()
       
    }, [])

    useEffect(()=>{
        getManagersOptions()
    },[users?.users])

    return (
        <div className="layout-page" >
            <Menu />
            <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row mx-1">
                        <div className="col-sm-12 col-md-12">
                            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Пользователь /</span> {id ? "Редактировать пользователя" : "Добавить пользователя"}</h4>
                        </div>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{id ? "Редактирование пользователя" : "Добавление пользователя"}</h5>
                            </div>
                            <div className="card-body">
                                <Form
                                    state={{
                                        loading: false,
                                        error: "",
                                    }}

                                    submit={submit}

                                    fields={id ? updateFields : [
                                        {
                                            name: "id",
                                            title: "ID пользователя на портале",
                                            placeholder: "Укажите id пользователя на портале",
                                            value: form.id,
                                            type: FiledType.Number,
                                        },
                                        {
                                            name: "name",
                                            title: "Имя",
                                            placeholder: "Укажите имя",
                                            value: form.name,
                                            type: FiledType.Text,
                                        },
                                        {
                                            name: "surname",
                                            title: "Фамилия",
                                            placeholder: "Укажите фамилию",
                                            value: form.surname,
                                            type: FiledType.Text,
                                        },
                                        {
                                            name: "login",
                                            title: "Логин",
                                            placeholder: "Укажите логин",
                                            value: form.login,
                                            type: FiledType.Text,
                                        },
                                        {
                                            name: "pass",
                                            title: "Пароль",
                                            placeholder: "Укажите пароль",
                                            value: form.pass,
                                            type: FiledType.Text,
                                        },
                                        {
                                            name: "role",
                                            title: "Роль пользователя",
                                            placeholder: "Выберите роль пользователя",
                                            value: form.role,
                                            type: FiledType.Select,
                                            options: userRoles,
                                        },
                                        {
                                            name: "enabled",
                                            title: "Активность",
                                            placeholder: "Выберите активный пользователь или нет",
                                            value: form.enabled,
                                            type: FiledType.Select,
                                            options: [
                                                {
                                                    title: "Да",
                                                    value: true
                                                },
                                                {
                                                    title: "Нет",
                                                    value: false
                                                }
                                            ],
                                        },
                                        {
                                            name: "deputy",
                                            title: "Замещает менеджера",
                                            placeholder: "Выберите кого замещает менеджер",
                                            value: form.deputy,
                                            type: FiledType.MultiSelectInt,
                                            options: managerList,
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
