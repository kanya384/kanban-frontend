import { useContext, useEffect, useRef, useState } from "react";
import { AccessibleOff, Ban, CircleLetterX, CircleNumber0, DotsVertical, FileSearch, Replace, UserCheck, UserExclamation, X } from 'tabler-icons-react'
import { UseCasesContext } from "../../../../context/useCases";
import { Link, useParams } from "react-router-dom";
import { Lead } from "../../../../domain/lead/lead";
import { User } from "../../../../domain/user/user";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { Packet } from "../../../../domain/packet/packet";

function useOutsideAlerter(ref: any, callBack: () => void) {
    useEffect(() => {

        function handleClickOutside(event: any) {
            if (ref?.current && !ref?.current.contains(event.target)) {
                callBack()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [ref]);
}

export const TableRowNew = (props: { lead: Lead, moderators: User[], managers: User[], packets: Packet[], statuses: { status: string, description: string }[], last: boolean }) => {
    const { id } = useParams()
    const [showMenu, setShowMenu] = useState(false)
    const [causesList, setCausesList] = useState<string[]>([])
    const rowRef = useRef<any>(null);
    let useCases = useContext(UseCasesContext)

    const formatDate = (day: Date) => {
        if (day.getFullYear() === 1) {
            return ""
        }
        const yyyy = day.getFullYear();
        let mm = (day.getMonth() + 1).toString(); // Months start at 0!
        let dd = day.getDate().toString();

        if (dd.length == 1) dd = '0' + dd;
        if (mm.length == 1) mm = '0' + mm;

        return dd + '.' + mm + '.' + yyyy.toString().substring(2);
    }

    const pickStatus = () => {
        let result = ""
        props.statuses.forEach((item) => {
            if (item.status == props.lead.Status()) {
                result = item.description
            }
        })

        switch (result) {
            case "Рассмотрен":
                return <span className="badge bg-label-warning">{result}</span>
            case "Замена на 0":
                return <span className="badge" style={{ backgroundColor: "#FFC0CB" }}>{result}</span>
            case "Отклонен (целевой)":
                return <span className="badge" style={{ backgroundColor: "#00FF00" }}>{result}</span>
            case "Аннулирован":
                return <span className="badge bg-label-secondary">{result}</span>
            default:
                return <span className="badge" style={{ color: "#5a5a5a" }}>{result}</span>
        }
        return result
    }

    const pickManager = () => {
        let result = props.lead.ManagerId().toString()
        props.managers.forEach((item) => {
            if (item.Id() == props.lead.ManagerId()) {
                result = item.Name() + " " + item.Surname()
            }
        })
        return result
    }

    const pickModerator = () => {
        if (props.lead.ModeratorId() === -1) {
            return "Октелл"
        }
        if (props.lead.ModeratorId() === 0) {
            return ""
        }
        let result = props.lead.ModeratorId().toString()
        props.moderators.forEach((item) => {
            if (item.Id() == props.lead.ModeratorId()) {
                result = item.Name() + " " + item.Surname()
            }
        })
        return result
    }

    const checkFlagForManagerExchangeOnNil = () => {
        let now = new Date()


        let limit = getLimitDate(props.lead.TransferDate())
        if (now <= limit) {
            return false
        }

        return true
    }


    const checkFlagForManagerAnnul = () => {
        let now = new Date()

        let limit = getLimitDate(props.lead.TransferDate())
        //аннулировать можно весь текущий месяц и до 5-го числа следующего месяца
        limit.setDate(7) // поменяли до 7го числа
        if (now <= limit) {
            return true
        }

        return false
    }

    const getLimitDate = (date: Date) => {
        let newDate = new Date(date)
        newDate = new Date(newDate.setMonth(newDate.getMonth() + 1))
        newDate.setDate(5)
        return newDate
    }

    const pickModeratorDecisionDescription = () => {
        switch (props.lead.Decision()) {
            case "approved":
                return "Одобрен"
            case "not_approved":
                return "Не одобрен"
            case "disputable":
                return "Спорный"
            default:
                return props.lead.Decision()
        }
    }

    useOutsideAlerter(rowRef, () => {

        setShowMenu(false)

    });

    const updateModerator = (moderatorId: number) => {
        if (moderatorId > 0) {
            useCases?.leadUseCase.SetModeratorForLead(props.lead.Id(), moderatorId)
        }
    }

    const updateClientReason = (cause: string) => {
        useCases?.leadUseCase.ClientCause(props.lead.Id(), cause)
    }

    const causes = useTypedSelector(({ cause }) => {
        return cause
    })

    const isAllowedToModerate = () => {
        if (useCases?.authUseCase.IsModerator() || useCases?.authUseCase.IsModeratorRealist()) {
            if (useCases.authUseCase.UserId() !== props.lead.ModeratorId()) {
                return false
            }
        }
        return true
    }

    useEffect(() => {
        let leadsPacketId = 0
        props.packets.forEach((packet) => {
            if (packet.Name() === props.lead.Packet()) {
                leadsPacketId = packet.Id()
            }
        })
        causes?.causes?.map((cause) => {
            if (cause.PacketIds().includes(leadsPacketId)) {
                setCausesList(cause.Items())
            }
        })
    }, [causes])



    return (
        <div className="css_tr" ref={rowRef} onMouseLeave={()=>{ console.log("leave"); setShowMenu(false)}}>
            <div className="css_sd" >
                <div className="dropdown"  onClick={() => { setShowMenu(!showMenu); }}  >
                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <DotsVertical />
                    </button>

                    {useCases?.authUseCase.IsModeratorRealist() && props.lead.ClientId() === 3425511 && props.lead.Status() === "moderated" && props.lead.Decision() === "not_approved" ?
                        <div className={showMenu ? "dropdown-menu show" : "dropdown-menu "} style={showMenu ? props.last ? { position: "absolute", inset: "auto auto 0px -20%", margin: "0px", transform: "translate3d(0px, -20.5px, 0px)" } : { position: "absolute", marginLeft: "-40%", } : { display: "none" }}>
                            <a className="dropdown-item d-flex" href="#" onClick={(e) => { e.preventDefault(); useCases?.leadUseCase.FinalizeModeration(props.lead.Id()); setShowMenu(false) }}><Replace className="me-1" size={20} /> Доработать</a>
                            {isAllowedToModerate() ? <Link className="dropdown-item d-flex" to={"/lead/moderate/" + props.lead.Id()}><FileSearch className="me-1" size={20} /> Модерация</Link> : <div className="dropdown-item d-flex" style={{ color: "red" }}><X className="me-1" size={20} /> Модерация</ div>}
                            <a className="dropdown-item d-flex" href="#" onClick={(e) => { e.preventDefault(); useCases?.leadUseCase.RejectLead(props.lead.Id()); setShowMenu(false) }}><AccessibleOff className="me-1" size={20} /> Отклонить</a>
                        </div>
                        : <div className={showMenu ? "dropdown-menu show" : "dropdown-menu "} style={showMenu ? props.last ? { position: "absolute", inset: "auto auto 0px -20%", margin: "0px", transform: "translate3d(0px, -20.5px, 0px)" } : { position: "absolute", marginLeft: "-40%", } : { display: "none" }}>
                            {isAllowedToModerate() ? <Link className="dropdown-item d-flex" to={"/lead/moderate/" + props.lead.Id()}><FileSearch className="me-1" size={20} /> Модерация</Link> : <div className="dropdown-item d-flex" style={{ color: "red" }}><X className="me-1" size={20} /> Модерация</ div>}
                            {props.lead.Status() == "moderated" && (!useCases?.authUseCase.IsModerator() && (useCases?.authUseCase.IsAdminUser() || useCases?.authUseCase.IsManager())) ? <a className="dropdown-item d-flex" href="#" onClick={(e) => { e.preventDefault(); useCases?.leadUseCase.FinalizeModeration(props.lead.Id()); setShowMenu(false) }}><Replace className="me-1" size={20} /> Доработать</a> : <></>}
                            {props.lead.Status() == "moderated" && !useCases?.authUseCase.IsModerator() ? <a className="dropdown-item d-flex" href="#" onClick={(e) => { e.preventDefault(); useCases?.leadUseCase.RejectLead(props.lead.Id()); setShowMenu(false) }}><AccessibleOff className="me-1" size={20} /> Отклонить</a> : <></>}
                            {props.lead.Status() == "moderated" && (!useCases?.authUseCase.IsModerator() && (useCases?.authUseCase.IsAdminUser() || checkFlagForManagerExchangeOnNil())) ? <a className="dropdown-item d-flex" href="#" onClick={(e) => { e.preventDefault(); useCases?.leadUseCase.ExchangeOnZero(props.lead.Id()); setShowMenu(false) }}><CircleNumber0 className="me-1" size={20} /> Заменить на 0</a> : <></>}
                            {props.lead.Status() == "moderated" && (!useCases?.authUseCase.IsModerator() && (useCases?.authUseCase.IsAdminUser() || checkFlagForManagerAnnul())) ? <a className="dropdown-item d-flex" href="#" onClick={(e) => { e.preventDefault(); useCases?.leadUseCase.AnnulLead(props.lead.Id()); setShowMenu(false) }}><CircleLetterX className="me-1" size={20} /> Аннулировать</a> : <></>}
                        </div>}
                </div>
            </div>
            <div className="css_sd css_sd_nowrap">{props.lead.ClientName()}</div>
            <div className="css_td css_sd_nowrap">
                <a target="_blank" href={"https://novostroykigoroda.amocrm.ru/leads/detail/" + props.lead.Id()} >{props.lead.Id()}</a>
            </div>
            <div className="css_td css_sd_nowrap">{pickStatus()}</div>
            {!useCases?.authUseCase.IsModerator() ? <div className="css_td css_sd_nowrap">{formatDate(props.lead.TransferDate())}</div> : <></>}
            <div className="css_td css_sd_nowrap">{props.lead.Packet()}</div>
            {!useCases?.authUseCase.IsModerator() ? <div className="css_td css_sd_nowrap">{props.lead.Price()}</div> : <></>}
            <div className="css_td css_sd_nowrap">{pickModeratorDecisionDescription()}</div>
            <div className="css_td">
                {!useCases?.authUseCase.IsModerator() ? <select className="form-select" value={props.lead.ClientReason()} onChange={(e) => { updateClientReason(e.target.value) }} style={{ width: "300px" }}>
                    <option value={""}>отказ КЦ</option>
                    {causesList.map((cause) => {
                        return <option value={cause}>{cause}</option>
                    })}
                </select> : props.lead.ClientReason()}
            </div>
            <div className="css_td css_sd_nowrap">{pickManager()}</div>
            <div className="css_td css_sd_nowrap">{formatDate(props.lead.ModerateAddDate())}</div>
            <div className="css_td">
                <select value={props.lead.ModeratorId()} onChange={(e)=>{updateModerator(parseInt(e.target.value))}} className="form-select" style={{ width: "300px" }}>
                    {props.lead.ModeratorId()==-1?<option value={-1}>Октелл</option>:<option value={0}></option>}
                    {props.moderators.map((moderator) => {
                        return <option value={moderator.Id()}>{moderator.Name()+" "+moderator.Surname()}</option>
                    })}
                </select>
            </div>
            <div className="css_td css_sd_nowrap">{props.lead.CityName()}</div>
            <div className="css_td css_sd_nowrap">{formatDate(props.lead.ModeratedAt())}</div>
            <div className="css_td css_sd_nowrap">{props.lead.Cause()}</div>
            <div style={{ minWidth: "880px" }} className="css_td">{props.lead.Comment()}</div>
            <div className="css_td css_sd_nowrap">{formatDate(props.lead.ActionDate())}</div>
            <div className="css_td css_sd_nowrap">{props.lead.ClientLeadsGrowth() ? "Да" : "Нет"}</div>
            <div className="css_td css_sd_nowrap">{props.lead.ProcessedToAmo() === "processed" ? "Да" : "Нет"}</div>
        </div>
    )
}
