import React from 'react';
import styled from 'styled-components';
import { GalleryComponent , MainImage } from './Photo';

class DisplayMushroom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '', 
            latinname:'', 
            rottenness:'', 
            observations:[], 
            photo:''}
    }

    async componentDidMount() {
        const url_obs = "observations/from_parasite/" + this.props.obj_id ;
        const response_obs = await fetch(url_obs);
        const data_obs = await response_obs.json();
        this.setState({observations: data_obs});
        const url_para = "parasite/" + this.props.obj_id ;
        const response_para = await fetch(url_para);
        const data_para = await response_para.json();
        this.setState({name: data_para.name, latinname:data_para.latin_name, rottenness:data_para.rottenness});
    }

    render() {
        return (
            <Container>
                <StyledDiv>
                <TitleLabel>{this.state.latinname} ({this.state.name})</TitleLabel>
                <ValueDiv>Pourriture {this.state.rottenness ? 'rouge' : 'blanche'}</ValueDiv>
                <ParagraphLabel>Essences rencontrées</ParagraphLabel>
                <div>
                    {this.state.observations.map(observation => (
                        <ValueDiv key={observation.id}>{observation["essence.latin_name"]} ({observation["essence.name"]})</ValueDiv>))}
                </div>
                </StyledDiv>
                <ImageContainer>
                <MainImage filename="f9a82c73-e4e6-4183-a2e8-5764aca22ae1.jpg" />
                </ImageContainer>
                <GalleryContainer>
                    <TitleLabel>Photos</TitleLabel>
                        {this.state.observations.map(observation => (
                            <Observation key={observation.id} obs_id={observation.id}/>))}
                    </GalleryContainer>
            </Container>
        );  
    }
}

class Observation extends React.Component {
    constructor(props){
        super(props);
        this.state = { photos:[] };
      }

    async componentDidMount() {
        const url = "photos/" + this.props.obs_id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({photos: data});
    }

    render() {
        return (
            <div>
                {this.state.photos.map(photo => (
                    <GalleryComponent key={photo.id} filename={photo.filename} />))}
            </div>
        );
    }
}

export { DisplayMushroom }; 

const Container = styled.div`
margin-left: auto;
margin-right: auto;
width: 65%;
position: absolute;
left:20%;
float:none;
margin: 10px;
background: beige;
border: 1px solid olive;
border-top: 2px solid olive;
padding: 2px 2px 2px 2px;
`
const GalleryContainer = styled.div`
width: 100%;
height: 70%;
float: left;
display: inline-block;
background: linear-gradient(burlywood, beige);
border-top: 2px solid olive;
padding: 5px 5px 2px 5px;
`
const ImageContainer = styled.div`
width: 50%;
height: 70%;
float: right;
display: inline-block;
`

const StyledDiv = styled.div`
    background: linear-gradient(burlywood, beige);
    display: inline-block;
    height: 20%;
    width: 50%;
    padding: 5px 5px 2px 5px;
`

const ValueDiv = styled.div`
    display: flex;
    float:left;
    background: burlywood;
    padding: 2px 5px 2px 5px;
    color: marroon;
`
const TitleLabel = styled.div`
    display: inline-block;
    height: 20%;
    width: 100%;
    background: beige;
    border-bottom: 1px solid olive;
    border-left: 1px solid olive;
    padding: 2px 2px 2px 2px;
    margin: 0px 0px 10px 0px;
    color: marroon;
    font-weight: bold;
`

const ParagraphLabel = styled.div`
    display: inline-block;
    height: 20%;
    width: 100%;
    background: linear-gradient(to right, beige, rgba(0,0,0,0));
    border-left: 1px solid olive;
    margin: 10px 0px 10px 0px;
    padding: 2px 2px 2px 2px;
    color: marroon;
`
