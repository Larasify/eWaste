import React from 'react'
import {IoIosArrowBack} from 'react-icons/io';


export default function Device() {
  return (
    <div className="mt-8 mx-4 lg:mx-24 flex justify-center h-full flex-col">
      <div className="mt-4 ml-4 flex flex-row border-b-2 border-b-[#509E82]">
        <div className="flex w-12 lg:w-8 h-8 rounded-3xl bg-[#509E82] text-[#ffffff] text-xl justify-center items-center cursor-pointer"><a href='/'><IoIosArrowBack/></a></div>
        <div className="ml-4 lg:ml-8 flex text-[#509E82] flex-col pb-4">
          <span className="font-bold text-2xl">Welcome your contribution to the planet</span>
          <span className="text-lg">Enter your device details to get a quote!</span>
        </div>
      </div>
      <div className="mx-8 lg:mx-20 flex flex-col lg:flex-row justify-center">
        <div className="mt-4 flex flex-col justify-center items-center w-full lg:w-1/3 text-4xl text-[#509E82] font-semibold">
          <span>Details</span>
          <div className="p-8 mt-4 w-60 border-2 border-[#509E82] h-80 rounded-3xl flex justify-center items-center">
            <img className="max-w-full" src='images/phone-generic.jpg'/>
          </div>
        </div>
        <div className="mt-4 w-full lg:w-2/3 flex flex-col">
          <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
              <div className='flex flex-col w-full'>
                  <label className='mb-1 text-base font-semibold'>Device</label>
                  <input className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text"></input>
              </div>
              <div className='flex flex-col w-full'>
                  <label className='mb-1 text-base font-semibold'>Model Name</label>
                  <input className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text"></input>
              </div>
          </div>
          <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
              <div className='flex flex-col w-full'>
                  <label className='mb-1 text-base font-semibold'>Storage</label>
                  <select className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full bg-white'>
                      <option>4 GB</option>
                      <option>8 GB</option>
                      <option>16 GB</option>
                      <option>32 GB</option>
                      <option>64 GB</option>
                      <option>128 GB</option>
                      <option>256 GB</option>
                      <option>512 GB</option>
                      <option>1 TB</option>
                  </select>
              </div>
              <div className='flex flex-col w-full'>
                  <label className='mb-1 text-base font-semibold'>Year of Purchase</label>
                  <input className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text"></input>
              </div>
          </div>
          <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
            <div className='flex flex-col w-full'>
                <label className='mb-1 text-base font-semibold'>Color</label>
                <input className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text"></input>
            </div>
            <div className='flex flex-col w-full'>
                <label className='mb-1 text-base font-semibold'>Cost at Purchase</label>
                <input className='h-8 pl-8 text-base rounded-lg border-2 border-[#509E82] w-full' type="text"></input>
            </div>
          </div>
          <div className="flex-col lg:flex-row flex mt-4 w-full gap-8">
            <div className='flex flex-col w-full'>
              <label className='mb-1 text-base font-semibold'>Description of the device</label>
              <textarea className="rounded-lg border-2 border-[#509E82] w-full p-2 h-28"/>
            </div>
          </div>
          <div className="flex mt-8">
            <input type="radio" id="wiping" name="service" value="wiping"/>
            <label className='mr-2 lg:mr-12 ml-2 font-bold' for="wiping">Wipe Data from Device</label>
            <input type="radio" id="retrieval" name="service" value="retrieval"/>
            <label className='mr-2 lg:mr-12 ml-2 font-bold' for="retrieval">Wipe & Retrieve Data from Device</label>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-28 mb-4">
        <div className="flex mt-4 w-52 bg-[#509E82] text-white h-10 justify-center items-center font-semibold rounded-lg cursor-pointer">
          <span className="register">Submit and get quote!</span>
        </div>
      </div>
    </div>
  )
}
