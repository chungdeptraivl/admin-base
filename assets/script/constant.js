// Sidebar
const sidebarItems = document.querySelectorAll('#sidebar ul li a');

// Global function
const setItemLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};

const goCategory = () => {
    window.location = `${window.location.origin}./category.html`;
};

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