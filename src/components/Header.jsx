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
    filterOptions,
    handleSortOrder,
    selectedFilters,
    removeSelectedFilter,
    removeAllFilters,
  } = useContext(StarWarsContext);

  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
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
        {columns.filter(filterOptions).map(
          (column) => (
            <option key={ column } value={ column }>{column}</option>
          ),
        )}
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
        onChange={ handleSortOrder }
      >
        {columns.map(
          (column) => (
            <option key={ column } value={ column }>{column}</option>
          ),
        )}
      </select>
      <input
        name="sort"
        value="ASC"
        type="radio"
        checked={ order.sort === 'ASC' }
        data-testid="column-sort-input-asc"
        onChange={ handleSortOrder }
      />
      <input
        name="sort"
        value="DESC"
        type="radio"
        checked={ order.sort === 'DESC' }
        data-testid="column-sort-input-desc"
        onChange={ handleSortOrder }
      />
      <button
        data-testid="column-sort-button"
        onClick={ (e) => {
          e.preventDefault();
        } }
      >
        Ordenar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover filtros
      </button>
      <div>
        {selectedFilters && selectedFilters.map((filter, index) => (
          <p key={ index } data-testid="filter">
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            {' '}
            <button
              id={ index }
              onClick={ removeSelectedFilter }
            >
              remove filter
            </button>
          </p>))}
      </div>
    </form>
  );
}

export default Header;
