import React , {useState, useEffect} from 'react'
import styled from 'styled-components'
import { ListView , Ribbon , ListEdit , AddView } from '.'
import { RibbonState } from './Ribbon/Ribbon'

function App() {

    const [menu, setMenu] = useState(RibbonState.VIEW)
    const [parasiteList, setParasiteList] = useState([])
    const [selectedParasite, setSelectedParasite] = useState(1)

    useEffect(() => {
        async function fetchData () {
            await fetch("parasites")
            .then(response => response.json())
            .then(json =>  setParasiteList(json))  
        }
        fetchData()
    }, [])

    return (
    <GlobalContainer>
        <Container>
            <Ribbon menu={menu} setMenu={setMenu}/>
            {menu === RibbonState.VIEW && <ListView selected={selectedParasite} setSelected={setSelectedParasite} parasiteList={parasiteList}/>}
            {menu === RibbonState.EDIT && <ListEdit selected={selectedParasite} setSelected={setSelectedParasite} parasiteList={parasiteList}/>}
            {menu === RibbonState.ADD && <AddView parasiteList={parasiteList} setParasiteList={setParasiteList}/>}
        </Container>
    </GlobalContainer>
    )
}

export { App } 


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
