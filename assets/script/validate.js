import { Validator } from './validator.js';

const getIdParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = Number.parseInt(urlParams.get('id'));
    return id;
};

Validator({
    form: '#add-category',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#name'),
        Validator.isRequired('#price'),
        Validator.minValue('#price', 1000),
        Validator.isRequired('#description'),
        Validator.maxLength('#description', 100),
        Validator.isRequired('#url-img'),
    ],
    onSubmit(data) {
        const rs = {
            name: data.name,
            icon: data['url-img'],
        };

        console.log(rs);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post('http://localhost:8080/categories', rs, config)
            .then((response) => {
                console.log(response.data);
                goCategory();
            })
            .catch((error) => {
                console.error(error);
            });
    },
});
