import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [formData, setFormData] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
    const filteredPlanetConditions = filteredPlanet.filter((planet) => {
      const userFilters = selectedFilters.map(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          return Number(planet[column]) > Number(value);
        case 'menor que':
          return Number(planet[column]) < Number(value);
        case 'igual a':
          return Number(planet[column]) === Number(value);
        default:
          return true;
        }
      });
      return userFilters.every((el) => el);
    });

    return filteredPlanetConditions;
  };

  const handleFilters = (e) => {
    e.preventDefault();
    setSelectedFilters([...selectedFilters, formData]);
    setFormData({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  const sortColumns = (a, b) => {
    const one = 1;
    const { column, sort } = order;
    if (column !== 'population') {
      if (sort === 'ASC') {
        return Number(a[column]) - Number(b[column]);
      } if (sort === 'DESC') {
        return (Number(a[column]) - Number(b[column])) * (-one);
      }
    }
    if (sort === 'ASC') {
      return (a[column] > b[column]) ? one : -one;
    } if (sort === 'DESC') {
      return (a[column] < b[column]) ? one : -one;
    }
  };

  const context = {
    planets,
    formData,
    handleFormData,
    searchInput,
    setSearchInput,
    searchPlanet,
    handleFilters,
    order,
    setOrder,
    sortColumns,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.elementType).isRequired,
};

export default Provider;
