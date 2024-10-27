import { Fragment, useContext, useEffect, useState } from "react"
import { UseCasesContext } from "../../../../context/useCases"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { useParams, useSearchParams } from "react-router-dom"
import { Menu } from "../../../components/menu"
import Paginator from "../../../components/paginator/paginator"
import Select from "react-select";
import { User } from "../../../../domain/user/user"
import { Packet } from "../../../../domain/packet/packet"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Settings } from "tabler-icons-react"
import { TableRowNew } from "./tableRowNew"

export const LeadList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let { id } = useParams();
    const [page, setPage] = useState(0)
    const [countOnPage, setCountOnPage] = useState(50)
    const [cityOptions, setCityOptions] = useState<{ value: number, label: string }[]>([])
    const [managers, setManagers] = useState<User[]>([])
    const [moderators, setModerators] = useState<User[]>([])

    const [clientsOptions, setClientsOptions] = useState<{ value: number, label: string }[]>([])
    const [statuses, setStatuses] = useState<{ status: string, description: string }[]>([])
    const [packetList, setPacketList] = useState<Packet[]>([])

    const [scrollInterval, setScrollInterval] = useState<NodeJS.Timer | null>()
    const [sorting, setSorting] = useState<string>("")

    const [form, setForm] = useState<{
        clientId: number,
        managerId: number,
        status: string,
        cityId: number,
        packet: string,
        transferDateFrom: Date,
        transferDateTo: Date,
        offset: number,
        limit: number,
    }>()

    let useCases = useContext(UseCasesContext)

    const leads = useTypedSelector(({ lead }) => {
        return lead
    })

    const readLeads = () => {
        if (form) {
            useCases?.leadUseCase.ReadLeads(form.clientId, form.managerId, form.status, form.cityId, form.packet, form.transferDateFrom, form.transferDateTo, form.offset, form.limit, sorting)
        }
    }

    const getSoritngForUser: () => string = () => {
        let sorting = ""
        if (useCases?.authUseCase.IsModerator()) {
            sorting = "moderate_add_date:-"
        } else {
            sorting = "status:-"
        }
        return sorting
    }

    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (form) {
            setForm({
                ...form,
                [e.target.name]: new Date(e.target.value)
            })
        }
    }

    const formatDateForInput = (day: Date) => {
        const yyyy = day.getFullYear();
        let mm = (day.getMonth() + 1).toString(); // Months start at 0!
        let dd = day.getDate().toString();

        if (dd.length == 1) dd = '0' + dd;
        if (mm.length == 1) mm = '0' + mm;

        return yyyy + "-" + mm + '-' + dd;
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
        if (form) {
            setSearchParams(params => {
                params.set("clientId", form.clientId.toString());
                params.set("managerId", form.managerId.toString());
                params.set("status", form.status);
                params.set("cityId", form.cityId.toString());
                params.set("packet", form.packet.toString());
                params.set("transferDateFrom", formatDate(form.transferDateFrom));
                params.set("transferDateTo", formatDate(form.transferDateTo));
                params.set("offset", form.offset.toString());
                params.set("limit", form.limit.toString());
                return params;
            })
            readLeads()
        }
    }, [form])

    useEffect(() => {
        if (form) {
            setForm({
                ...form,
                offset: 0,
                limit: countOnPage!,
            })
        }
    }, [countOnPage])

    useEffect(() => {
        if (form) {
            setForm({
                ...form,
                offset: page * countOnPage,
            })
        }
    }, [page])

    useEffect(() => {
        if (window.location.search.length > 0) {
            console.log('parse')
            let client = 0
            if (searchParams.get("clientId") !== null) {
                client = parseInt(searchParams.get("clientId")!)
            }

            let managerId = 0
            if (searchParams.get("managerId") !== null) {
                managerId = parseInt(searchParams.get("managerId")!)
            }

            let status = ""
            if (searchParams.get("status") !== null) {
                status = searchParams.get("status")!
            }

            let cityId = 0
            if (searchParams.get("cityId") !== null) {
                cityId = parseInt(searchParams.get("cityId")!)
            }

            let packet = ""
            if (searchParams.get("packet") !== null) {
                packet = searchParams.get("packet")!
            }

            let transferDateFrom = new Date();
            transferDateFrom.setDate(transferDateFrom.getDate() - 30);

            if (searchParams.get("transferDateFrom") !== null) {
                transferDateFrom = stringToDate(searchParams.get("transferDateFrom")!)
            }

            let transferDateTo = new Date();
            transferDateTo.setDate(transferDateTo.getDate() + 1);

            if (searchParams.get("transferDateTo") !== null) {
                transferDateTo = stringToDate(searchParams.get("transferDateTo")!)
            }

            let limit = 0
            if (searchParams.get("limit") !== null) {
                limit = parseInt(searchParams.get("limit")!)
            }

            let offset = 0
            if (searchParams.get("offset") !== null) {
                offset = parseInt(searchParams.get("offset")!)
            }

            setForm(
                {
                    clientId: client,
                    managerId: managerId,
                    status: status,
                    cityId: cityId,
                    packet: packet,
                    transferDateFrom: transferDateFrom,
                    transferDateTo: transferDateTo,
                    offset: offset,
                    limit: limit,
                }
            )

        } else {
            if (useCases?.authUseCase.IsModerator()) {
                setForm({
                    clientId: 0,
                    managerId: 0,
                    status: "",
                    cityId: 0,
                    packet: "",
                    transferDateFrom: new Date('01 Jan 1970 00:00:00 GMT'),
                    transferDateTo: new Date(),
                    offset: 0,
                    limit: 50,
                })
                return
            }
            let start = new Date()
            start.setDate(start.getDate() - 1)
            setForm(
                {
                    clientId: 0,
                    managerId: 0,
                    status: "",
                    cityId: 0,
                    packet: "",
                    transferDateFrom: start,
                    transferDateTo: new Date(),
                    offset: 0,
                    limit: 50,
                }
            )
        }
    }, [])

    const stringToDate = (input: string) => {
        let items = input.split('.')
        if (items.length != 3) {
            return new Date()
        }
        return new Date(parseInt(items[2]), parseInt(items[1]) - 1, parseInt(items[0]), 0, 0, 0, 0)
    }

    const getCityList = async () => {
        let response = await useCases?.leadUseCase.ReadCityList()
        if (response instanceof Error) {

        } else {
            let options: { value: number, label: string }[] = [{ value: 0, label: "Не указан" }]
            response!.forEach((city) => {
                options.push({ value: city.Id(), label: city.Name() })
            })
            setCityOptions(options)
        }
    }

    const getClientList = async () => {
        let response = await useCases?.leadUseCase.ReadClientList()
        if (response instanceof Error) {

        } else {
            let options: { value: number, label: string }[] = [{ value: 0, label: "Не указан" }]
            response!.forEach((city) => {
                options.push({ value: city.Id(), label: city.Name() })
            })
            setClientsOptions(options)
        }
    }

    const getManager = async () => {
        let response = await useCases?.leadUseCase.ReadManagersList()
        if (response instanceof Error) {

        } else {
            setManagers(response!)
        }
    }

    const getModerators = async () => {
        let response = await useCases?.leadUseCase.ReadModeratorsList()
        if (response instanceof Error) {

        } else {
            setModerators(response!)
        }
    }

    const getStatuses = async () => {
        let response = await useCases?.leadUseCase.ReadLeadStatusList()
        if (response instanceof Error) {

        } else {
            setStatuses(response!)
        }
    }

    const getPackets = async () => {
        let response = await useCases?.leadUseCase.ReadPacketList()
        if (response instanceof Error) {

        } else {
            setPacketList(response!)
        }
    }

    const getCauses = async () => {
        await useCases?.causeUseCase.ReadCauses()
    }

    useEffect(() => {
        getManager()
        getCityList()
        getStatuses()
        getPackets()
        getClientList()
        getModerators()
        setSorting(getSoritngForUser())
        getCauses()

    }, [])



    const getCityName: () => { value: number, label: string } = () => {
        let result: { value: number, label: string } = { value: 0, label: "" }
        if (cityOptions) {

            cityOptions.forEach((val) => {
                if (val.value == form?.cityId) {
                    result = val
                }
            })
        }
        return result
    }

    const getClientName: () => { value: number, label: string } = () => {
        let result: { value: number, label: string } = { value: 0, label: "" }
        if (clientsOptions) {

            clientsOptions.forEach((val) => {
                if (val.value == form?.clientId) {
                    result = val
                }
            })
        }
        return result
    }

    const inputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (form) {
            setForm({
                ...form,
                [e.target.name]: (e.target.type === "number" || e.target.name === "managerId") ? parseInt(e.target.value) : e.target.value
            })
        }

        return
    }

    const scrollDirection = (direction: string) => {
        switch (direction) {
            case "left":
                let timerIdLeft = setInterval(() => {
                    if (document.querySelector('.table_scroll')! && document.querySelector('.table_scroll')!.scrollLeft > 0) {
                        document.querySelector('.table_scroll')!.scroll(document.querySelector('.table_scroll')!.scrollLeft - 25, document.querySelector('.table_scroll')!.scrollTop)
                    }
                }, 20);
                setScrollInterval(timerIdLeft)
                break
            case "right":
                let timerIdRight = setInterval(() => {
                    if (document.querySelector('.table_scroll')!) {
                        document.querySelector('.table_scroll')!.scroll(document.querySelector('.table_scroll')!.scrollLeft + 25, document.querySelector('.table_scroll')!.scrollTop)
                    }
                }, 20);
                setScrollInterval(timerIdRight)
                break
        }
    }

    const clearScroll = () => {
        if (scrollInterval) {
            clearInterval(scrollInterval!)
        }
    }

    const getSortingValueForParam: (paramName: string) => string = (paramName: string) => {
        let soritngItem = "desc"
        let items = sorting.split(";")

        items.forEach((item) => {
            let param = item.split(':')
            if (param[0] === paramName) {
                if (param[1] == "+") {
                    soritngItem = "asc"
                }
            }
        })

        return soritngItem
    }

    const setSortingValueForParam: (paramName: string, newVal: string) => void = (paramName: string, newVal: string) => {
        let items = sorting.split(";")
        let newItems: string[] = []
        let exists = false

        newItems.push(paramName + ":" + (newVal === "desc" ? "-" : "+"))

        items.forEach((item) => {
            let param = item.split(':')
            if (param[0] !== paramName) {
                newItems.push(item)
            }
        })

        setSorting(newItems.join(';'))
    }

    useEffect(() => {
        if (sorting !== "") {
            readLeads()
        }
    }, [sorting])

    useEffect(() => {
        if (useCases?.authUseCase.IsManager()) {
            switch (form?.status) {
                case "moderating":
                    setSortingValueForParam("moderate_add_date", "desc")
                    break
                case "moderated":
                    setSortingValueForParam("moderated_at", "desc")
                    break
                default:
                    setSortingValueForParam("action_date", "asc")
                    break


            }
        }
    }, [form?.status])

    const setSortingValue = (param: string) => {
        if (getSortingValueForParam(param) === "asc") {
            setSortingValueForParam(param, "desc")
        } else {
            setSortingValueForParam(param, "asc")
        }
    }

    return (
        <div className="layout-page" >
            <Menu />
            {cityOptions.length !== 0 ? <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row mx-1">
                        <div className="col-sm-12 col-md-4">
                            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Список лидов /</span> Лиды на модерации</h4>
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <div className="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center flex-wrap me-1">
                                <div className="dt-buttons py-3 mb-4">
                                    <button onClick={async () => {
                                        if (form) {
                                            let file = await useCases?.leadUseCase.ExportLeads(form.clientId, form.managerId, form.status, form.cityId, form.packet, form.transferDateFrom, form.transferDateTo, sorting)
                                            if (file instanceof Error) {

                                            } else {

                                                var link = document.createElement('a');
                                                link.href = process.env.REACT_APP_BACKEND_URL + "/api/files/" + file;
                                                link.target = "_blank"
                                                //link.download = "result.xlsx";
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        }

                                    }} className="dt-button add-new btn btn-primary mb-3 mb-md-0" ><span>Выгрузить</span></button>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-4" style={{zIndex: 800}}>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-cityname">Город</label>
                                        <Select options={cityOptions} placeholder={"Выберите город"} defaultValue={getCityName()} onChange={(newValue): void => {
                                            let id: number
                                            cityOptions.forEach((val: any) => {
                                                if (val == newValue) {
                                                    id = val["value"]
                                                }
                                            })
                                            try {
                                                if (form) {
                                                    setForm({
                                                        ...form,
                                                        cityId: id!
                                                    })
                                                }
                                            } catch (e) { }
                                        }} name="cityId" id="multicol-cityname" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-email">Ответственный менеджер</label>
                                        <div className="position-relative">
                                            <select id="multicol-country" className="select2 form-select select2-hidden-accessible" tabIndex={-1} name="managerId" onChange={inputChange} value={form?.managerId}>
                                                <option selected value={0}>Выберите менеджера</option>
                                                {managers.map((manager) => {
                                                    return <option value={manager.Id()} data-select2-id="2">{manager.Name() + " " + manager.Surname()}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3">
                                    {!useCases?.authUseCase.IsModerator() ? <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-email">Статус лида</label>
                                        <div className="position-relative">
                                            <select id="multicol-country" className="select2 form-select select2-hidden-accessible" tabIndex={-1} name="status" onChange={inputChange} value={form?.status}>
                                                <option selected value={""}>Выберите статус</option>
                                                {statuses.map((status) => {
                                                    return <option value={status.status} data-select2-id="2">{status.description}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div> : <></>}
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-email">Пакет</label>
                                        <div className="position-relative">
                                            <select id="multicol-country" className="select2 form-select select2-hidden-accessible" tabIndex={-1} name="packet" onChange={inputChange} value={form?.packet}>
                                                <option selected value={""}>Выберите пакет</option>
                                                {packetList.map((packet) => {
                                                    return <option value={packet.Name()} data-select2-id="2">{packet.Name()}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {!useCases?.authUseCase.IsModerator() ? <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Дата передачи от:</label>
                                        <input type="date" value={form?.transferDateFrom ? formatDateForInput(form?.transferDateFrom!) : undefined} name="transferDateFrom" onChange={dateChange} className="form-control dt-input dt-full-name" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Дата передачи до:</label>
                                        <input type="date" value={form?.transferDateTo ? formatDateForInput(form?.transferDateTo!) : undefined} name="transferDateTo" onChange={dateChange} className="form-control dt-input dt-full-name" />
                                    </div>
                                </div> : <></>}
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-cityname">Клиент</label>
                                        <Select options={clientsOptions} placeholder={"Выберите клиента"} defaultValue={getClientName()} onChange={(newValue): void => {
                                            let id: number
                                            clientsOptions.forEach((val: any) => {
                                                if (val == newValue) {
                                                    id = val["value"]
                                                }
                                            })
                                            try {
                                                if (form) {
                                                    setForm({
                                                        ...form,
                                                        clientId: id!
                                                    })
                                                }
                                            } catch (e) { }
                                        }} name="cityId" id="multicol-cityname" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                            <Paginator allCount={leads?.count!} page={page} setPage={(page: number) => setPage(page)} countOnPage={countOnPage} setCountOnPage={(count: number) => setCountOnPage(count)} />
                        </div>

                            <div className="table_scroll_main">
                                <div className="table_scroll_str table_scroll_str_l" onMouseEnter={() => { scrollDirection("left") }} onMouseLeave={() => { clearScroll() }}>
                                    <img src="/img/str_l.svg" />
                                </div>
                                <div className="table_scroll_str table_scroll_str_r" onMouseEnter={() => { scrollDirection("right") }} onMouseLeave={() => { clearScroll() }}>
                                    <img src="/img/str_r.svg" />
                                </div>
                                <div className="table_scroll table">
                                    <div className="css_table">
                                        <div className="css_thead">
                                            <div className="css_tr">
                                                <div style={{ textAlign: "center" }} className="css_th css_th_center">
                                                    <Settings />
                                                </div>
                                                <div className="css_th">КЛИЕНТ</div>
                                                <div className="css_th">ЛИД</div>
                                                <div className="css_th">СТАТУС <br />ЛИДА</div>
                                                {!useCases?.authUseCase.IsModerator() ?<TableHeaderWithSortingNew title={"Дата<br />передачи"} param="transfer_date" active={getSortingValueForParam("transfer_date") === "asc"} setSortingValue={setSortingValue} />:<></>}
                                                <div className="css_th">ПАКЕТ</div>
                                                {!useCases?.authUseCase.IsModerator() ? <div className="css_th">ЦЕНА<br />ЛИДА</div>: <></>}
                                                <div className="css_th">РЕШЕНИЕ<br />МОДЕРАТОРА</div>
                                                <div className="css_th">ПРИЧИНА<br />КЛИЕНТА</div>
                                                <div className="css_th">МЕНЕДЖЕР</div>
                                                <TableHeaderWithSortingNew title={"Дата доб-ия<br /> менеджером"} param="moderate_add_date" active={getSortingValueForParam("moderate_add_date") === "asc"} setSortingValue={setSortingValue} />
                                                <div className="css_th">МОДЕРАТОР</div>
                                                <div className="css_th">ГОРОД</div>
                                                <TableHeaderWithSortingNew title={"Дата рассм-ия<br /> модератором"} param="moderated_at" active={getSortingValueForParam("moderated_at") === "asc"} setSortingValue={setSortingValue} />
                                                <div className="css_th">ПРИЧИНА<br />ПРИНЯТИЯ</div>
                                                <div className="css_th">КОММЕНТ-ИЙ<br />МОДЕРАТОРА</div>
                                                <TableHeaderWithSortingNew title={"Дата <br /> действия"} param="action_date" active={getSortingValueForParam("action_date") === "asc"} setSortingValue={setSortingValue} />
                                                <div className="css_th">КО-ВО ЛИДОВ<br />КЛИЕНТА УВ-НО</div>
                                                <div className="css_th">ИЗМЕНЕНО<br />В AMOCRM</div>
                                            </div>
                                        </div>
                                        <div className="css_tbody">
                                            {
                                                leads?.leads && leads.leads.map((lead, index) => {
                                                    return <TableRowNew lead={lead} managers={managers} packets={packetList} moderators={moderators} statuses={statuses} last={(leads?.leads!.length - 1 == index) && index != 0 ? true : false} />
                                                })
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                        <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginTop: 15 }}>
                            <Paginator allCount={leads?.count!} page={page} setPage={(page: number) => setPage(page)} countOnPage={countOnPage} setCountOnPage={(count: number) => setCountOnPage(count)} />
                        </div>

                    </div>
                </div>
            </div> : <>loading</>}

        </div>

    )

}

const TableHeaderWithSorting = ({ title, param, setSortingValue, active }: { title: string, param: string, setSortingValue: (input: string) => void, active: boolean }) => {
    return <th style={{ cursor: "pointer", display: "flex", alignItems: "center", width: "100%" }} onClick={() => { setSortingValue(param) }}>{title.indexOf("<br />") !== -1 ? <Fragment>{title.split("<br />")[0]}<br /> {title.split("<br />")[1]}</Fragment> : title} <div style={{ display: "flex", flexDirection: "column", marginLeft: 5 }}><ChevronUp size={15} color={active ? "black" : "grey"} /> <ChevronDown size={15} color={!active ? "black" : "grey"} /></div></th>
}

const TableHeaderWithSortingNew = ({ title, param, setSortingValue, active }: { title: string, param: string, setSortingValue: (input: string) => void, active: boolean }) => {
    return <div className="css_th">
    <div className="css_th_str">
        {title.indexOf("<br />") !== -1?<Fragment>{title.split("<br />")[0]}<br />{title.split("<br />")[1]}</Fragment>:title}
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "5px" }} onClick={() => { setSortingValue(param) }}>
    <ChevronUp size={15} color={active ? "black" : "grey"} /> <ChevronDown size={15} color={!active ? "black" : "grey"} />
    </div>
    </div>
</div>
  
    
}