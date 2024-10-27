import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';
import { ClearAll, PlaylistX, Square, SquareX, X } from "tabler-icons-react";

type props = {
    state: State,
    fields: Field[],
    politics?: boolean,
    submitBtnTitle: string | null,
    submit: any;
    updateForm: (name: string, value: any) => void;
    btnSmall?: boolean,
}

interface State {
    loading: boolean | undefined;
    error: string | null | undefined;
}

interface Field {
    name: string
    title: string
    placeholder: string
    type: FiledType
    autofocus?: boolean
    param?: boolean
    options?: Option[],
    accept?: string,
    value?: any,
    bytes?: boolean,
    required?: boolean,
}

interface Option {
    title: string,
    value: any,
}

export enum FiledType {
    Text = "text",
    MultiSelect = "multiselect",
    MultiSelectInt = "multiselectint",
    Select = "select",
    SelectInt = "selectInt",
    TextArea = "textarea",
    Password = "password",
    Email = "email",
    Number = "number",
    File = "file",
    FileSingle = "file_single",
    Color = "color",
    Date = "date",
}

export const Form = (props: props) => {
    const { register, handleSubmit } = useForm();

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        props.updateForm(e.target.name, e.target.value)
    }

    const inputDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        props.updateForm(e.target.name, new Date(e.target.value))
    }

    const filesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            
            let files: File[] = []
            for (var i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i])

            }
            props.updateForm(
                e.target.name, files,
            )
            /*for (var i = 0; i < e.target.files.length; i++) {
                let file = e.target.files[i]

            }
            if (!e.target.classList.contains('bytes')) {
                props.updateForm(
                    e.target.name, file,
                )
            } else {
                let file = e.target.files[0]
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result instanceof ArrayBuffer) {
                        props.updateForm(
                            e.target.name, toBuffer(event.target.result).toJSON().data,
                        )
                    }
                };
                reader.readAsArrayBuffer(file);
            }*/
        }
    }

    const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            
    
            props.updateForm(
                e.target.name, e.target.files[0],
            )
            /*for (var i = 0; i < e.target.files.length; i++) {
                let file = e.target.files[i]

            }
            if (!e.target.classList.contains('bytes')) {
                props.updateForm(
                    e.target.name, file,
                )
            } else {
                let file = e.target.files[0]
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result instanceof ArrayBuffer) {
                        props.updateForm(
                            e.target.name, toBuffer(event.target.result).toJSON().data,
                        )
                    }
                };
                reader.readAsArrayBuffer(file);
            }*/
        }
    }

    const toBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
        const buffer = Buffer.alloc(arrayBuffer.byteLength);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buffer.length; ++i) {
            buffer[i] = view[i];
        }
        return buffer;
    }


    const inputChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.updateForm(
            e.target.name, parseInt(e.target.value),
        )
    }

    const selectOptionClick = (name: string, value: any) => {
        if (value === "true" || value === "false") {
            props.updateForm(name, value === "true")
            return
        }
        props.updateForm(name, value)
    }

    const selectMultipleedit = (name: string, value: string, oldValue: string) => {
        /*if (oldValue.includes(value)) {
            props.updateForm(name, oldValue.split(',').filter(e => e !== value))
        } else {
            let newValue = []
            
            
            newValue.push(value)
            console.log(newValue)
            props.updateForm(name, newValue.join(','))
        }*/

    }

    const formatDate = (day: Date) => {
        const yyyy = day.getFullYear();
        let mm = (day.getMonth() + 1).toString(); // Months start at 0!
        let dd = day.getDate().toString();

        if (dd.length == 1) dd = '0' + dd;
        if (mm.length == 1) mm = '0' + mm;

        return yyyy + "-" + mm + '-' + dd;
    }

    return (
        <form className="mb-3" method="POST" onSubmit={props.submit}>
            {props.fields.map((field, index) => {
                switch (field.type) {
                    case FiledType.Select:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <select required={field.required??false} value={field.value} onChange={(e) => selectOptionClick(field.name, e.target.value)} name={field.name} className="form-select mb-3" key={"form_field_" + index}>
                                    <option disabled selected value="">{field.placeholder}</option>
                                    {field.options?.map((option) => {
                                        return <option value={option.value}>{option.title}</option>
                                    })}
                                </select>
                            </div>
                        )
                    case FiledType.MultiSelect:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <select required={field.required??false} multiple onChange={(e) => { let value = Array.from(e.target.selectedOptions, option => option.value); selectOptionClick(field.name, value) }} name={field.name} className="form-select mb-3" key={"form_field_" + index}>
                                    {field.options?.map((option) => {
                                        return <option value={option.value}>{option.title}</option>
                                    })}
                                </select>
                            </div>
                        )
                    case FiledType.MultiSelectInt:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label> <SquareX style={{cursor: "pointer", color: "red"}} onClick={()=>{selectOptionClick(field.name, [])}} />
                                <select required={field.required??false} multiple onChange={(e) => { let value = Array.from(e.target.selectedOptions, option => parseInt(option.value)); console.log(value); selectOptionClick(field.name, value) }} name={field.name} className="form-select mb-3" key={"form_field_" + index}>
                                    {field.options?.map((option) => {
                                        return <option value={option.value} selected={field.value.includes(option.value)}>{option.title}</option>
                                    })}
                                </select>
                                
                            </div>
                        )
                    case FiledType.SelectInt:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <select required={field.required??false} value={field.value} onChange={(e) => selectOptionClick(field.name, parseInt(e.target.value))} name={field.name} className="form-select mb-3" key={"form_field_" + index}>
                                    <option disabled selected value="0">{field.placeholder}</option>
                                    {field.options?.map((option) => {
                                        return <option value={option.value}>{option.title}</option>
                                    })}
                                </select>
                            </div>
                        )
                    case FiledType.TextArea:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <textarea
                                    className="form-control"
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    autoFocus={field.autofocus}
                                    onChange={inputChange}
                                    required={field.required??false}
                                />
                            </div>
                        )
                    case FiledType.Date:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <input
                                    type={field.type}
                                    className="form-control"
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    autoFocus={field.autofocus}
                                    value={formatDate(field.value)}
                                    onChange={inputDateChange}
                                    required={field.required??false}
                                />
                            </div>
                        )
                    case FiledType.File:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <input
                                    type={field.type}
                                    className={field.bytes ? "form-control bytes" : "form-control"}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    autoFocus={field.autofocus}
                                    onChange={filesChange}
                                    accept={field.accept}
                                    multiple
                                    required={field.required??false}
                                />
                            </div>
                        )
                    case FiledType.FileSingle:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <input
                                    type={"file"}
                                    className={field.bytes ? "form-control bytes" : "form-control"}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    autoFocus={field.autofocus}
                                    onChange={fileChange}
                                    accept={field.accept}
                                    multiple
                                    required={field.required??false}
                                />
                            </div>
                        )
                    case FiledType.Color:
                        return (
                            <div key={"form_field_" + index} className="col-md-6 mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <input
                                    type={field.type}
                                    className="form-control"
                                    name={field.name}
                                    value={field.value}
                                    placeholder={field.placeholder}
                                    autoFocus={field.autofocus}
                                    onChange={inputChange}
                                    required={field.required??false}
                                />
                            </div>
                        )
                    default:
                        return (
                            <div key={"form_field_" + index} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.title}</label>
                                <input
                                    type={field.type}
                                    className="form-control"
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    autoFocus={field.autofocus}
                                    value={field.value}
                                    onChange={field.type == FiledType.Number ? inputChangeNumber : inputChange}
                                    required={field.required??false}
                                />
                            </div>
                        )
                }

            })}

            {props.politics ? <div className="mb-3" key="politics">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms-conditions" onChange={inputChange} name="terms" />
                    <label className="form-check-label" htmlFor="terms-conditions">
                        Я согласен с <a href="#">политикой конфиденциальности</a>
                    </label>
                </div>
            </div> : <></>}
            <div className="d-flex justify-content-end">
                {props.submitBtnTitle ? <button key="submit" className={props.btnSmall == true ? "btn btn-primary d-grid" : "btn btn-primary d-grid w-100"}>{props.state.loading ? "loading" : props.submitBtnTitle}</button> : <></>}
            </div>
        </form>
    );

}
