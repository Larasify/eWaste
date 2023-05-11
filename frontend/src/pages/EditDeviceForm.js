import React, {useEffect, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";
import {FormControl} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Notify} from "../fragments/Notify";
import {AuthContext} from "../App";


export default function EditDeviceForm(){
    const navigate = useNavigate();
    const state = useLocation().state;
    const [vendors, setVendors] = useState([])
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [storages, setStorages] = useState([]);
    const [prices, setPrices] = useState([]);
    const [draftMessage, setDraftMessage] = useState("")
    const authState = React.useContext(AuthContext)

    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    const [device, setDevice] = React.useState(state);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "brand":
                setStorages([]);
                setPrices([])
                setModels([...new Set(vendors.filter((vendor) => vendor.brand === value).map((vendor) => vendor.model_name))]);
                setDevice({...device, [name]: value, ["model"]: undefined, ["memory_storage"]: undefined})
                break;
            case "model":
                setDevice({...device, [name]: value, ["storage"]: undefined, ["worth"]: undefined})
                setStorages([
                    ...new Set(vendors
                        .filter(
                            (vendor) => vendor.brand === device.brand && vendor.model_name === value)
                        .map((vendor) => vendor.storage))
                ]);
                setPrices([...new Set(vendors
                    .filter(
                        (vendor) => vendor.brand === device.brand && vendor.model_name === value)
                    .map((vendor) => vendor.sale_price)),
                    ...new Set(vendors
                        .filter(
                            (vendor) => vendor.brand === device.brand && vendor.model_name === value)
                        .map((vendor) => vendor.sale_price2))]);
                break;
            case "identification":
                if (value === "thirty" || value === "seventy" || value === "ninety" || value === "new") {
                    setDevice({...device, ["service"]: "wipe", ["identification"]: value});
                } else {
                    setDevice({ ...device, [name]: value });
                }
                break;
            default:
                setDevice({ ...device, [name]: value });
        }
    };

    const submitForm = () => {
        let myRequest;
        if (state._op === "edit") {
            myRequest = new Request("/device/updatedevice", {
                headers: new Headers({"Content-Type": "application/json"}),
                method: "POST",
                credentials: "include",
                body: JSON.stringify({"id": device.id, "fields": [device]})
            });
        } else {
            myRequest = new Request("/device/postdevice", {
                headers: new Headers({"Content-Type": "application/json"}),
                method: "POST",
                credentials: "include",
                body: JSON.stringify(device)
            })
        }
        fetch(myRequest)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    Notify.error(`Update device (HTTP) failed: ${response.status}: ${response.statusText}`);
                    throw `Update device (HTTP) failed: ${response.status}: ${response.statusText}`
                }
            }).then((data) => {
                if (data['response'] !== "success") {
                    Notify.error(`Update device failed: ${data['message']}`);
                } else {
                    Notify.success("Update successfully")
                    navigate(-1);
                }
        });
    }

    const showReport = () =>{
        let deviceId = device.id
        navigate('/view-device-report',{state:{deviceId}})
    }

    const sendLinkOrQrCode = () => {
        const sendLinkSubmit = (id = device.id) => {
            let url;
            if (device.identification === "thirty"
                || device.identification === "seventy"
                || device.identification === "ninety"
                || device.identification === "new"
                || device.identification === "rare"
            ) {
                url = "/device/generateqr";
            } else {
                url = "/device/generatedatalink";
            }
            const myRequest = new Request(url, {
                headers: new Headers({"Content-Type": "application/json"}),
                method: "POST",
                credentials: "include",
                body: JSON.stringify({"id": device.id})
            });
            fetch(myRequest).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    Notify.error(`Generate data link (HTTP) failed: ${response.status}: ${response.statusText}`);
                    throw `Generate data link (HTTP) failed: ${response.status}: ${response.statusText}`;
                }
            }).then((data) => {
                console.log(data)
                if (data['response'] === "success") {
                    Notify.success("Data link is generated and sent to user");
                } else {
                    Notify.error(`Data link generates failed: ${data['message']}`);
                    throw `Data link generates failed: ${data['message']}`;
                }
            })
        }
        if (state._op !== "edit") {
            const myRequest = new Request("/device/postdevice", {
                headers: new Headers({"Content-Type": "application/json"}),
                method: "POST",
                credentials: "include",
                body: JSON.stringify(device)
            })
            fetch(myRequest)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        Notify.error(`Update device (HTTP) failed: ${response.status}: ${response.statusText}`);
                        throw `Update device (HTTP) failed: ${response.status}: ${response.statusText}`
                    }
                }).then((data) => {
                    if (data['response'] !== "success") {
                        Notify.error(`Update device failed: ${data['message']}`);
                        throw `Update device failed: ${data['message']}`
                    } else {
                        Notify.success("Create device successfully");
                        setDevice({...device, ["id"]: data["new_device_id"]});
                        sendLinkSubmit(data["new_device_id"]);
                        navigate(-1);
                    }
                });
            return;
        }
        sendLinkSubmit();
    }

    useEffect(() => {
        if(!authState.isLoggedIn || authState.privilege!='staff') navigate('/')
        const loadVendors = async () => {
            const myRequest = new Request("/vendor/getvendorlist", {
                headers: new Headers({"Content-Type": "application/json"}),
                method: "GET",
                credentials: "include"
            })
            const data = await (await fetch(myRequest)).json();
            if (data['response'] !== "success") {
                throw data['message'];
            }
            setVendors(data['vendor_list']);
            setBrands([...new Set(data['vendor_list'].map((vendor) => vendor.brand))])
            if (state._op === "edit") {
                setDevice(state)
                setModels([...new Set(data['vendor_list'].filter((vendor) => vendor.brand === device.brand).map((vendor) => vendor.model_name))]);
                setStorages([
                    ...new Set(data['vendor_list']
                        .filter(
                            (vendor) => vendor.brand === device.brand && vendor.model_name === device.model)
                        .map((vendor) => vendor.storage))
                ]);
                setPrices([...new Set(data['vendor_list']
                    .filter(
                        (vendor) => vendor.brand === device.brand && vendor.model_name === device.model)
                    .map((vendor) => vendor.sale_price)),
                    ...new Set(data['vendor_list']
                        .filter(
                            (vendor) => vendor.brand === device.brand && vendor.model_name === device.model)
                        .map((vendor) => vendor.sale_price2))])
            } 
        }
        loadVendors().catch(e => Notify.error(e))
    }, [])


    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl bg-[#ddeafe]"}>
            {/*display area*/}
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-[#4b72b2]"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 m-auto rounded-2xl border-[#4b72b2] border-2"}/>

                <div className={"flex p-4 md:pl-8  justify-center"}>
                    <p className={"md:m-4 mx-auto text-center md:text-left leading-loose"}>
                    <span
                        className={"text-base md:text-2xl lg:text-3xl text-black text-left font-bold lg:leading-10"}>{device.model}</span>
                        <br/>
                        <span
                            className={"text-base md:text-lg lg:text-xl text-[#494949] text-left "}>{device.brand}</span>
                        <br className={"md:hidden"}/>
                        <span
                            className={"md:text-lg lg:text-xl text-white font-bold rounded-full text-left bg-[#4b72b2] p-2 m-2 lg:ml-40"}>{(
                            {
                                "ninety": "90%", "seventy": "70%", "thirty": "30%", "rare": "Rare", "unknown": "Unknown",
                                "recycle": "Recycle", "new": "New"
                            }[device.identification] || "UNKNOWN")}
                        </span>
                        <br/>
                        <span
                            className={"text-base md:text-xl lg:text-2xl md:font-medium text-black text-left lg:leading-loose "}>Expected Value:</span>
                        <br/>
                        <span
                            className={"text-base md:text-xl lg:text-3xl md:font-medium text-[#4b72b2] text-left lg:leading-loose "}>£{device.worth || " UNKNOWN"}</span>
                        {(state._op === "edit") ?
                            <button className={"underline text-base md:text-lg inline text-[#509E82] border-0 mx-2"}
                                    onClick={showReport}>(show report)
                            </button> : undefined}
                        <br/>
                        <span
                            className={"w-full break-normal flex justify-center text-md md:font-medium text-gray-400 text-left lg:leading-loose "}>{device.description}</span>
                    </p>
                </div>
            </div>

            {/*edit area*/}
            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:px-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-6 md:mb-4 "}>

                    {/*brand*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Brand</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                labelId="brand-label"
                                id="brand"
                                value={device.brand}
                                onChange={handleChange}
                                name={"brand"}
                                className={"text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            >
                                {brands.map((brand) => (
                                    <MenuItem value={brand}>{brand}</MenuItem>
                                ))}
                                {brands.includes(device.brand) ? undefined :
                                    <MenuItem value={device.brand}>{device.brand}</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*model name*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Model Name</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                labelId="model-label"
                                id="model"
                                value={device.model}
                                onChange={handleChange}
                                name={"model"}
                                className={"text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            >
                                {models.length === 0 ?
                                    <MenuItem value={null} selected disabled>Please select a brand first</MenuItem>
                                    :
                                    models.map((model) => (<MenuItem value={model}>{model}</MenuItem>))
                                }
                                {device.model && !models.includes(device.model) ?
                                    <MenuItem value={device.model}>{device.model}</MenuItem> : undefined
                                }
                            </Select>
                        </FormControl>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    {/*Identification*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Identification(New)</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                labelId="identification-label"
                                id="identification"
                                value={device.identification}
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                name={"identification"}
                                className={"text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            >
                                <MenuItem value={"new"}>Like New</MenuItem>
                                <MenuItem value={"ninety"}>90%</MenuItem>
                                <MenuItem value={"seventy"}>70%</MenuItem>
                                <MenuItem value={"thirty"}>30%</MenuItem>
                                <MenuItem value={"rare"}>Rare</MenuItem>
                                <MenuItem value={"recycle"}>Recycle</MenuItem>
                                <MenuItem value={"unknown"}>Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*operating system*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Operating System</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                labelId="system-label"
                                id="system"
                                name={"operating_system"}
                                value={device.operating_system}
                                onChange={handleChange}
                                className={"text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                            >
                                <MenuItem value={"android"}>Android</MenuItem>
                                <MenuItem value={"ios"}>IOS</MenuItem>
                                {device.operating_system && !(device.operating_system === "android" || device.operating_system === "ios") ?
                                    <MenuItem
                                        value={device.operating_system}>{device.operating_system}</MenuItem> : undefined
                                }
                            </Select>
                        </FormControl>
                    </div>

                </div>
                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    {/*memory storage*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Memory Storage</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                labelId="storage-label"
                                id="storage"
                                value={device.memory_storage}
                                name={"memory_storage"}
                                onChange={handleChange}
                                className={"text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            >
                                {storages.length === 0 ?
                                    <MenuItem value={null} disabled>Please select a model first</MenuItem>
                                    :
                                    storages.map((storage) => (<MenuItem value={storage}>{storage}GB</MenuItem>))
                                }
                                {device.memory_storage && !(storages.includes(device.memory_storage) || storages.includes(Number(device.memory_storage))) ?
                                    <MenuItem
                                        value={device.memory_storage}>{device.memory_storage}</MenuItem> : undefined
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*color*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}
                               htmlFor={"color"}>
                            * Color</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <input type="text"
                                   onChange={handleChange}
                                   id={"color"}
                                   name={"color"}
                                   value={device.color}
                                   className={"p-2 text-md rounded border border-[#4b72b2] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                        </FormControl>
                    </div>
                </div>

                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>

                    {/*type*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Type</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                labelId="type-label"
                                id="type"
                                value={device.type}
                                onChange={handleChange}
                                name={"type"}
                                className={"text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}

                            >
                                <MenuItem value={"phone"}>Phone</MenuItem>
                                <MenuItem value={"tablet"}>Tablet</MenuItem>
                                <MenuItem value={"laptop"}>Laptop</MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*value*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Expected Value</label>
                        {prices.length === 0 ? (
                                <FormControl fullWidth focused={false} size={"small"}>
                                    <input type="text"
                                           onChange={handleChange}
                                           id={"price"}
                                           name={"worth`"}
                                           placeholder={"Please enter an estimated price."}
                                           className={"p-2 text-md rounded border border-[#4b72b2] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}/>
                                </FormControl>
                            )
                            :
                            (
                                <FormControl fullWidth focused={false} size={"small"}>
                                    <Select
                                        labelId="worth-label"
                                        id="worth"
                                        name={"worth"}
                                        value={device.worth}
                                        onChange={handleChange}
                                        className={"border border-[#4b72b2] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}>
                                        <MenuItem value={prices[0] * 0.5} className={"flex"}>
                                            <label>Cex</label>
                                            <label
                                                className={"absolute right-8 inline text-[#4b72b2] "}>£{prices[0] * 0.5}</label>
                                        </MenuItem>
                                        <MenuItem value={prices[1] * 0.5} className={"flex"}>
                                            <label>Argos</label>
                                            <label
                                                className={"absolute right-8 inline text-[#4b72b2] "}>£{prices[1] * 0.5}</label>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                    </div>
                </div>

                <div className={"md:grid md:grid-cols-2 gap-x-6 mt-2 md:mb-4 "}>
                    {/*status*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Status</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                name={"status"}
                                labelId="status-label"
                                id="status"
                                value={device.status}
                                onChange={handleChange}
                                className={"text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            >
                                <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                                <MenuItem value={"shipped"}>Shipped</MenuItem>
                                <MenuItem value={"received"}>Received</MenuItem>
                                <MenuItem value={"wiped"}>Wiped</MenuItem>
                                <MenuItem value={"approved"}>Approved</MenuItem>
                                <MenuItem value={"rejected"}>Rejected</MenuItem>
                                <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br className={"block md:hidden"}/>

                    {/*verified*/}
                    <div>
                        <label className={"text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Verified</label>
                        <FormControl fullWidth focused={false} size={"small"}>
                            <Select
                                labelId="verified-label"
                                id="verified"
                                value={device.verified}
                                name={"verified"}
                                onChange={handleChange}
                                className={"border border-[#4b72b2] border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}>
                                <MenuItem value={"true"} className={"flex"}>Yes</MenuItem>
                                <MenuItem value={"false"} className={"flex"}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/*description*/}
                <label className={" text-left block mb-2 text-xl font-medium text-gray-900 dark:text-white"}
                       htmlFor={"descriptionInput"}>*
                    Description (No more than 500 words)</label>

                <textarea rows={3}
                          className={" block w-full p-2 text-gray-900 border border-[#4b72b2] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                          id={"descriptionInput"}>{device.description}</textarea>

                {/*service*/}
                <div className="inline mt-4 md:grid md:grid-cols-2">
                    <div className={"flex items-center "}>
                        <input type="radio" id="wiping" name="service" value="wipe"
                               className="h-4 w-4 md:h-5 md:w-5" required checked={device.service === "wipe"}
                               onChange={handleChange}/>
                        <label htmlFor="wiping"
                               className={"ml-2 text-left block text-xl font-medium text-gray-900 dark:text-white"}>Wipe
                            Data from Device</label>
                    </div>
                    <br className={"md:hidden"}/>
                    <div className={"flex items-center "}>
                        <input type="radio" id="retrieval" name="service" value="wipe and retrieve"
                               className="h-4 w-4 md:h-5 md:w-5" required
                               disabled={["thirty", 'seventy', 'ninety', 'new'].includes(device.identification)}
                               checked={device.service === "wipe and retrieve"} onChange={handleChange}/>
                        <label htmlFor="retrieval"
                               className={"ml-2 text-left block text-xl font-medium text-gray-900 dark:text-white"}>Wipe
                            & Retrieve Data from Device</label>
                    </div>
                </div>


                {/*buttons*/}
                <label
                    className={"flex text-lg text-[#4b72b2] underline justify-center md:justify-end mr-5 mt-4 md:mt-2"}>{draftMessage}</label>
                <div className={"flex flex-col md:flex-row justify-end"}>
                    <button onClick={sendLinkOrQrCode}
                            className={"w-full md:w-2/5 h-full mt-2 p-2 px-auto md:p-3 md:mr-10 cursor-pointer bg-[#4b72b2] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold md:mb-6"}>
                        {(device.identification === "thirty"
                            || device.identification === "seventy"
                            || device.identification === "ninety"
                            || device.identification === "new"
                            || device.identification === "rare"
                        ) ? "Send QR Code" : "Send Link"
                        }
                    </button>
                    <br className={"md:hidden"}/>
                    <button onClick={submitForm}
                            className={"w-full md:w-1/5 h-full md:mt-2 p-2 px-auto md:p-3 cursor-pointer bg-[#4b72b2] text-white rounded-full justify-center text-lg md:text-xl lg:text-2xl font-bold md:mb-6"}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}


