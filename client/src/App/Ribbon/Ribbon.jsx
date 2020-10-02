import React from 'react';
import styled from 'styled-components';

const RibbonState = {
    VIEW:"view",
    EDIT:"edit"
};


function Ribbon(props) {

    return (
        <Container>
            <RibbonButton onClick={()=>props.setSelected(RibbonState.VIEW)} selected={props.selected === RibbonState.VIEW}>Vue liste</RibbonButton>
            <RibbonButton onClick={()=>props.setSelected(RibbonState.EDIT)} selected={props.selected === RibbonState.EDIT}>Edition</RibbonButton>
        </Container>
    );  
}

export { Ribbon , RibbonState }; 

const RibbonButton = styled.div`
background-color: ${props => (props.selected ? 'burlywood' : 'beige')};
cursor: pointer;
padding: 2px 5px 2px 5px;
border: ${props => (props.selected ? '2px solid olive' : '1px solid olive')};
margin: 4px;
min-height:70px;
min-width:70px;
color: marroon;
&:hover {
  background-color: ${props => (props.selected ? 'burlywood' : 'antiquewhite')};
}
float:left;
`;

const Container = styled.div`
min-height:100px;
width: calc(85% + 30px);
margin:10px;
background: linear-gradient(burlywood, beige);
border: 1px solid olive;
border-top: 2px solid olive;
justify-content:center;
align-items: center;
`