import React , {useState} from 'react';
import styled from 'styled-components';
import { ListView , Ribbon} from '.';

function App() {

    const [selected, setSelected] = useState("View")

    return (
    <GlobalContainer>
        <Container>
            <Ribbon selected={selected} setSelected={setSelected}/>
            {selected === "View" && <ListView/>}
        </Container>
    </GlobalContainer>
    );
}

export { App }; 


const GlobalContainer = styled.div`
margin: 0;
padding: 5px;
background: #C5DA99;
font-family: Arial, Helvetica, sans-serif;
font-size: 14px;
color: #787878;
`

const Container = styled.div`
display: flex;
flex-direction:column;
`
