import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [formData, setFormData] = useState({
    column: 'population',
    comparison: 'Maior que',
    value: 0,
  });

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => data.results)
      .then((info) => setPlanets(info.map(({ residents, ...rest }) => ({ ...rest }))));
  }, []);

  const searchPlanet = () => {
    const filteredPlanet = planets.filter(
      (planet) => planet.name.toLowerCase().includes(searchInput.toLowerCase()),
    );

    return filteredPlanet;
  };

  const context = {
    planets,
    formData,
    setFormData,
    searchInput,
    setSearchInput,
    searchPlanet,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.symbol).isRequired,
};

export default Provider;
