import React , {useState , useEffect} from 'react';
import styled from 'styled-components';

function ParasiteList() {

    const [parasiteList, setParasiteList] = useState([])
    const [selected, setSelected] = useState(1)

    useEffect(() => {
        const url = "parasites"
        const response = fetch("parasites")
        .then(response => response.json())
        .then(json =>  setParasiteList(json))
    }, [])

    return (
        <Container>
        <TitleDiv>Liste des champignons</TitleDiv>
        {parasiteList.map((parasite , index) => (
            <Item selected={parasite.id === selected}
                  key={index} 
                  onClick={()=>setSelected(index+1)}>
              {parasite.latin_name} ({parasite.name})
            </Item>
        ))}
        </Container>
    );  
}

export { ParasiteList }; 

const Container = styled.div`
margin-left: auto;
margin-right: auto;
width: 15%;
position: absolute;
left:0%;
float:none;
margin: 10px;
background: beige;
border: 1px solid olive;
border-top: 2px solid olive;
padding: 2px 2px 2px 2px;
`

const Item = styled.div`
  background-color: ${props => (props.selected ? 'burlywood' : 'beige')};
  cursor: pointer;
  display: flex;
  padding: 2px 5px 2px 5px;
  border: ${props => (props.selected ? '2px solid olive' : '1px solid olive')};
  margin: 4px;
  color: marroon;
  &:hover {
    background-color: ${props => (props.selected ? 'burlywood' : 'antiquewhite')};
  }
  float:left;
`;

const TitleDiv = styled.div`
    display: flex;
    float:left;
    width:100%;
    background: linear-gradient(to right, burlywood, rgba(0,0,0,0));
    padding: 2px 5px 2px 5px;
    border-bottom: 2px solid olive;
    font-weight: bold;
    color: marroon;
`