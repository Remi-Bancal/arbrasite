import React , {useState , useEffect} from 'react'
import styled from 'styled-components'
import { GalleryComponent , MainImage } from '../Photo'

function DisplayMushroom(props) {

    const [observations, setObservations] = useState([])

    useEffect(() => {
        async function fetchData() {
            await fetch("observations/from_parasite/" + props.parasite.id)
            .then(response => response.json())
            .then(json =>  setObservations(json))
        }
        fetchData()
        }, [props])

    return (
        <Container>
            <DescriptionContainer>
                <StyledDiv>
                    <TitleLabel>{props.parasite.latin_name} ({props.parasite.name})</TitleLabel>
                    <ValueDiv>Pourriture {props.parasite.rottenness ? 'rouge' : 'blanche'}</ValueDiv>
                    <ParagraphLabel>Essences rencontrées</ParagraphLabel>
                    <div>
                        {observations.map(observation => (
                        <ValueDiv key={observation.id}>{observation["essence.latin_name"]} ({observation["essence.name"]})</ValueDiv>))}
                    </div>
                </StyledDiv>
                <ImageContainer>
                    <MainImage filename="f9a82c73-e4e6-4183-a2e8-5764aca22ae1.jpg" />
                </ImageContainer>
            </DescriptionContainer>
            <GalleryContainer>
                <TitleLabel>Photos</TitleLabel>
                    {observations.map(observation => (
                        <Observation key={observation.id} obs_id={observation.id}/>))}
                </GalleryContainer>
        </Container>
    )  
}

function Observation (props) {

    const [photos, setPhotos] = useState([])
    const [bigImage, setBigImage] = useState(0)

    useEffect(() => {
        async function fetchData() {
            await fetch("photos/" + props.obs_id)
            .then(response => response.json())
            .then(json =>  setPhotos(json))
        }
        fetchData()
        }, [props])

    return (
        <div>
            {photos.map(photo => (
                <GalleryComponent key={photo.id} 
                    filename={photo.filename} 
                    big={bigImage} 
                    img={photo.id} 
                    setBig={setBigImage} />))}
        </div>
    )
}

export { DisplayMushroom }

const Container = styled.div`
width: 70%;
margin: 10px;
background: beige;
border: 1px solid olive;
border-top: 2px solid olive;
padding: 2px 2px 2px 2px;
`

const DescriptionContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`

const GalleryContainer = styled.div`
width: 100%;
float: left;
background: linear-gradient(burlywood, beige);
border-top: 2px solid olive;
`
const ImageContainer = styled.div`
width: 50%;
`

const StyledDiv = styled.div`
    background: linear-gradient(burlywood, beige);
    width: 50%;
    padding: 5px 5px 2px 5px;
    flex-direction: column;
`

const ValueDiv = styled.div`
    background: burlywood;
    padding: 2px 5px 2px 5px;
`
const TitleLabel = styled.div`
    height: 20px;
    background: beige;
    border-bottom: 1px solid olive;
    border-left: 1px solid olive;
    padding: 2px 2px 2px 2px;
    margin: 0px 0px 10px 0px;
    font-weight: bold;
`

const ParagraphLabel = styled.div`
    height: 20px;
    background: linear-gradient(to right, beige, rgba(0,0,0,0));
    border-left: 1px solid olive;
    margin: 10px 0px 10px 0px;
    padding: 2px 2px 2px 2px;
`
