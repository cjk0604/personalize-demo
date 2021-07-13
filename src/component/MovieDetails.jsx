import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../context/Auth.context.jsx';


import { Container, Divider, Card, Placeholder, Button, Icon, Rating } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'
import RecommendedMovieList from './RecommendationMovieList';

// 영화 상세 페이지
function MovieDetails({ id, locationState }) {
  const { state: ContextState, login } = useContext(AuthContext);
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    username,
    userId
  } = ContextState;
    const [movie, setMovie] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [recommendedMovies, setRecommendedMovies] = React.useState([]);
    const [recommendedMovies2, setRecommendedMovies2] = React.useState([]);
    // const { state } = useContext(AuthContext);
  
    // 영화 상세 페이지 이벤트 스트림
    React.useEffect(() => {
      
      async function loadDealInfo() {

        const response = await axios.get(
          `https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/movie/${id}`,
      );
       console.log((response.data));
       setMovie((response.data))
       setLoading(false);

        document.title = `${response.data.name} - DemoGo Prime`;
  
      };
      loadDealInfo();
  
      return () => {
        setMovie({});
        setLoading(true);
      };
    }, [id, locationState]);

    React.useEffect(() => {
      async function fetchData () {
        const response = await axios.get(
            `https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/recommendation/${userId}`,);
         console.log((response.data)['movies']);
        //  console.log("state.username:",username)
         setRecommendedMovies((response.data)['movies'])
        
        
      }
      fetchData();
      async function fetchData2 () {
        const response = await axios.get(
            `https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/recommendation/batch/${userId}`,);
         console.log("batch", (response.data)['movies']);
        //  console.log("state.username:",username)
         setRecommendedMovies2((response.data)['movies'])
        
        
      }
      fetchData2();
    }, []);
  
    return (
      <Container>
        <NavLink to='/'><Icon name='arrow left'/>Back to Movie list</NavLink>
        <Divider hidden/>
        <Card key={movie.id} style={{ width: '100%', maxWidth: 720, minHeight: 100, margin: 'auto' }}>
          {loading ? (
            <Placeholder fluid style={{minHeight: 320}}>
              <Placeholder.Image/>
            </Placeholder>
          ) : 
          (
            <MovieCardImage movieName={movie.name} minHeight={100} fontSize={48} imageUrl={movie.imageUrl}/>
          )}
          {loading ? (
            <Placeholder>
              <Placeholder.Line/>
              <Placeholder.Line/>          
            </Placeholder>
          ) : (
            <Card.Content>
              <Card.Header>{movie.name}</Card.Header>
              <Card.Meta><Icon name='tag'/> {movie.category}</Card.Meta>
              <Card.Description><Rating icon='star' defaultRating={4} maxRating={5} /></Card.Description>
              <Card.Header as="h1"> </Card.Header>
              <Card.Description>A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.</Card.Description>
            </Card.Content>
          )}
  
        </Card>
        <Divider hidden/>
        <RecommendedMovieList recommendedMovies={recommendedMovies} title = "실시간 추천 리스트"/>
        <RecommendedMovieList recommendedMovies={recommendedMovies2} title = "배치(Daily) 추천 리스트"/>
      </Container>
    );
  };
  
  MovieDetails.propTypes = {
    id: PropTypes.string,
    locationState: PropTypes.object
  };

  export default MovieDetails;