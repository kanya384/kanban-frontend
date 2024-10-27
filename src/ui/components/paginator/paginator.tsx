import React, { useState } from "react"
import { ChevronsLeft, ChevronsRight } from "tabler-icons-react"

export const Paginator = ({ allCount, page, setPage, countOnPage, setCountOnPage }: { allCount: number, page: number, setPage: (page: number) => void, countOnPage: number, setCountOnPage: (count: number) => void, }) => {
    const [dropdownShow, setDropDownShow] = useState(false)
    
    const pagesToGenerate: ()=> number[] = () => {
        let allPagesCount = Math.ceil(allCount / countOnPage)

        let pagesToGenerate = [page + 1]

        let tmpPage = page + 1
        let tmpAdded = 0
        while (true) {
            tmpPage--
            if (tmpPage > 0 && tmpAdded < 2) {
                pagesToGenerate.push(tmpPage)
                tmpAdded++
            } else {
                break
            }
        }

        tmpPage = page + 1
        tmpAdded = 0
        while (true) {
            tmpPage++
            if (tmpPage <= allPagesCount && tmpAdded < 2) {
                pagesToGenerate.push(tmpPage)
                tmpAdded++
            } else {
                break
            }
        }

        
        pagesToGenerate = pagesToGenerate.sort(function(a, b) {
            return a - b;
        })
        return pagesToGenerate
    }
    
    return (
        <React.Fragment>
            <div style={{ display: "flex" }}>
                <nav aria-label="Page navigation" >
                    <ul className="pagination" >
                        {page>0?<li className="page-item prev" >
                            <a className="page-link waves-effect" href="#" onClick={(e)=>{e.preventDefault();  if (page > 0) {setPage(page-1)}}}><ChevronsLeft size={18} /></a >
                        </li>:<></>}

                        {pagesToGenerate().map((item)=>{
                            return <li className={item==(page+1)?"page-item active":"page-item"} >
                            <a className="page-link waves-effect" href="#" onClick={(e)=>{e.preventDefault(); setPage(item-1);}}>{item}</a>
                        </li>
                        })}
                       
                        {allCount > (page+1) * countOnPage?<li className="page-item next" >
                            <a className="page-link waves-effect" href="#" onClick={(e)=>{e.preventDefault(); if (page < Math.ceil(allCount / countOnPage)) {setPage(page+1)}}} ><ChevronsRight size={18} /></a >
                        </li>:<></>}
                    </ul>
                </nav>
                <div className="btn-group" style={{ marginLeft: "10px", maxHeight: "35px" }}>
                    <button onClick={() => { setDropDownShow(!dropdownShow) }} type="button" className="btn btn-outline-secondary dropdown-toggle waves-effect" data-bs-toggle="dropdown">{countOnPage}</button>
                    <ul className={dropdownShow ? "dropdown-menu show" : "dropdown-menu"}>
                        {[10, 25, 50, 100].map((item, index) => {
                            return <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); setCountOnPage(item); setDropDownShow(false) }} href="#">{item}</a></li>
                        })}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Paginator