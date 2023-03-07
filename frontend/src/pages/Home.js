import React, {useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './Home.css'

export default function Home() {
    const iterator = Array.from(Array(16).keys())
    
    const [value, setValue] = useState([1, 3]);
    const handleChange = (val) => setValue(val);

    return (
        <div class="home-container">
            <div class="left-panel">
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
            </div>
        </div>
    )
}
