import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import { RiUser5Fill } from 'react-icons/ri';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import './Home.css'

export default function Home() {
    const iterator = Array.from(Array(16).keys())
    
    const [value, setValue] = useState([1, 3]);
    const handleChange = (val) => setValue(val);

    return (
        <div class="home-container">
            {/* <div class="left-panel">
            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange} vertical={true}>
                <ToggleButton id="tbg-btn-1" value={1}>
                    Samsung
                </ToggleButton>
                <ToggleButton id="tbg-btn-2" value={2}>
                    Apple
                </ToggleButton>
                <ToggleButton id="tbg-btn-3" value={3}>
                    Google
                </ToggleButton>
            </ToggleButtonGroup>
            </div>
            <div class="right-panel">
                <Tabs
                defaultActiveKey="Phone"
                id="noanim-tab-example"
                className="mb-3"
                >
                    <Tab eventKey="Phone" title="Phone">
                        <div class='devices'>
                            {iterator.map((i) => (
                                <Card style={{ width: '12rem' }}>
                                <Card.Img variant="top" src="images/phone-generic.jpg" style={{marginTop: '1rem'}}/>
                                <Card.Body>
                                    <Card.Title style={{fontSize: '1rem', textAlign: 'center'}}>Generic Phone</Card.Title>
                                </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                    <Tab eventKey="Tablet" title="Tablet">
                        <div class='devices'>
                            {iterator.map((i) => (
                                <Card style={{ width: '12rem' }}>
                                <Card.Img variant="top" src="images/tablet-generic.jpg" style={{marginTop: '1rem'}}/>
                                <Card.Body>
                                    <Card.Title style={{fontSize: '1rem', textAlign: 'center'}}>Generic Tablet</Card.Title>
                                </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                    <Tab eventKey="Laptop" title="Laptop">
                        <div class='devices'>
                            {iterator.map((i) => (
                                <Card style={{ width: '12rem' }}>
                                <Card.Img variant="top" src="images/laptop-generic.jpg" style={{marginTop: '1rem'}}/>
                                <Card.Body>
                                    <Card.Title style={{fontSize: '1rem', textAlign: 'center'}}>Generic Laptop</Card.Title>
                                </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                    <Tab eventKey="Others" title="Others">
                        <div class='devices'>
                            {iterator.map((i) => (
                                <Card style={{ width: '12rem' }}>
                                <Card.Img variant="top" src="images/device-generic.jpg" style={{marginTop: '1rem'}}/>
                                <Card.Body>
                                    <Card.Title style={{fontSize: '1rem', textAlign: 'center'}}>Generic Device</Card.Title>
                                </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                </Tabs>
            </div> */}
            <div class="left-panel">
                <div class="suggested">
                    <label>Popular Recycled Devices</label>
                    <div class="devices">
                        {iterator.map((i) => (
                            <div>
                                <Card style={{ width: '10rem' }}>
                                    <Card.Img variant="top" src="images/phone-generic.jpg" style={{marginTop: '1rem'}}/>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: '1rem', textAlign: 'center'}}>Generic Phone</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="comments">
                    <div class="comment">
                        <div class="comment-heading">
                            <div class="profile">
                                <RiUser5Fill/>
                            </div>
                            <div class="user-data">
                                <span>Sun Tzu</span>
                                <span>Customer</span>
                            </div>
                            <div class='rating'>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiFillStar/>
                            </div>
                        </div>
                        <span>
                        Second, a response like this establishes the restaurant’s credibility — the chef is proving that he actually reads his reviews and values customer feedback because viewers can watch it happening for themselves. Finally, by responding to his reviews on video, Chef Howie is giving a face to his business. When customers and prospects feel like they know the chef, they are more inclined to return to Seastar Seafood Restaurant and Raw Bar time and time again. 
                        </span>
                    </div>
                    <div class="comment">
                        <div class="comment-heading">
                            <div class="profile">
                                <RiUser5Fill/>
                            </div>
                            <div class="user-data">
                                <span>Moon Tzu</span>
                                <span>Customer</span>
                            </div>
                            <div class='rating'>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiOutlineStar/>
                            </div>
                        </div>
                        <span>
                        Putting a lighthearted spin on one customer’s rant got them a lot of attention. This chalkboard not only shows passersby that the business has a fun vibe, it also proves that the owners actually read their customers’ feedback. Using humor when responding to both positive and negative reviews is a great way to show your business’s personality and grab customers’ attention. 
                        </span>
                    </div>
                </div>
            </div>
            <div class="right-panel">
                <div class='device-form'>
                    <div class='device-label'>
                    <span>Enter your device details and get a quote as early as 2 hours!</span>
                    </div>
                    <div class="device-form-input">
                        <label>Brand</label>
                        <input type="text"></input>
                    </div>
                    <div class="device-form-input">
                        <label>Model</label>
                        <input type="text"></input>
                    </div>
                    <div class="device-form-input">
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
                    <div class="device-form-btn">
                        <span class="register">Get Quote!</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
