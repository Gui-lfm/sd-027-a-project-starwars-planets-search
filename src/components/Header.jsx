import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const {
    setSearchInput,
    searchInput,
    formData,
    handleFormData,
    handleFilters,
  } = useContext(StarWarsContext);
  return (
    <form>
      <h1>Star wars Planet Search - Trybe</h1>
      <input
        name="planetName"
        value={ searchInput }
        data-testid="name-filter"
        type="text"
        onChange={ (event) => setSearchInput(event.target.value) }
      />
      <select
        name="column"
        value={ formData.column }
        data-testid="column-filter"
        onChange={ handleFormData }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparison"
        value={ formData.comparison }
        data-testid="comparison-filter"
        onChange={ handleFormData }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        value={ formData.value }
        data-testid="value-filter"
        type="number"
        onChange={ handleFormData }
      />
      <button data-testid="button-filter" onClick={ handleFilters }>
        Filtrar
      </button>
    </form>
  );
}

export default Header;
