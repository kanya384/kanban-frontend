import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { UseCasesContext } from "../../../context/useCases";
import { Circle } from 'tabler-icons-react';

interface MenuLinkInterface {
    title: string;
    icon: JSX.Element;
    href?: string;
    subItems?: {
        title: string,
        href: string,
    }[],
}

export const MenuLink = (prop: MenuLinkInterface) => {
    const location = useLocation()
    const [opened, setOpened] = useState(false)
    let { id } = useParams();
    let useCases = useContext(UseCasesContext)
    const exit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        //useCases?.authUseCase.LogOut()
    }

    const getCurrentMonth = (): number => {
        const d = new Date();
        return d.getMonth()+1;
    }

   

    useEffect(()=>{
        if (prop.href) {
            if (location.pathname.indexOf(prop.href.replace(":id", "")) !== -1 && prop.href !== "/") {
                setOpened(true)
            }
        } else if (prop.subItems) {
            let open = false
            prop.subItems.forEach((item)=>{
                if ((location.pathname.indexOf(item.href.replace(":id", "")) !== -1 && item.href !== "/")) {
                    open = true
                }
            })
            setOpened(open)
        }
    }, [location.pathname])

    if (prop.href === "/exit") {
        return <li className={location.pathname == prop.href ? "menu-item active" : "menu-item"} onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem("refresh_token"); useCases?.authUseCase.CheckAuthorization()}}>
            <a className={"menu-link"} onClick={exit}>
                {prop.icon}
                <div data-i18n="Dashboards">{prop.title}</div>
            </a>
        </li>
    }

    return (
        prop.href ? <li className={opened ? "menu-item active" : "menu-item"}>
            <Link className={"menu-link"} to={id ? prop.href.replace(":id", id) : prop.href.replace(":month", getCurrentMonth().toString())}>
                {prop.icon}
                <div data-i18n="Dashboards">{prop.title}</div>
            </Link>
        </li> : <li className={opened ? "menu-item active open" : "menu-item"} onClick={()=>{setOpened(!opened)}}>
            <a onClick={(e)=>{e.preventDefault()}} className={"menu-link toggle"}>
                {prop.icon}
                <div data-i18n="Dashboards">{prop.title}</div>
            </a>
            <ul className="menu-sub">
                {prop.subItems?.map((item) => {
                    return <li className={(location.pathname.indexOf(item.href.replace(":id", "")) !== -1 && item.href !== "/") ? "menu-item active" : "menu-item"}>
                        <Link to={id ? item.href.replace(":id", id) : item.href.replace(":month", getCurrentMonth().toString())} className="menu-link">
                            <Circle size={10} className="me-2" />
                            <div data-i18n="List">{item.title}</div>
                        </Link>
                    </li>
                })}

            </ul>
        </li>

    )
}
