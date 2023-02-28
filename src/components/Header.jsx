import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const { setSearchInput, searchInput } = useContext(StarWarsContext);
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
        // value={ formData.column }
        data-testid="column-filter"
        // onChange={ handleChange }
      >
        <option>population</option>
        <option>orbital period</option>
        <option>diameter</option>
        <option>rotation period</option>
        <option>surface water</option>
      </select>
      <select
        name="comparison"
        // value={ formData.comparison }
        data-testid="comparison-filter"
        // onChange={ handleChange }
      >
        <option>Maior que</option>
        <option>Menor que</option>
        <option>Igual a</option>
      </select>
      <input
        name="value"
        // value={ formData.value }
        data-testid="value-filter"
        type="number"
        // onChange={ handleChange }
      />
      <button data-testid="button-filter">
        Filtrar
      </button>
    </form>
  );
}

export default Header;
