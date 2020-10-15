import React from 'react'
import { DisplayMushroom } from './DisplayParasite'
import { ParasiteList } from '../ParasiteList'
import styled from 'styled-components'

function ListView(props) {

    if (props.parasiteList.length === 0) {
        return <div />
    }
    return (
        <Container>
            <ParasiteList parasites={props.parasiteList} selected={props.selected} setSelected={props.setSelected}/>
            <DisplayMushroom parasite={props.parasiteList[props.selected-1]} />
        </Container>
        
    )  
}


export { ListView } 

const Container = styled.div`
display: flex;
`