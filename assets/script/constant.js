const defaultBtnActive = () => {
    const defaultBtn = document.querySelector('#default-btn');
    defaultBtn.click();
};

const goCategory = () => {
    window.location.href = `${window.location.origin}/category.html`;
};