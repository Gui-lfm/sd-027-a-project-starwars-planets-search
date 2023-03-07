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

  // const sortColumns = (a, b) => {
  //   const one = 1;
  //   const { column, sort } = order;
  //   if (sort === 'ASC') {
  //     return a[column] > b[column] ? one : -one;
  //   }
  //   if (sort === 'DESC') {
  //     return a[column] < b[column] ? one : -one;
  //   }
  // };

  // renderiza a lista de planetas e atualiza de acordo com os filtros selecionados

  const searchPlanet = () => {
    const filteredPlanet = planets.filter(
      (planet) => planet.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    const filteredPlanetConditions = filteredPlanet.filter((planet) => {
      const userFilters = selectedFilters.map(
        ({ column, comparison, value }) => {
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
        },
      );
      return userFilters.every((el) => el);
    });

    return filteredPlanetConditions;
  };

  // handler dos inputs de ordenação da lista

  const handleSortOrder = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
  };

  // salva em um array o estado do formulário responsável pelo filtro selecionado

  const handleFilters = (e) => {
    e.preventDefault();
    setSelectedFilters([...selectedFilters, formData]);
    setFormData({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  // implementa a lógica que impede o uso de filtros repetidos

  const filterOptions = (option) => !selectedFilters.find(
    (filter) => option === filter.column,
  );

  // remove o filtro numérico selecionado

  const removeSelectedFilter = (e) => {
    e.preventDefault();
    const selectedFilter = selectedFilters[e.target.id];
    setSelectedFilters(selectedFilters.filter((filter) => filter !== selectedFilter));
  };

  // remove todos os filtros numéricos

  const removeAllFilters = (e) => {
    e.preventDefault();
    setSelectedFilters([]);
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
    filterOptions,
    handleSortOrder,
    selectedFilters,
    removeSelectedFilter,
    removeAllFilters,
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
