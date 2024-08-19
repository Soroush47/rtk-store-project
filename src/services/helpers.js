const filterHandler = (value, param, searchParams) => {
    value !== param && dispatch({ type: param.toUpperCase(), payload: value });
    value === ""
        ? searchParams.delete("param")
        : searchParams.set("param", value.toLowerCase());
    return searchParams;
};
