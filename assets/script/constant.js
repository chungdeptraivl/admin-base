// Sidebar
const sidebarItems = document.querySelectorAll('#sidebar ul li a');

// Global function
const setItemLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};

const goCategory = () => {
    window.location = `${window.location.origin}/index.html`;
};

// Category
const CATEGORY_OPTION = {
    'quan-ao': 'Quần áo',
    'do-lot': 'Đồ lót',
    'bit-tat': 'Bít tất',
    'dac-biet': 'Sản phẩm đặc biệt',
};

const GENDER_OPTION = {
    0: 'Female',
    1: 'Male',
    2: 'Unisex',
};

const MATERIAL_OPTION = {
    0: 'Acrylic & Rayon (Giữ nhiệt)',
    1: 'Cotton',
    2: 'Cotton & Modal',
    3: 'Cotton tencel',
    4: 'Cotton USA',
    5: 'Modal',
    6: 'PE microfiber',
    7: 'Polyamide',
    8: 'Polyamide & Elastane',
    9: 'Seamless',
    10: 'Tencel & Polyester',
};