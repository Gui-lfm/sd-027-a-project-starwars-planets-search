import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const {
    setSearchInput,
    searchInput,
    formData,
    handleFormData,
    handleFilters,
    order,
    setOrder,
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
      <select
        name="column"
        data-testid="column-sort"
        value={ order.column }
        onChange={ (e) => setOrder({ ...order, [e.target.name]: e.target.value }) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <input
        name="order"
        value="ASC"
        type="radio"
        checked={ order.sort === 'ASC' }
        data-testid="column-sort-input-asc"
        onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
      />
      <input
        name="order"
        value="DESC"
        type="radio"
        checked={ order.sort === 'DESC' }
        data-testid="column-sort-input-desc"
        onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
      />
      <button data-testid="column-sort-button">Ordernar</button>
      {/* <div>
        {selectedFilters && selectedFilters.map(
          (filter) => (
            <p key={ filter.column } data-testid="filter">
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>),
        )}
      </div> */}
    </form>
  );
}

export default Header;
