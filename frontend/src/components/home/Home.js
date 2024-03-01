import React from 'react';
import Hero from '../hero/Hero';

const Home = ({movies}) => {
  return (
    <div>
        {movies && <Hero movies={movies} />}

    </div>
  )
}

export default Home;