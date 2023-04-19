const innerElem = document.querySelector('#renderTable');

const renderTable = (list) => {
    list.forEach((product, i) => {
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

        let table = `<div class="table-data">
                    <div class="head">
                        <h3>Products</h3>
                        <div class="table-actions">
                            <i class="bx bx-search"></i>
                            <i class="bx bx-filter-alt"></i>
                        </div>
                    </div>
                    <div style="overflow-x: auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                            ${row}
                            </tbody>
                        </table>
                    </div>
                </div>`;

        innerElem.innerHTML = row;
    });
};
