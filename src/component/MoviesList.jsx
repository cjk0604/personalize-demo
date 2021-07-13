import React from 'react';
import axios from 'axios';


import { Container } from 'semantic-ui-react'

import MoviesListCardGroup from './MoviesListCardGroup';

function MoviesList() {
    const [movies, setMovies] = React.useState([]);
    // const [movies, setMovies] = React.useState([]);
  
    React.useEffect(() => {
      async function fetchData () {
        const response = await axios.get(
            'https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/movie',);
         console.log((response.data)['movies']);
         setMovies((response.data)['movies'])
        
        
      }
      fetchData();
    }, []);
    
  
    document.title = 'DemoGo Prime';
    return (
      <Container style={{ marginTop: 70 }}>
        <MoviesListCardGroup items={movies} pageViewOrigin='Browse'/>
      </Container>
    );
  };

  export default MoviesList;