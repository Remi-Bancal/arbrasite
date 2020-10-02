import React , {useState} from 'react';
import styled from 'styled-components';
import { ListView , Ribbon , ListEdit } from '.';
import { RibbonState } from './Ribbon/Ribbon';

function App() {

    const [selected, setSelected] = useState(RibbonState.VIEW)

    return (
    <GlobalContainer>
        <Container>
            <Ribbon selected={selected} setSelected={setSelected}/>
            {selected === RibbonState.VIEW && <ListView/>}
            {selected === RibbonState.EDIT && <ListEdit/>}
        </Container>
    </GlobalContainer>
    );
}

export { App }; 


const GlobalContainer = styled.div`
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
