export function renderTableContent() {
    const tbody = document.querySelector('#tbody');

    if(!tbody) {
        return;
    }

    const category = {
        products: [],

        handleEvent() {},

        renderCategory() {
            if (this.products.length <= 0) {
                tbody.innerHTML = 'Khong co du lieu nao';
                return;
            }

            let row = ``;

            `
        ${this.products.forEach((product, i) => {
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

    axios
        .get('http://localhost:8080/categories')
        .then((response) => {
            console.log(response.data.data);
            category.products = response.data.data;
            category.start();
        })
        .catch((error) => {
            console.error(error);
        });
}
