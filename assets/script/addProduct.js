const submitButton = document.querySelector('#button-submit');
const nameProduct = document.querySelector('#name');
const quantityProduct = document.querySelector('#quantity');
const priceProduct = document.querySelector('#price');
const sizeProduct = document.querySelector('#size');
const descBox = document.querySelector('#description');
const genderList = document.querySelector('#gender');
const genderCurrent = document.querySelector('#current-value-gender');
const categoryList = document.querySelector('#category');
const categoryCurrent = document.querySelector('#current-value-category');
const materialList = document.querySelector('#material');
const materialCurrent = document.querySelector('#current-value-material');
const buttonSubmit = document.querySelector('#button-submit');

const addProduct = {
    products: JSON.parse(localStorage.getItem('products')) || [],
    product: {
        id: new Date().getTime(),
        image: 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.webp',
        imageColor: [],
        category: Object.keys(CATEGORY_OPTION)[0] || null,
        gender: Object.keys(GENDER_OPTION)[0] || null,
        material: Object.keys(MATERIAL_OPTION)[0] || null,
    },

    handleEvent() {
        this.renderSelectOption({
            list: categoryList,
            option: CATEGORY_OPTION,
            currentValue: categoryCurrent,
        });
        this.renderSelectOption({
            list: genderList,
            option: GENDER_OPTION,
            currentValue: genderCurrent,
        });
        this.renderSelectOption({
            list: materialList,
            option: MATERIAL_OPTION,
            currentValue: materialCurrent,
        });

        this.changeSelect(categoryList, categoryCurrent, 'category');
        this.changeSelect(genderList, genderCurrent, 'gender');
        this.changeSelect(materialList, materialCurrent, 'material');
    },

    renderSelectOption({ list, option, currentValue }) {
        let li = ``;

        for (const key in option) {
            li += `
                <li
                    value="${key}"
                    class="dropdown-item"
                >
                    ${option[key]}
                </li>`;
        }

        currentValue.setAttribute('value', Object.keys(option)[0]);
        currentValue.innerText = Object.values(option)[0];
        list.innerHTML = li;
    },

    changeSelect(selector, currentElement, key) {
        let _this = this;

        [...selector.children].forEach((item) => {
            item.addEventListener('click', function (e) {
                let value = e.target.getAttribute('value');
                _this.product[key] = value;
                let content = e.target.textContent;
                currentElement.innerHTML = `${content}`;
                currentElement.setAttribute('value', value);
            });
        });
    },

    editProduct() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = Number.parseInt(urlParams.get('id'));

        if (!id) return;

        let index = this.products.findIndex((item) => item.id === id);

        if (index < 0) {
            alert('Không có sản phẩm này');
            goCategory();
        }

        buttonSubmit.innerText = 'Save';
        const product = this.products[index];

        nameProduct.value = product.name;
        quantityProduct.value = product.quantity;
        sizeProduct.value = product.size;
        priceProduct.value = product.price;
        description.value = product.description;
        this.changeOption(
            categoryCurrent,
            CATEGORY_OPTION,
            product.category,
            'category',
        );
        this.changeOption(
            genderCurrent,
            GENDER_OPTION,
            product.gender,
            'gender',
        );
        this.changeOption(
            materialCurrent,
            MATERIAL_OPTION,
            product.material,
            'material',
        );
    },

    changeOption(current, option, value, key) {
        current.setAttribute('value', value);
        current.innerHTML = option[value];
        this.product[key] = value;
    },

    start() {
        this.handleEvent();
        this.editProduct();
    },
};

addProduct.start();