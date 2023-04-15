const getIdParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = Number.parseInt(urlParams.get('id'));
    return id;
};

const id = getIdParams();
let index = addProduct.products.findIndex((item) => item.id === id);

Validator({
    form: '#add-product',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    currentData: addProduct.product,
    rules: [
        Validator.isRequired('#name'),
        Validator.isRequired('#size'),
        Validator.isRequired('#quantity'),
        Validator.minValue('#quantity', 1),
        Validator.isRequired('#price'),
        Validator.minValue('#price', 1000),
        Validator.isRequired('#description'),
        Validator.maxLength('#description', 100),
    ],
    onSubmit(data, currentData) {
        const productInfo = { ...currentData, ...data };
        if (id) {
            addProduct.products[index] = productInfo;
            setItemLocalStorage('products', addProduct.products);
            goCategory();
        } else {
            addProduct.products.unshift(productInfo);
            setItemLocalStorage('products', addProduct.products);
            goCategory();
        }
    },
});