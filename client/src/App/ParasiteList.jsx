import React , {useState} from 'react';
import styled from 'styled-components';

class ParasiteList extends React.Component {
    constructor(props){
        super(props);
        this.state = {parasiteList: [], selected:1}
    }

    async componentDidMount() {
        const url = "parasites"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({parasiteList: data});
    }

    render() {
        return (
            <Container>
            <TitleDiv>Liste des champignons</TitleDiv>
            {this.state.parasiteList.map(parasite => (
                <Parasite selected={parasite.id === this.state.selected}
                  item={parasite} key={parasite.id}
                />
            ))}
            </Container>
        );  
    }

}

class Parasite extends React.Component {
    render() {
        return (
            <Item selected = {this.props.selected}>{this.props.item.latin_name} ({this.props.item.name})</Item>
        );      
    }
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