import { Items } from "./items"
import { MenuLink } from "./menu-link"
import { CircleDot, Circle, Car, Cards } from 'tabler-icons-react';
import { useContext, useEffect, useState } from "react";
import { UseCasesContext } from "../../../context/useCases";
import jwt from 'jwt-decode';
import { LogOut } from "react-feather";

export const Menu = () => {
    const [closed, setClosed] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    let useCases = useContext(UseCasesContext)

    const collapseClick = () => {
        setClosed(!closed)
        if (!closed) {
            document.querySelector('html')?.classList.remove('layout-menu-collapsed')
        } else {
            document.querySelector('html')?.classList.add('layout-menu-collapsed')
        }
    }

    const menuHover = () => {
        document.querySelector('html')?.classList.add('layout-menu-hover')
    }

    const checkAdm = async () => {
        let result = await useCases?.authUseCase.IsAdminUser()
        if (result) {
            setIsAdmin(true)
        }
    }


    useEffect(() => {
        checkAdm()
    }, [])
    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme" onMouseEnter={() => { document.querySelector('html')?.classList.add('layout-menu-hover'); }} onMouseLeave={() => { document.querySelector('html')?.classList.remove('layout-menu-hover') }} style={{ touchAction: "none", zIndex: 1000, userSelect: "none" }}>

            <div className="app-brand demo">
                <a href="index.html" className="app-brand-link">
                    <div style={{ width: "60%" }}>
                        <img src="/img/logo.png" style={{ width: "100%" }} />
                    </div>
                </a>

                {!closed ? <CircleDot onClick={collapseClick} className="layout-menu-toggle menu-link text-large ms-auto" size={30} /> : <Circle onClick={collapseClick} className="layout-menu-toggle menu-link text-large ms-auto" size={20} />}
            </div>

            <ul className="menu-inner py-1 ps ps--active-y">

                {useCases?.authUseCase.UserId() == -99 ? <><MenuLink {...{
                    title: "Загрузка лида/файла авто",
                    isAdmin: false,
                    icon: <Car size={24} className="menu-icon" />,
                    href: "/amocar",
                }} />
                <MenuLink {...{
                    title: "Загрузка лида/файла авто xlsx",
                    isAdmin: true,
                    icon: <Cards size={24} className="menu-icon"  />,
                    href: "/car-excel",
                }} />
                    <MenuLink {...{
                        title: "Выход",
                        icon: <LogOut size={24} className="menu-icon" />,
                        href: "/exit",
                    }} />
                </> : Items.map((item, index) => {

                    if ((item.href === "/amofile" && useCases?.authUseCase.IsManager()) || ((useCases?.authUseCase.UserId() == 80 || useCases?.authUseCase.UserId() == 797) && (item.href === "/amocar" || item.href === "/car-excel"))) {

                    } else {
                        if (!isAdmin && item.isAdmin) {
                            return
                        }
                    }

                    if (index === 0) {
                        return <>
                            <MenuLink {...item} />
                            <div style={{ marginBottom: "10px" }}></div>
                        </>
                    }

                    if (index === (Items.length - 1)) {
                        return <>
                            <div style={{ height: "100%" }}></div>
                            <MenuLink {...item} />
                            <div style={{ marginBottom: "20px" }}></div>
                        </>
                    }
                    return <MenuLink {...item} />
                })}
                <div className="ps__rail-x" style={{ left: "0px", bottom: "-524px" }}>
                    <div className="ps__thumb-x" tabIndex={0} style={{ left: "0px", width: "0px" }}></div>
                </div><div className="ps__rail-y" style={{ top: "524px", height: "521px", right: "4px" }}>
                    <div className="ps__thumb-y" tabIndex={0} style={{ top: "191px", height: "190px" }}></div>
                </div>
            </ul>
        </aside>
    )
}
