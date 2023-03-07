import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
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
    const sortBtn = screen.getByTestId("column-sort-button");
    const btnRemoveAllFilters = screen.getByTestId("button-remove-filters");

    expect(filterByName).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(descSort).toBeInTheDocument();
    expect(ascSort).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();
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
    const planetTest = "Hoth";

    render(
      <Provider>
        <App />
      </Provider>
    );
    const planetList = await screen.findAllByTestId("planet-name");
    const filterByName = screen.getByTestId("name-filter");
    userEvent.type(filterByName, planetTest);

    // await waitFor(() => expect(planetList).toHaveLength(1));
  });
});
