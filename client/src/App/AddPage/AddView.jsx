import React  from 'react'
import { EssenceList, EssenceForm } from './Essence'
import { ParasiteLists , ParasiteForm } from './Parasite'
import styled from 'styled-components'

function AddView(props) {

    if (props.parasiteList.length === 0) {
        return <div />
    }
    return (
        <Container>
            <EssenceForm/>
            <EssenceList/>
            <ParasiteForm parasiteList={props.parasiteList} setParasiteList={props.setParasiteList}/>
            <ParasiteLists parasiteList={props.parasiteList} setParasiteList={props.setParasiteList}/>
        </Container>
        
    )  
}


export { AddView } 

const Container = styled.div`
min-height:100px;
width: calc(85% + 30px);
margin:10px;
background: linear-gradient(burlywood, beige);
justify-content:center;
align-items: center;
`