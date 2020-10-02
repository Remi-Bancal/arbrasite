import React , {useState , useEffect} from 'react';
import { ParasiteList } from '../ParasiteList';
import styled from 'styled-components';

function ListEdit() {

    const [parasiteList, setParasiteList] = useState([])
    const [selected, setSelected] = useState(1)

    useEffect(() => {
        async function fetchData () {
            await fetch("parasites")
            .then(response => response.json())
            .then(json =>  setParasiteList(json))  
        }
        fetchData()
    }, [])

    if (parasiteList.length === 0) {
        return <div />
    }
    return (
        <Container>
            <ParasiteList parasites={parasiteList} selected={selected} setSelected={setSelected}/>
        </Container>
        
    );  
}


export { ListEdit }; 

const Container = styled.div`
display: flex;
`