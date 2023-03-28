import React, {
    // useState
} from 'react'
import PropTypes from 'prop-types';
import Listing from '../fragments/Listing.js';
import { FiMapPin } from 'react-icons/fi';
import { FaRegCreditCard } from 'react-icons/fa';
import { 
    // AiFillStar, AiOutlineStar, 
    AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './Home.css'
import Comment from '../fragments/Comment';

export default function Home() {
    const iterator = Array.from(Array(4).keys())
    
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`
        };
    }

    function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
                </Box>
            )}
            </div>
        );
        }
        
        TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    return (
        <div className={"flex flex-col w-full"} style={{height: 'calc(100vh - 6rem)', fontFamily: 'pf'}}>
            <div className={"flex flex-col lg:flex-row w-full bg-color-red h-auto lg:h-full bg-gradient-to-r from-[#ebfff3] to-[#c7efd7]"}>
                <div className={"flex flex-col w-full lg:w-3/5 px-4 lg:px-16 mt-4 lg:my-16 gap-y-1 md:gap-y-4"}> 
                    <span className={"text-2xl md:text-4xl"}>
                    <b>Recycle</b> your old device to 
                    </span>
                    <span className={"text-2xl md:text-4xl"}>
                    <b>Reuse</b> them and 
                    </span>
                    <span className={"text-2xl md:text-4xl"}>
                    <b>Get</b> payments ！
                    </span>
                    <div className={"flex flex-col"}>
                        <div className={"home-tabs"}>
                        <Tabs value={value} onChange={handleChange} aria-label="device-suggestions">
                            <Tab className={"mr-8"} label="Recently Recycled" {...a11yProps(0)}/>
                            <Tab label="Most Popular" {...a11yProps(1)} />
                        </Tabs>
                        </div>
                        <TabPanel value={value} index={0}>
                            <div className={"flex flex-col"}>
                                <div className={"flex gap-x-4 md:gap-x-10 overflow-x-auto overflow-y-hidden pb-4"}>
                                    {iterator.map((i) => (
                                        <div>
                                            <Listing/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div className={"flex flex-col"}>
                                <div className={"flex gap-x-4 md:gap-x-10 overflow-x-auto overflow-y-hidden pb-4"}>
                                    {iterator.map((i) => (
                                        <div>
                                            <Listing/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </div>
                <div className={"flex flex-col w-full lg:w-2/5 px-12 pb-4 mr-8 my-2 lg:my-16 justify-center items-center"}>
                <div className={'flex flex-col justify-center lg:max-w-md w-full mx-12 p-4 lg:px-16 lg:py-8 mt-8 items-center rounded-xl bg-[#ECF4F1] drop-shadow-lg'}>
                     <div>
                     <span className={"color-[#509E82] mb-4 font-bold text-lg"}>Enter your device details and get a quote as early as 2 hours!</span>
                     </div>
                     <div className={"flex flex-col mt-4 w-full device-form-input"}>
                         <label>Brand</label>
                         <input type="text"></input>
                     </div>
                     <div className={"flex flex-col mt-4 w-full device-form-input"}>
                         <label>Model</label>
                         <select>
                             <option>Model 1</option>
                             <option>Model 2</option>
                             <option>Model X</option>
                             <option>Model S</option>
                             <option>Model M</option>
                         </select>
                     </div>
                     <div className={"flex flex-col mt-4 w-full device-form-input"}>
                         <label>Color</label>
                         <select>
                             <option>Pitch Black</option>
                             <option>White Color</option>
                             <option>Other Color</option>
                             <option>Other Color</option>
                             <option>Other Color</option>
                         </select>
                     </div>
                     <div className={"flex flex-col mt-4 w-full device-form-input"}>
                         <label>Storage</label>
                         <select>
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
                     <div className={"flex mt-8 w-auto px-8 w-max-lg bg-[#509E82] text-white h-8 justify-center items-center font-semibold rounded-2xl cursor-pointer mb-4"}>
                         <span>Get Quote!</span>
                     </div>
                 </div>
                </div>
            </div>
            <div className={"flex w-full h-auto flex-col"}>
                <div className={"flex flex-col w-full h-1/2 mt-16 px-16"}>
                    <div className={"flex w-fit mb-4 border-b-4 border-b-solid border-b-[#509E82]"}> 
                        <span className={"pb-2 text-2xl"}>How the <b>Recycling</b> works!</span> 
                    </div>
                    <div className={"flex flex-col md:flex-row mt-4 justify-center"}>
                        <div className={"flex flex-col w-full md:w-1/5 items-center text-3xl text-[#509E82] mb-4 md:mb-0"}>
                            <BsSearch/>
                            <span className={"text-base mt-4 text-black mx-4 md:mx-0 text-center md:text-left font-bold md:font-normal"}>Search for your device from the list or enter the custom information!</span>
                        </div>
                        <div className={"hidden md:flex text-3xl h-full items-center mx-4"}>
                            <AiOutlineArrowRight/>
                        </div>
                        <div className={"flex flex-col w-full md:w-1/5 items-center text-3xl text-[#509E82] mb-4 md:mb-0"}>
                            <AiOutlineEdit/>
                            <span className={"text-base mt-4 text-black mx-4 md:mx-0 text-center md:text-left font-bold md:font-normal"}>Confirm your details so we get your order!</span>
                        </div>
                        <div className={"hidden md:flex text-3xl h-full items-center mx-4"}>
                            <AiOutlineArrowRight/>
                        </div>
                        <div className={"flex flex-col w-full md:w-1/5 items-center text-3xl text-[#509E82] mb-4 md:mb-0"}>
                            <FiMapPin/>
                            <span className={"text-base mt-4 text-black mx-4 md:mx-0 text-center md:text-left font-bold md:font-normal"}>Send your device to our hub!</span>
                        </div>
                        <div className={"hidden md:flex text-3xl h-full items-center mx-4"}>
                            <AiOutlineArrowRight/>
                        </div>
                        <div className={"flex flex-col w-full md:w-1/5 items-center text-3xl text-[#509E82] mb-4 md:mb-0"}>
                            <FaRegCreditCard/>
                            <span className={"text-base mt-4 text-black mx-4 md:mx-0 text-center md:text-left font-bold md:font-normal"}>Get your money sent to you!</span>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col w-full h-1/2 my-16 px-16"}>
                    <div className={"flex w-fit mb-4 border-b-4 border-b-solid border-b-[#509E82]"}> 
                        <span className={"pb-2 text-2xl"}>User <b>Comments</b></span> 
                    </div>
                    <div className={"flex mt-4 justify-center gap-16 comments"}>
                        <Comment name="Pan" ts="March 20, 2023" comment="I really appreciate the eWaste Hub! They can help me wipe the data!" rating={4}/>
                        <Comment className={"hidden lg:flex"} name="Buuuu" ts="March 21, 2023" comment="Good Website! They have really good service and even have data retrieval ! Highly recommend!" rating={5}/>
                        <Comment className={"hidden lg:flex"} name="Majiin Buu" ts="March 22, 2023" comment="I really appreciate the eWaste Hub! They have really good service and can help you wipe your data! Highly recommend!" rating={5}/>
                    </div>
                </div>
            </div>
            <div className={"flex w-full h-full px-8 md:px-16 py-32 bg-[#ECF4F1]"}> 
                <div className={"hidden md:flex w-1/2 justify-center"}>
                    <img className={"object-contain"} src="../images/1 1.png"/>
                </div>
                <div className={"flex w-full md:w-1/2 justify-center flex-col md:px-16"}>
                    <span className={"text-bold text-5xl mb-8 pl-4 text-[#494949]"}>Who <b>We Are</b></span>
                    <span className={"text-xl text-[#828282]"}>As a electronic waste recycling hub, we are committed to maximising the value of old device by recycling them as early as possible so that they will be more likely to be used, and also reused for longer. At the same time, this also helps to reduce the planet's resources consumption</span>
                </div>
            </div>
            <div className={"flex w-full h-full px-8 md:px-16 py-32"}>
                <div className={"flex w-full md:w-1/2 justify-center flex-col md:px-16"}>
                    <span className={"text-bold text-5xl mb-8 pl-4 text-[#494949]"}>What <b>We Do</b></span>
                    <span className={"text-xl text-[#828282]"}>We will recycle your device and pass it to a third party, ensuring that the data is clearly wiped. In the case of recycled phones, we offer cloud storage where the data will be stored on the cloud for you to download.</span>
                </div>
                <div className={"hidden md:flex w-1/2 justify-center"}>
                    <img className={"object-contain"} src="../images/2 1.png"/>
                </div>
            </div>
            <div className={"flex w-full h-full px-8 md:px-16 py-32 bg-[#FFF6F2]"}>
                <div className={"hidden md:flex w-1/2 justify-center"}>
                    <img className={"object-contain"} src="../images/3 1.png"/>
                </div>
                <div className={"flex w-full md:w-1/2 justify-center flex-col md:px-16"}>
                    <span className={"text-bold text-5xl mb-8 pl-4 text-[#494949]"}>Why <b>Choose Us</b></span>
                    <span className={"text-xl text-[#828282]"}>Unlike other recycling sites, our hub will identify the type of recycling depending on your model, which means you may be able to get a good amount of payment for your application. We also offer long term cloud storage of your data if your device will be recycled rather than passed on to a third party. For rare phones, we are better able to identify their value and make better offers than other sites. So please don’t hesitate to choose us!</span>
                </div>
            </div>
            <div className={"flex justify-center items-center py-8"}>
                <span>© Copyright eWaste 2023 . All Rights Reserved.</span>
            </div>
        </div>
    )
}
