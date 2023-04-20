// Sidebar
const sidebarItems = document.querySelectorAll('#sidebar ul li a');
const MATERIAL_OPTION = {
    0: 'Viet Nam',
    1: 'Thailand',
    2: 'Japan',
    3: 'Spain',
    4: 'Greece',
    5: 'India',
    6: 'France',
    7: 'Mexico',
    8: 'Italy',
    9: 'United States of America',
};

const CATEGORIES = [];

// Global function
const setItemLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};

const goCategory = () => {
    window.location.href = `${window.location.origin}/category.html`;
};

let categories = [];

// Validator
function Validator(options) {
    let selectorRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    function validate(inputElement, rule) {
        let errorElement = getParent(
            inputElement,
            options.formGroupSelector,
        ).querySelector(options.errorSelector);
        let errorMessage;
        let rules = selectorRules[rule.selector];

        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);

            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(
                'invalid',
            );
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove(
                'invalid',
            );
        }

        return !errorMessage;
    }

    let formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            let isFormValid = true;

            options.rules.forEach((rule) => {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule);

                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('[name]');
                    let formValues = [...enableInputs].reduce(
                        (values, input) => {
                            values[input.name] = input.value;
                            return values;
                        },
                        {},
                    );
                    options.onSubmit(formValues, options.currentData);
                } else {
                    formElement.submit();
                }
            }
        };

        options.rules.forEach((rule) => {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            let inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement, rule);
                };

                inputElement.oninput = () => {
                    let errorElement = getParent(
                        inputElement,
                        options.formGroupSelector,
                    ).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(
                        inputElement,
                        options.formGroupSelector,
                    ).classList.remove('invalid');
                };
            }
        });
    }
}

Validator.isRequired = (selector) => ({
    selector,
    test(value) {
        return value.trim() ? undefined : 'Vui lòng nhập trường này';
    },
});

Validator.isEmail = (selector) => ({
    selector,
    test(value) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        return regex.test(value) ? undefined : 'Trường này phải là email';
    },
});

Validator.minLength = (selector, min) => ({
    selector,
    test(value) {
        return value.length >= min
            ? undefined
            : `Vui lòng nhập tối thiểu ${min} ký tự`;
    },
});

Validator.maxLength = (selector, max) => ({
    selector,
    test(value) {
        return value.length <= max
            ? undefined
            : `Vui lòng nhập ít hơn ${max} ký tự`;
    },
});

Validator.isConfirmed = (selector, getConfirmValue, message) => ({
    selector,
    test(value) {
        return value === getConfirmValue
            ? undefined
            : message || 'Giá trị nhập vào không chính xác';
    },
});

Validator.minValue = (selector, min, message) => ({
    selector,
    test(value) {
        return value >= min ? undefined : message || `Phải lớn hơn ${min}`;
    },
});

Validator.maxValue = (selector, max, message) => ({
    selector,
    test(value) {
        return value <= max ? undefined : message || `Phải bé hơn ${max}`;
    },
});

async function fetchCategories() {
    try {
        const response = await axios.get('http://localhost:8080/categories');
        categories = response.data.data;
        console.log('categories: ', categories);
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    await fetchCategories();
    await showDataInTable();
})();

// Xử lý responsive sidebar và chuyển giao diện sáng tối
(function () {
    const allSideMenu = document.querySelectorAll(
        '#sidebar .side-menu.top li a',
    );

    allSideMenu.forEach((item) => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach((i) => {
                i.parentElement.classList.remove('active');
            });
            li.classList.add('active');
        });
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    if (!menuBar) {
        return;
    }

    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    });

    const searchButton = document.querySelector(
        '#content nav form .form-input button',
    );
    const searchButtonIcon = document.querySelector(
        '#content nav form .form-input button .bx',
    );
    const searchForm = document.querySelector('#content nav form');

    searchButton.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    });

    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function () {
        if (this.innerWidth > 576) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    });

    const switchMode = document.getElementById('switch-mode');

    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    });
})();

// Xử lý khi thêm file ảnh
const defaultBtnActive = () => {
    const defaultBtn = document.querySelector('#default-btn');
    if (defaultBtn) {
        defaultBtn.click();
    }
};

