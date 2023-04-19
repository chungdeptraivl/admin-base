const wrapper = document.querySelector('.input-img-wrapper');
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

function imageToUrl(fileSelector, buttonSubmitSelector) {
    const fileElem = document.querySelector(fileSelector);
    const buttonElem = document.querySelector(buttonSubmitSelector);
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
