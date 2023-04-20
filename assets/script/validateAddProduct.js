const getIdParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = Number.parseInt(urlParams.get('id'));
    return id;
};

const id = getIdParams();
let index = addProduct.products.findIndex((item) => item.id === id);