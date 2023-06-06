import React, { useContext, createContext, useEffect, useReducer } from "react";

const dataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case "toggleLoading":
      return { ...state, loading: !state.loading };
    case "retrieveData":
      return { ...state, data: action.payload };
    case "retrieveCategory":
      return { ...state, categories: action.payload };

    case "searchFilter":
      return { ...state, searchFilter: action.payload };
    case "sliderInput": {
      return { ...state, ratingFilter: action.payload };
    }
    case "sortFilter": {
      return { ...state, sortFilter: action.payload };
    }
    case "checkboxFilter": {
      const value = action.payload;

      if (state.checkbox.includes(value)) {
        return {
          ...state,
          checkbox: state.checkbox.filter((element) => element !== value),
        };
      } else {
        return { ...state, checkbox: [...state.checkbox, value] };
      }
    }
    case "singleCheckBoxFilter": {
      return { ...state, checkbox: [action.payload] };
    }
    case "productData": {
      return { ...state, productData: action.payload };
    }
    case "resetAll":
      return {
        ...state,
        searchFilter: "",
        ratingFilter: 0,
        sortFilter: null,
        checkbox: [],
      };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    data: [],
    categories: [],
    searchFilter: "",
    ratingFilter: 0,
    sortFilter: null,
    checkbox: [],
    productData: {},
    loading: false,
  });
  const getData = async () => {
    try {
      dispatch({ type: "toggleLoading" });
      const resultData = await fetch("/api/products");
      const categoryData = await fetch("/api/categories");
      if (categoryData.status === 200) {
        const cdata = await categoryData.json();
        dispatch({ type: "retrieveCategory", payload: cdata.categories });
      }
      if (resultData.status === 200) {
        const ddata = await resultData.json();
        dispatch({ type: "retrieveData", payload: ddata.products });
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: "toggleLoading" });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const searchData =
    state.searchFilter !== ""
      ? state.data.filter(({ name }) =>
          name.toLowerCase().includes(state.searchFilter.toLowerCase())
        )
      : state.data;
  const ratingData =
    state.ratingFilter > 0
      ? searchData.filter(({ rating }) => rating >= state.ratingFilter)
      : searchData;
  const sortData = state.sortFilter
    ? ratingData.toSorted((a, b) =>
        state.sortFilter === "low_to_high"
          ? a.price - b.price
          : b.price - a.price
      )
    : ratingData;
  const filterData =
    state.checkbox.length > 0
      ? sortData.filter(({ category }) =>
          state.checkbox.some((element) => {
            return element.toLowerCase().includes(category.toLowerCase());
          })
        )
      : sortData;
  const getProductData = async (item_id) => {
    console.log("getProductData");
    try {
      const result = await fetch(`/api/products/${item_id}`);
      console.log(result);
      if (result.status === 200) {
        const { product } = await result.json();
        dispatch({ type: "productData", payload: product });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <dataContext.Provider
      value={{ state, dispatch, filterData, getProductData }}
    >
      {children}
    </dataContext.Provider>
  );
};
export const useData = () => useContext(dataContext);