(function () {
    const wrapper = document.querySelector('.input-img-wrapper');
    const defaultBtn = document.querySelector('#default-btn');

    if (!wrapper) {
        return;
    }

    const cancelBtn = document.querySelector('.cancel-btn');
    const fileName = document.querySelector('.file-name');
    const customBtn = document.querySelector('#custom-btn');
    const img = document.querySelector('#product-img');
    let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

    defaultBtn.addEventListener('change', (ev) => {
        const file = ev.target.files[0];

        const buttonElem = document.querySelector('#button-submit');
        const urlElem = document.querySelector('#url-img');

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                img.src = result;
                wrapper.classList.add('active');
                fileName.classList.add('active');
                cancelBtn.classList.add('active');
                customBtn.classList.add('hide');
            };
            cancelBtn.addEventListener('click', function () {
                img.src = '';
                wrapper.classList.remove('active');
                fileName.classList.remove('active');
                cancelBtn.classList.remove('active');
                customBtn.classList.remove('hide');
            });

            reader.readAsDataURL(file);
        }
        if (this.value) {
            let valueStore = this.value.match(regExp);
            fileName.textContent = valueStore;
        }

        const formData = new FormData();
        formData.append('image', ev.target.files[0]);

        fetch('https://api.imgur.com/3/image/', {
            method: 'post',
            headers: {
                Authorization: 'Client-ID 59ab98495609928',
            },
            body: formData,
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                urlElem.value = data.data.link;
                buttonElem.disabled = false;
            });
    });

    const renderImgColor = () => {
        imgColorItem = ``;

        for (let i = 0; i < 3; i++) {
            imgColorItem += `
            <div data-index="${i}" class="input-img-wrapper flex-1">
                <div class="input-img">
                    <img
                        alt=""
                        class="product-img"
                        onerror="this.style.display='none'"
                        data-index="${i}"
                    />
                </div>
                <div class="input-image-content">
                    <div class="icon">
                        <i class="bx bxs-cloud-upload"></i>
                    </div>
                    <div class="text">
                        No file chosen, yet!
                        <button
                            onclick="defaultBtnActiveColor(${i}, this)"
                            class="custom-btn-color"
                            type="button"
                        >
                            Choose a file
                        </button>
                    </div>
                </div>
                <div class="cancel-btn">
                    <i class="bx bx-x"></i>
                </div>
                <div class="file-name">File name here</div>
                <input type="file" id="file-input" hidden />
            </div>`;
        }
    };

    renderImgColor();
})();

function defaultBtnActiveColor(id, elem) {
    const wrapper = elem.closest('.input-img-wrapper.flex-1');
    const cancelBtn = wrapper.querySelector('.cancel-btn');
    const fileName = wrapper.querySelector('.file-name');
    const defaultBtn = wrapper.querySelector('.default-btn-color');
    const customBtn = wrapper.querySelector('.custom-btn-color');
    const img = wrapper.querySelector('img');

    defaultBtn.click('#file-input', '#url-img');

    defaultBtn.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                img.src = result;
                wrapper.classList.add('active');
                fileName.classList.add('active');
                cancelBtn.classList.add('active');
                customBtn.classList.add('hide');
            };
            cancelBtn.addEventListener('click', function () {
                img.src = '';
                wrapper.classList.remove('active');
                fileName.classList.remove('active');
                cancelBtn.classList.remove('active');
                customBtn.classList.remove('hide');
            });

            reader.readAsDataURL(file);
        }
        if (this.value) {
            let valueStore = this.value.match(regExp);
            fileName.textContent = valueStore;
        }
    });
}

// chuyển file ảnh nhận vào thành url
function imageToUrl(fileSelector, buttonSubmitSelector) {
    const fileElem = document.querySelector(fileSelector);
    const buttonElem = document.querySelector(buttonSubmitSelector);

    if (fileElem || buttonElem) {
        return;
    }

    console.log(fileElem);
    console.log(buttonElem);
    fileElem.addEventListener('change', (ev) => {
        const formdata = new FormData();
        formdata.append('image', ev.target.files[0]);
        console.log('aaaaaaaaaaaa');

        fetch('https://api.imgur.com/3/image/', {
            method: 'post',
            headers: {
                Authorization: 'Client-ID 59ab98495609928',
            },
            body: formdata,
        })
            .then((data) => data.json())
            .then((data) => {
                alert('image to url');
                urlElem.value = data.data.link;
                buttonElem.disabled = false;
            });
    });
}

// Xử lý hiển thị danh sách quản lý
function showDataInTable() {
    const tbody = document.querySelector('#tbody');

    if (!tbody) {
        return;
    }

    const category = {
        products: categories,

        handleEvent() {},

        renderCategory() {
            if (this.products.length <= 0) {
                tbody.innerHTML = 'Khong co danh sach san pham nao';
                return;
            }

            let row = ``;

            this.products.forEach((product, i) => {
                row += `
                <tr>
                    <td>${i + 1}</td> 
                    <td class="td-name">
                        <a class="table-name-link" href="./addProduct.html?id=${
                            product.id
                        }">${product.name}</a>
                    </td>
                    <td>
                        <img
                            src="${product.icon}"
                            alt="${product.name}"
                        />
                    </td>
                    <td>${product.createdAt}</td>
                    <td>${product.updatedAt}</td>
                    <td>${product.deletedAt}</td>
                    <td id="edit" class="actions-icon"><a href="./addProduct.html?id=${
                        product.id
                    }"><i class='bx bxs-message-square-edit'></i></a></td>
                    <td onclick="category.removeItem(${
                        product.id
                    })" id="remove" class="actions-icon"><i class='bx bxs-message-square-x'></i></td>
                </tr>`;

                tbody.innerHTML = row;
            });
        },

        removeItem(id) {
            let index = this.products.findIndex((item) => item.id === id);
            this.products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(this.products));
            this.renderCategory();
        },

        start() {
            this.renderCategory();
            this.handleEvent();
        },
    };

    category.start();
}

Validator({
    form: '#add-product',
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
