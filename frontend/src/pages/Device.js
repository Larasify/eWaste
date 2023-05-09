import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import {AuthContext} from "../App";
import { Notify } from '../fragments/Notify';

export default function Device(props) {

    const {state} = useLocation()
    const [estimatedValue, setEstimation] = React.useState('Please provide more details');

    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [brands, setBrands] = React.useState([])
    const [models, setModels] = React.useState([])
    const [storage, setStorage] = React.useState([])
    const authState = React.useContext(AuthContext)
    let navigate = useNavigate();

    const preFetch = () => {
        try {
            if(state.data) {
                setData(state.data)
                setBrands([... new Set(state.data.map(v => v.brand))])
            }
            if (state.brand && state.brand != 'Please Select a Brand') {
                document.getElementById('brand-id').value = state.brand
                const filteredData = data.filter(v => {
                    return v.brand === state.brand
                }) 
                setModels([... new Set(filteredData.map(d => d.model_name))])
            }
            if (state.model && state.model != 'Please Select a Brand First' ) {
                document.getElementById('model-id').value = state.model
                document.getElementById('model-id').click();
            }
            if (state.storage && state.storage != 'Please Select a Model First' ) document.getElementById('device-storage').value = state.storage
            if (state.color) document.getElementById('color-id').value = state.color
                
        } catch (e) {
            console.log('prefetch error. retrying', e)
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [loading])

    const fetchData = () => {
        fetch('/vendor/getvendorlist')
            .then(vendorRequest => (vendorRequest).json())
            .then(vendors => {
                setData(JSON.parse(vendors.vendor_list));
                setBrands([... new Set(data.map(v => v.brand))])
                setLoading(false);
                preFetch();
            });
    }

    const predict = () => {
        const price = document.getElementById('cost-purchase-id').value
        const condition = document.getElementById('device-condition').value
        if(price && condition) {
            switch(condition) {
                case 'new': 
                    setEstimation(`£ ${price}`)
                    break
                case 'ninety': 
                    setEstimation(`£ ${price*.9}`)
                    break
                case 'seventy': 
                    setEstimation(`£ ${price*.7}`)
                    break
                case 'thirty': 
                    setEstimation(`£ ${price*.3}`)
                    break
                case 'recycle': 
                    setEstimation(`£ ${0}`)
                    break
                default:
                    break;
            }
        }
    }

    const submitDevice = (e) => {
        e.preventDefault();
        const color = document.getElementById('color-id').value;
        const purchaseCost = document.getElementById('cost-purchase-id').value;
        const purchaseYear = document.getElementById('year-purchase-id').value;
        const os = document.getElementById('os-id').value;
        const deviceCondition = document.getElementById('device-condition').value;
        const description = document.getElementById('description').value;
        const wipeOnly = document.getElementById('wiping').checked;
        const brand = document.getElementById('brand-id').value;
        const model = document.getElementById('model-id').value;
        const deviceStorage = document.getElementById('device-storage').value;
        const vendor = data.filter(v => {
            return v.brand === brand && 
                    v.model_name === model &&
                    v.storage === deviceStorage
        })[0]
        if(vendor) {
            fetch('/device/postdevice', {
                method: 'POST',
                credentials: "include",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({
                    vendor_id: vendor.id,
                    user_id: authState.userId,
                    brand,
                    model,
                    identification: deviceCondition,
                    status: 'Submitted for Review',
                    operating_system: os,
                    memory_storage: deviceStorage,
                    color,
                    dtype: 'phone',
                    description: description,
                    service: wipeOnly ? 'wipe' : 'wipe and retrieve',
                    datalink: '',
                    qr_code: '',
                    verified: true
                })
            })
            .then(res => res.json())
            .then(payload => {
                if(payload.response === 'success') {
                    Notify.success('success!')
                    navigate('/');
                }
                else Notify.error('Something went wrong!');
            })

        }
    }

    const fetchOptions = (column) => {
        if(column === 'model') {
            const filteredData = data.filter(v => {
                return v.brand === document.getElementById('brand-id').value
            }) 
            setModels([... new Set(filteredData.map(d => d.model_name))])
        } else if (column === 'storage') {
            const filteredData = data.filter(v => {
                return v.brand === document.getElementById('brand-id').value && 
                        v.model_name === document.getElementById('model-id').value
            }) 
            setStorage([... new Set(filteredData.map(d => d.storage))])
        }
    }

    const navigateBack = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost.")) {
            navigate(-1);
        }
    };

    const navigateToCustom = () => {
        const color = document.getElementById('color-id').value;
        const purchaseCost = document.getElementById('cost-purchase-id').value;
        const purchaseYear = document.getElementById('year-purchase-id').value;
        const os = document.getElementById('os-id').value;
        const deviceCondition = document.getElementById('device-condition').value;
        const description = document.getElementById('description').value;
        const brand = document.getElementById('brand-id').value;
        const model = document.getElementById('model-id').value;
        const deviceStorage = document.getElementById('device-storage').value;
        navigate('/custom-device', {
            state: {
                color,
                os,
                condition: deviceCondition,
                description,
                brand,
                model,
                storage: deviceStorage,
                cost: purchaseCost,
                year: purchaseYear
            }
        })
    }

    const renderForm = () => {
        if (loading) {
            return <div className='w-full h-full justify-center items-center flex flex-col mt-8'>
                <CircularProgress sx={{
                    color: '#509E82'
                }} />
                <label className='mt-4 lg:mt-8 text-grey'>Fetching Vendor Details. Please wait</label>
            </div>
        } else {
            return <form name="new-device-form" onSubmit={submitDevice.bind(null)}>
                <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Brand</label>
                        <select 
                            onClick={e => fetchOptions('model')}
                            onChange={e => fetchOptions('model')}
                            required id='brand-id' className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full bg-white'>
                            <option selected disabled>Please Select a Brand</option>
                            {brands.map((brand) => (
                                <option key={brand} value={brand} name={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Model Name</label>
                        <select 
                            onClick={e => fetchOptions('storage')}
                            onChange={e => fetchOptions('storage')}
                            required id='model-id' className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full bg-white'>
                            <option selected disabled>Please Select a Brand First</option>
                            {models.map((model) => (
                                <option key={model} value={model} name={model}>{model}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Storage</label>
                        <select required id="device-storage" className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full bg-white'>
                            <option selected disabled>Please Select a Model First</option>
                            {storage.map((str) => (
                                <option key={str} value={str} name={str}>{str}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Operating System</label>
                        <input required className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text" id='os-id'></input>
                    </div>
                </div>
                <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Color</label>
                        <input required className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text" id='color-id'></input>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Device Condition</label>
                        <select onChange={predict} required id='device-condition' className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full bg-white'>
                            <option value='new'>Like New</option>
                            <option value='ninety'>90%</option>
                            <option value='seventy'>70%</option>
                            <option value='thirty'>30%</option>
                            <option value='recycle'>Recycle</option>
                        </select>
                    </div>
                </div>
                <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Year of Purchase</label>
                        <input required className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text" id='year-purchase-id'></input>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Cost at Purchase</label>
                        <input onChange={predict} required className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text" id='cost-purchase-id'></input>
                    </div>
                </div>
                <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
                    <div className='flex flex-col w-full'>
                        <label className='mb-1 text-base font-semibold'>Description of the device</label>
                        <textarea id='description' required className="rounded-lg border-2 border-[#509E82] w-full p-2 h-28" />
                    </div>
                </div>
                <div className="flex mt-8">
                    <input type="radio" id="wiping" name="service" value="wiping" required />
                    <label className='mr-2 lg:mr-12 ml-2 font-bold' for="wiping">Wipe Data from Device</label>
                    <input type="radio" id="retrieval" name="service" value="retrieval" required />
                    <label className='mr-2 lg:mr-12 ml-2 font-bold' for="retrieval">Wipe & Retrieve Data from Device</label>
                </div>
                <div className="flex justify-end mb-4 flex-col w-full items-end">
                    <span className='mt-4 cursor-pointer text-[#499177]' onClick={navigateToCustom}>
                        <a className='underline underline-offset-2'>Cannot find your device? Please enter the details</a>
                    </span>
                    <button type='submit'>
                        <div className="flex w-52 mt-1 bg-[#509E82] text-white h-10 justify-center items-center font-semibold rounded-lg cursor-pointer">
                            <span className="register">Submit and get quote!</span>
                        </div>
                    </button>
                </div>
            </form>
        }
    }

    return (
        <div className="mt-8 mx-4 lg:mx-24 flex justify-center h-full flex-col">
            <div className="mt-4 ml-4 flex flex-row border-b-2 border-b-[#509E82]">
                <div className="flex w-12 lg:w-8 h-8 rounded-3xl bg-[#509E82] text-[#ffffff] text-xl justify-center items-center cursor-pointer" onClick={navigateBack}><IoIosArrowBack /></div>
                <div className="ml-4 lg:ml-8 flex text-[#509E82] flex-col pb-4">
                    <span className="font-bold text-2xl">Welcome your contribution to the planet</span>
                    <span className="text-lg">Enter your device details to get a quote!</span>
                </div>
            </div>
            <div className="mx-8 lg:mx-20 flex flex-col lg:flex-row justify-center">
                <div className="mt-4 flex flex-col justify-center items-center w-full lg:w-1/3 text-4xl text-[#509E82] font-semibold">
                    <span>Details</span>
                    <div className="p-8 mt-4 w-60 border-2 border-[#509E82] h-80 rounded-3xl flex justify-center items-center">
                        <img className="max-w-full" src='images/phone-generic.jpg' />
                    </div>
                    <div className='flex'>
                        <span className='text-base text-black mt-2'>Estimated Resale Price:</span>
                        <div className='text-sm flex items-center text-black'>
                            <Tooltip title="Please be aware that this is the estimated price that you get if you sold the device via a reseller like CeX and not a price for recycling your device.">
                                <IconButton style={{ fontSize: '1rem' }}>
                                    <AiOutlineInfoCircle />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <span id='price-estimate' className='text-base'>{estimatedValue || ' 70'}</span>
                </div>
                <div className="mt-4 w-full lg:w-2/3 flex flex-col">
                    {renderForm()}
                </div>
            </div>

        </div>
    )
}
