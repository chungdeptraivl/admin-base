const submitButton = document.querySelector('#button-submit');
const nameProduct = document.querySelector('#name');
const priceProduct = document.querySelector('#price');
const sizeProduct = document.querySelector('#size');
const descBox = document.querySelector('#description');
const materialList = document.querySelector('#material');
const materialCurrent = document.querySelector('#current-value-material');
const buttonSubmit = document.querySelector('#button-submit');

const addProduct = {
    products: CATEGORIES,
    product: {
        id: new Date().getTime(),
        image: '',
        imageColor: [],
        material: Object.keys(MATERIAL_OPTION)[0] || null,
    },

    handleEvent() {
        this.renderSelectOption({
            list: materialList,
            option: MATERIAL_OPTION,
            currentValue: materialCurrent,
        });

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
            alert('Không có category này');
            goCategory();
        }

        buttonSubmit.innerText = 'Save';
        const product = this.products[index];

        nameProduct.value = product.name;
        priceProduct.value = product.price;
        description.value = product.description;
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
