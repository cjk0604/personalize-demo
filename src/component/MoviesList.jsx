import React from 'react';
import axios from 'axios';


import { Container } from 'semantic-ui-react'

import MoviesListCardGroup from './MoviesListCardGroup';

function MoviesList() {
    const [movies, setMovies] = React.useState([]);
    // const [movies, setMovies] = React.useState([]);

    // DynamoDB에 저장된 모든 영화 정보를 불러옵니다 (GET)
    // get_movie_url을 CloudFormation을 통해 생성된 API Gateway 엔드포인트로 변경하셔야 합니다.
    const get_movie_url = 'https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/movie'
    React.useEffect(() => {
      async function fetchData () {
        const response = await axios.get(
          get_movie_url,);
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