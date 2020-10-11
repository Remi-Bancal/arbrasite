import React from 'react';
import styled from 'styled-components';

function ParasiteList( props ) {

    return (
        <Container>
        <TitleDiv>Liste des champignons</TitleDiv>
        {props.parasites.map((parasite , index) => (
            <Item selected={parasite.id === props.selected}
                  key={index} 
                  onClick={()=>props.setSelected(index+1)}>
              {parasite.latin_name} ({parasite.name})
            </Item>
        ))}
        </Container>
    );  
}

export { ParasiteList }; 

const Container = styled.div`
width: 15%;
margin: 10px 10px 10px 10px;
background: beige;
border: 1px solid olive;
border-top: 2px solid olive;
padding: 2px 2px 2px 2px;
`

const Item = styled.div`
  background-color: ${props => (props.selected ? 'burlywood' : 'beige')};
  cursor: pointer;
  padding: 2px 5px 2px 5px;
  border: ${props => (props.selected ? '2px solid olive' : '1px solid olive')};
  margin: 4px;
  &:hover {
    background-color: ${props => (props.selected ? 'burlywood' : 'antiquewhite')};
  }
  float:left;
`;

const TitleDiv = styled.div`
    float:left;
    width:100%;
    background: linear-gradient(to right, burlywood, rgba(0,0,0,0));
    padding: 2px 0px 2px 0px;
    border-bottom: 2px solid olive;
    font-weight: bold;
`