const tbody = document.querySelector("#tbody");

const category = {
  products: JSON.parse(localStorage.getItem("products")) || [],

  handleEvent() {},
  renderCategory() {
    if (this.products.length <= 0) {
      tbody.innerHTML = "Khong co san pham nao";
      return;
    }

    let row = ``;

    this.products.forEach((product, i) => {
      let price = product.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      row += `
                <tr>
                    <td>
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        />
                    </td>
                    <td class="td-name">
                        <a class="table-name-link" href="./addProduct.html?id=${
                          product.id
                        }">${product.name}</a>
                    </td>
                    <td>${price}đ</td>
                    <td class="td-color">
                        <img
                            src="https://i.pinimg.com/236x/ea/dc/39/eadc39909b3177de6a9d10f76cc90461.jpg"
                            alt=""
                        /><img
                            src="https://i.pinimg.com/236x/ea/dc/39/eadc39909b3177de6a9d10f76cc90461.jpg"
                            alt=""
                        /><img
                            src="https://i.pinimg.com/236x/ea/dc/39/eadc39909b3177de6a9d10f76cc90461.jpg"
                            alt=""
                        />
                    </td>
                    <td>${product.quantity}</td>
                    <td>a</td>
                    <td>${product.size}</td>
                    <td>${MATERIAL_OPTION[product.material]}</td>
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
    localStorage.setItem("products", JSON.stringify(this.products));
    this.renderCategory();
  },

  start() {
    this.renderCategory();
    this.handleEvent();
  },
};

category.start();
