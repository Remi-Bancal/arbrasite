import React  from 'react';
import { ParasiteList } from '../ParasiteList';
import styled from 'styled-components';

function ListEdit(props) {

    if (props.parasiteList.length === 0) {
        return <div />
    }
    return (
        <Container>
            <ParasiteList parasites={props.parasiteList} selected={props.selected} setSelected={props.setSelected}/>
        </Container>
        
    );  
}


export { ListEdit }; 

const Container = styled.div`
display: flex;
`