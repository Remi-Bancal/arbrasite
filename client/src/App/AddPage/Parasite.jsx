import React , { useState } from 'react'
import styled from 'styled-components'

function ParasiteForm(props) {

    const [name, setName] = useState("")
    const [latinName, setLatinName] = useState("")
    const [rottenness, setRottenness] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: name,
                latin_name: latinName,
                rottenness: rottenness === "rouge"
             })
        }
        fetch('parasite', requestOptions)
        .then(response=>response.json())
        .then((json) =>{
            const newList = props.parasiteList.concat(json)
            props.setParasiteList(newList) 
            setName("")
            setLatinName("")
            setRottenness("")
        })
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
            <TitleLabel>Ajouter un champignon: </TitleLabel>
                <FormLabel>Nom vernaculaire: </FormLabel>
                <input type="text" value={name} placeholder="Nom français" onChange={e => setName(e.target.value)} />

                <FormLabel> Nom latin : </FormLabel>
                <input type="text" value={latinName} placeholder="Nom latin" onChange={e => setLatinName(e.target.value)} />

                <select id="rottenness" name="rottenness" value={rottenness} onChange={e => setRottenness(e.target.value)}>
                    <option value="rouge">Rouge</option>
                    <option value="blanche">Blanche</option>
                </select>
                <SubmitButton type="submit" value="Envoyer"/>
            </form>
         </FormContainer>
    )
}

function ParasiteLists(props) {

        return (
            <>{props.parasiteList.map((parasite, index) => (
                    <Parasite item={parasite} key={index} list={props.parasiteList} setList={props.setParasiteList}/>
                ))}
            </>
        )  
}

function DeleteButton (props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simple DELETE request with a JSON body using fetch
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = 'parasite/' + parseInt(props.parasite_id);
        fetch(url, requestOptions)
        .then(response=>response.json())
        .then((json) =>{
            const newList = props.list.filter((item) => item.id !== json.id)
            props.setList(newList) 
        })
    }

        return (
          <DelButton onClick={handleSubmit} type="button" >Delete</DelButton>
        )
}

function Parasite (props) {
        return (
            <StyledDiv>
                <ValueDiv>{props.item.latin_name} ({props.item.name})</ValueDiv>
                <DeleteButton parasite_id={props.item.id} list={props.list} setList={props.setList}/>
            </StyledDiv>
        )
}

export { ParasiteLists , ParasiteForm } 

const StyledDiv = styled.div`
display:flex;
    justify-content: space-between;
    margin: 3px 3px 3px 3px;
    background: beige;
    padding: 5px 5px 2px 5px;
`

const ValueDiv = styled.div`
    margin: 3px 3px 3px 3px;
`

const FormContainer = styled.div`
    background: burlywood;
    padding: 2px 2px 2px 2px;
    border-top: 2px solid olive;
`

const TitleLabel = styled.label`
background: linear-gradient(to right, burlywood, beige);
padding: 2px 10px 2px 5px;
margin: 3px 0px 3px 0px;
font-weight: bold;
`

const FormLabel = styled.label`
padding: 2px 0px 2px 5px;
`

const SubmitButton = styled.input`
margin: 0px 3px 0px 3px;
background: ivory;
font-weight: bold;
border: 2px solid olive;
color: #787878;
`

const DelButton = styled.button`
background: burlywood;
font-weight: bold;
border: 1px solid olive;
color: #787878;
`
