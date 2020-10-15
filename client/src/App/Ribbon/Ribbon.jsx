import React from 'react'
import styled from 'styled-components'

const RibbonState = {
    VIEW:"view",
    EDIT:"edit",
    ADD:"add"
};


function Ribbon(props) {

    return (
        <Container>
            <RibbonButton onClick={()=>props.setMenu(RibbonState.VIEW)} menu={props.menu === RibbonState.VIEW}>Vue liste</RibbonButton>
            <RibbonButton onClick={()=>props.setMenu(RibbonState.EDIT)} menu={props.menu === RibbonState.EDIT}>Edition</RibbonButton>
            <RibbonButton onClick={()=>props.setMenu(RibbonState.ADD)} menu={props.menu === RibbonState.ADD}>Ajout arbre/champignon</RibbonButton>
        </Container>
    )  
}

export { Ribbon , RibbonState }; 

const RibbonButton = styled.div`
background-color: ${props => (props.menu ? 'burlywood' : 'beige')};
cursor: pointer;
padding: 2px 5px 2px 5px;
border: ${props => (props.menu ? '2px solid olive' : '1px solid olive')};
margin: 4px;
min-height:70px;
min-width:70px;
color: marroon;
&:hover {
  background-color: ${props => (props.menu ? 'burlywood' : 'antiquewhite')};
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