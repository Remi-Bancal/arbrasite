import React , {useState, useEffect} from 'react'
import styled from 'styled-components'

function EssenceForm() {

    const [name, setName] = useState("")
    const [latinName, setLatinName] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: name,
                latin_name: latinName,
             })
        }
        fetch('tree_essence', requestOptions)
    }

        return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
            <TitleLabel>Ajouter une essence d'arbre: </TitleLabel>
                <FormLabel>Nom vernaculaire: </FormLabel>
                <input type="text" value={name} placeholder="Nom français" onChange={e => setName(e.target.value)} />

                <FormLabel> Nom latin : </FormLabel>
                <input type="text" value={latinName} placeholder="Nom latin" onChange={e => setLatinName(e.target.value)} />

                <SubmitButton type="submit" value="Envoyer"/>
            </form>
         </FormContainer>
        )
}

function EssenceList() {

    const [essenceList, setEssenceList] = useState([])

    useEffect(() => {
        async function fetchData () {
            await fetch("tree_essences")
            .then(response => response.json())
            .then(json =>  setEssenceList(json))  
        }
        fetchData()
    }, [])

        return (
            <>{essenceList.map( (essence , index) => (
                <Essence item={essence} key={index}/>
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
        }
        const url = 'tree_essence/' + parseInt(props.essence_id);
        fetch(url, requestOptions)
    }

        return (
          <DelButton onClick={handleSubmit} type="button" >Delete</DelButton>
        )
}

function Essence(props) {
        return (
            <StyledDiv>
                <ValueDiv>{props.item.latin_name} ({props.item.name})</ValueDiv>
                <DeleteButton essence_id={props.item.id}/>
            </StyledDiv>
        )
}

export { EssenceList , EssenceForm } 

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
