const wrapper = document.querySelector('.input-img-wrapper');
const cancelBtn = document.querySelector('.cancel-btn');
const fileName = document.querySelector('.file-name');
const defaultBtn = document.querySelector('#default-btn');
const customBtn = document.querySelector('#custom-btn');
const img = document.querySelector('#product-img');
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

const ImgColor = document.querySelector('.input-wrapper.input-wrapper-3');

const defaultBtnActive = () => {
    defaultBtn.click();
};

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
                <input type="file" class="default-btn-color" hidden />
            </div>`;
    }

    ImgColor.innerHTML = imgColorItem;
};
renderImgColor();

function defaultBtnActiveColor(id, elem) {
    const wrapper = elem.closest('.input-img-wrapper.flex-1');
    const cancelBtn = elem.closest('.input-img-wrapper.flex-1').querySelector('.cancel-btn');
    const fileName = elem.closest('.input-img-wrapper.flex-1').querySelector('.file-name');
    const defaultBtn = elem.closest('.input-img-wrapper.flex-1').querySelector('.default-btn-color');
    const customBtn = elem.closest('.input-img-wrapper.flex-1').querySelector('.custom-btn-color');
    const img = elem.closest('.input-img-wrapper.flex-1').querySelector('img');

    defaultBtn.click();

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