import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import Provider from "../context/StarWarsProvider";
import mockApi from "../mock/mock";
import userEvent from "@testing-library/user-event";

describe("Testes da aplicação", () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockApi,
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it("Deve possuir um formulário com as opções de filtros disponíveis", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    const filterByName = screen.getByTestId("name-filter");
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const btnFilter = screen.getByTestId("button-filter");
    const columnSort = screen.getByTestId("column-sort");
    const descSort = screen.getByTestId("column-sort-input-desc");
    const ascSort = screen.getByTestId("column-sort-input-asc");
    const btnRemoveAllFilters = screen.getByTestId("button-remove-filters");

    expect(filterByName).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(descSort).toBeInTheDocument();
    expect(ascSort).toBeInTheDocument();
    expect(columnSort).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(btnRemoveAllFilters).toBeInTheDocument();
  });

  it("Ao inicializar, faz uma chamada à API que popula a tabela de planetas", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://swapi.dev/api/planets");

    const planetList = await screen.findAllByTestId("planet-name");
    expect(planetList.length).toBe(10);
  });
  it("Ao digitar um nome no campo de busca, a lista é filtrada", async () => {
    const nameTest = "oo";

    render(
      <Provider>
        <App />
      </Provider>
    );

    const filterByName = screen.getByTestId("name-filter");
    userEvent.type(filterByName, nameTest);

    expect(await screen.findAllByTestId("planet-name")).toHaveLength(2);
  });
  it("Ao selecionar um filtro numérico, a tabela é alterada", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    //orbital_period maior que 400

    const columnInput = "orbital_period";
    const comparisonInput = "maior que";
    const valueInput = "400";

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const btnFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, columnInput);
    userEvent.selectOptions(comparisonFilter, comparisonInput);
    userEvent.type(valueFilter, valueInput);
    userEvent.click(btnFilter);

    expect(await screen.findAllByTestId("planet-name")).toHaveLength(5);
  });
  it("A aplicação permite múltiplos filtros que não podem ser repetidos", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    //orbital_period maior que 400
    
    const columnInput = "orbital_period";
    const comparisonInput = "maior que";
    const valueInput = "400";
    
    // Diameter menor que 10000.
    
    const columnInput2 = "diameter";
    const comparisonInput2 = "menor que";
    const valueInput2 = "10000";

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const btnFilter = screen.getByTestId("button-filter");

    // primeiro filtro aplicado

    userEvent.selectOptions(columnFilter, columnInput);
    userEvent.selectOptions(comparisonFilter, comparisonInput);
    userEvent.type(valueFilter, valueInput);
    userEvent.click(btnFilter);

    // segundo filtro aplicado 
    
    userEvent.selectOptions(columnFilter, columnInput2);
    userEvent.selectOptions(comparisonFilter, comparisonInput2);
    userEvent.type(valueFilter, valueInput2);
    userEvent.click(btnFilter);

    expect(await screen.findAllByTestId("planet-name")).toHaveLength(2);
    expect(await screen.findAllByTestId("filter")).toHaveLength(2);
    const options = await within(columnFilter).findAllByRole('option');
    expect(options).toHaveLength(3);
  });

  it('É possivel remover um filtro criado pelo usuário', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    
    const columnInput = "orbital_period";
    const comparisonInput = "maior que";
    const valueInput = "400";

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const btnFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, columnInput);
    userEvent.selectOptions(comparisonFilter, comparisonInput);
    userEvent.type(valueFilter, valueInput);
    userEvent.click(btnFilter);

    const filter = await screen.findByTestId("filter");
    expect(filter).toBeInTheDocument();
    
    const removeFilterBtn = within(filter).getByRole('button', {name: 'remove filter'});
    userEvent.click(removeFilterBtn);
    expect(await screen.findAllByTestId("planet-name")).toHaveLength(10);
  })

  it('É possível remover todos os filtros aplicados', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    //orbital_period maior que 400
    
    const columnInput = "orbital_period";
    const comparisonInput = "maior que";
    const valueInput = "400";
    
    // Diameter menor que 10000.
    
    const columnInput2 = "diameter";
    const comparisonInput2 = "menor que";
    const valueInput2 = "10000";

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const btnFilter = screen.getByTestId("button-filter");

    // primeiro filtro aplicado

    userEvent.selectOptions(columnFilter, columnInput);
    userEvent.selectOptions(comparisonFilter, comparisonInput);
    userEvent.type(valueFilter, valueInput);
    userEvent.click(btnFilter);

    // segundo filtro aplicado 
    
    userEvent.selectOptions(columnFilter, columnInput2);
    userEvent.selectOptions(comparisonFilter, comparisonInput2);
    userEvent.type(valueFilter, valueInput2);
    userEvent.click(btnFilter);

    const btnRemoveAllFilters = screen.getByTestId("button-remove-filters");
    userEvent.click(btnRemoveAllFilters);
    expect(await screen.findAllByTestId("planet-name")).toHaveLength(10);
  })
});
