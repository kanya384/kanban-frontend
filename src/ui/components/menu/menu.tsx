import { Items } from "./items"
import { MenuLink } from "./menu-link"
import { CircleDot, Circle, Car, Cards } from 'tabler-icons-react';
import { useContext, useEffect, useState } from "react";
import { UseCasesContext } from "../../../context/useCases";
import jwt from 'jwt-decode';
import { LogOut } from "react-feather";

export const Menu = () => {
    const [closed, setClosed] = useState(false)

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


    useEffect(() => {
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
                {
                    Items.map((item, index) => {

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
                    })
                }
                <div className="ps__rail-x" style={{ left: "0px", bottom: "-524px" }}>
                    <div className="ps__thumb-x" tabIndex={0} style={{ left: "0px", width: "0px" }}></div>
                </div><div className="ps__rail-y" style={{ top: "524px", height: "521px", right: "4px" }}>
                    <div className="ps__thumb-y" tabIndex={0} style={{ top: "191px", height: "190px" }}></div>
                </div>
            </ul>
        </aside>
    )
}
