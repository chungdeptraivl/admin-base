let categories = []

axios
        .get('http://localhost:8080/categories')
        .then((response) => {
            console.log("categories: ", response.data.data);
            categories = response.data.data;
        })
        .catch((error) => {
            console.error(error);
        });


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
(function () {
    const wrapper = document.querySelector('.input-img-wrapper');
    if (!wrapper) {
        return;
    }

    const cancelBtn = document.querySelector('.cancel-btn');
    const fileName = document.querySelector('.file-name');
    const defaultBtn = document.querySelector('#default-btn');
    const customBtn = document.querySelector('#custom-btn');
    const img = document.querySelector('#product-img');
    let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

    const defaultBtnActive = () => {
        defaultBtn.click();
    };

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
})();

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
(function () {
    const tbody = document.querySelector('#tbody');

    const category = {
        products: categories,

        handleEvent() {},

        renderCategory() {
            if (this.products.length <= 0) {
                tbody.innerHTML = 'Khong co danh sach san pham nao';
                return;
            }

            let row = ``;

            `
			${this.products.forEach((product, i) => {
                row += `
					<tr>
						<td>${i + 1}</td> 
						<td class="td-name">
							<a class="table-name-link" href="./addProduct.html?id=${product.id}">${
                    product.name
                }</a>
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
            })}
			`;
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
})();
