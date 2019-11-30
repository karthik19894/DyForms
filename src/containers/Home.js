import React from 'react'
import {Container} from 'reactstrap';
import DyForm from '../components/DyForm';
export default function Home() {
    return (
        <div className="home">
            <Container>
                <div className="heading">DyForms</div>
                <DyForm/>
            </Container>
        </div>
    )
}
