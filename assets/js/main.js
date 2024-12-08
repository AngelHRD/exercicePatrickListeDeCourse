let shoppingList = {
  products: {
    fruits: [
      { product: 'pomme', price: 0.5, quantity: 2 },
      { product: 'poire', price: 0.7, quantity: 3 },
    ],
    vegetables: [
      { product: 'carotte', price: 1, quantity: 2 },
      { product: 'patate', price: 5.3, quantity: 1 },
    ],
    drinks: [
      { product: 'coca', price: 2.49, quantity: 2 },
      { product: 'orangina', price: 2.25, quantity: 3 },
    ],
  },

  calculSubTotal(product) {
    return product.price * product.quantity;
  },

  calculTotal() {
    return Object.values(this.products)
      .flat()
      .reduce((total, product) => {
        return total + this.calculSubTotal(product);
      }, 0);
  },
};

//------------------------------- CREATE TABLE & UPDATE
const updateTable = () => {
  const existingTable = document.querySelector('table');
  if (existingTable) existingTable.remove();

  const table = document.createElement('table');
  table.className = 'w-full text-center border-collapse rounded shadow-md table-auto';
  const thead = document.createElement('thead');
  thead.className = 'text-white bg-[#115e59]';
  const tbody = document.createElement('tbody');
  tbody.className = 'bg-white divide-y divide-gray-200';

  // Table header
  const headerRow = document.createElement('tr');
  ['Catégorie', 'Produit', 'Prix', 'Quantité', 'Sous-total', 'Action'].forEach((text) => {
    const th = document.createElement('th');
    th.className = 'px-4 py-2 ';
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  // table.appendChild(thead); jsp

  // Table body
  for (const category in shoppingList.products) {
    shoppingList.products[category].forEach((product) => {
      const row = document.createElement('tr');
      row.className = 'hover:bg-gray-100';
      [
        category,
        product.product,
        product.price.toFixed(2),
        product.quantity,
        shoppingList.calculSubTotal(product).toFixed(2),
      ].forEach((value) => {
        const td = document.createElement('td');
        td.className = 'px-4 py-2 border';
        td.textContent = value;
        row.appendChild(td);
      });

      const actionCell = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Supprimer';
      deleteBtn.className =
        'px-1 py-1 text-white bg-[#042f2e] rounded hover:bg-[#042f2e] ';

      deleteBtn.addEventListener('click', () => {
        deleteProduct(category, product);
      });
      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);
      tbody.appendChild(row);
    });
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  document.body.appendChild(table);
};

//------------------------------- ADD PRODUCT

const addProduct = (category, productName, price, quantity) => {
  if (!shoppingList.products[category]) shoppingList.products[category] = [];
  shoppingList.products[category].push({
    product: productName,
    price: parseFloat(price),
    quantity: parseInt(quantity, 10),
  });
  updateTable();
};

//------------------------------- ADD CATEGORY

const addCategory = (categoryName) => {
  if (!shoppingList.products[categoryName]) {
    shoppingList.products[categoryName] = [];
    updateTable();
  }
};

//------------------------------- SUPPRIMER PRODUIT (btn)

const deleteProduct = (category, product) => {
  shoppingList.products[category] = shoppingList.products[category].filter(
    (p) => p.product !== product.product,
  );
  if (shoppingList.products[category].length === 0) {
    delete shoppingList.products[category];
  }
  updateTable();
};

//------------------------------- UPDATE CATEGORY SELECT

const updateCategorySelect = () => {
  const select = document.querySelector('#category-select');
  if (select) {
    select.innerHTML = ``;
    Object.keys(shoppingList.products).forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });
  }
};

//------------------------------- BTNCATEGORY AND BTN PRODUCTS

const createButtons = () => {
  const addProductButton = document.createElement('button');
  addProductButton.textContent = 'Ajouter un produit';
  addProductButton.className =
    'px-2 py-2 my-3 text-white bg-[#115e59] rounded hover:bg-[#042f2e] rounded-lg	';
  addProductButton.addEventListener('click', showAddProductModal);
  document.body.appendChild(addProductButton);

  const addCategoryButton = document.createElement('button');
  addCategoryButton.textContent = 'Ajouter une catégorie';
  addCategoryButton.className =
    'px-2 py-2 my-3 text-white bg-[#115e59] rounded hover:bg-[#042f2e] rounded-lg	';
  addCategoryButton.addEventListener('click', showAddCategoryModal);
  document.body.appendChild(addCategoryButton);
};

//------------------------------- CREATE MODAL FOR ADD PRODUCT

const createAddProductModal = () => {
  const modalProduct = document.createElement('div');
  modalProduct.className =
    'fixed inset-0 flex items-center justify-center hidden bg-gray-900 bg-opacity-50';
  modalProduct.id = 'addProductModal';

  modalProduct.innerHTML = `
     <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4 text-center">Ajouter un produit</h2>
      <form id="addProductForm" class="space-y-4">
      
        <label>
          <span class="text-gray-800">Catégorie</span>
          <select id="modal-category-select" class="w-full border rounded px-3 py-2">
            ${Object.keys(shoppingList.products)
              .map((category) => `<option value="${category}">${category}</option>`)
              .join(' ')}
          </select>
        </label>
        
        <label>
          <span class="text-gray-800">Produit</span>
          <input type="text" id="modal-product-name" class="w-full border rounded px-3 py-2" />
        </label>

        <label>
          <span class="text-gray-800">Prix</span>
          <input type="number" id="modal-product-price" class="w-full border rounded px-3 py-2" />
        </label>

        <label>
          <span class="text-gray-800">Quantité</span>
          <input type="number" id="modal-product-quantity" class="w-full border rounded px-3 py-2" />
        </label>
        
        <div class="flex justify-between">
          <button type="button" id="cancel-button-product" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-[#115e59] text-white rounded-lg hover:bg-[#042f2e]">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalProduct);

  // Btn annuler
  document.querySelector('#cancel-button-product').addEventListener('click', () => {
    modalProduct.classList.add('hidden');
  });

  // Soumission product
  document.querySelector('#addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const categorySelect = document.querySelector('#modal-category-select').value;
    const productName = document.querySelector('#modal-product-name').value;
    const price = document.querySelector('#modal-product-price').value;
    const quantity = document.querySelector('#modal-product-quantity').value;

    if (categorySelect && productName && price && quantity) {
      addProduct(categorySelect, productName, price, quantity);
      modalProduct.classList.add('hidden');
    }
  });
};

//------------------------------- CREATE MODAL FOR ADD CATEGORY

const createAddCategoryModal = () => {
  const modalCategory = document.createElement('div');
  modalCategory.className =
    'fixed inset-0 flex items-center justify-center hidden bg-gray-900 bg-opacity-50';
  modalCategory.id = 'addCategoryModal';
  modalCategory.innerHTML = `
     <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4 text-center">Ajouter une catégorie</h2>
      <form id="addCategoryForm" class="space-y-4">>
        <label>
          <span class="text-gray-800">Catégorie</span>
          <input type="text" id="modal-category-name" class="w-full border rounded px-3 py-2" />
        </label>
        <div class="flex justify-between">
          <button type="button" id="cancel-button-category" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-[#115e59] text-white rounded-lg hover:bg-[#042f2e]">
            Ajouter
          </button>
        </div>
      </form>
     </div>
  `;
  document.body.appendChild(modalCategory);

  //btn annuler
  document.querySelector('#cancel-button-category').addEventListener('click', () => {
    modalCategory.classList.add('hidden');
  });

  //soumission category
  document.querySelector('#addCategoryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.querySelector('#modal-category-name').value;
    if (category) {
      addCategory(category);
      modalCategory.classList.add('hidden');
    }
  });
};

//------------------------------- SHOW MODAL PRODUCT

const showAddProductModal = () => {
  const modal = document.querySelector('#addProductModal');
  if (modal) {
    const select = document.querySelector('#modal-category-select');
    select.innerHTML = Object.keys(shoppingList.products)
      .map((category) => `<option value ="${category}">${category}</option>`)
      .join(' ');
    modal.classList.remove('hidden');
  }
};

//------------------------------- SHOW MODAL PRODUCT

const showAddCategoryModal = () => {
  const modalCategory = document.querySelector('#addCategoryModal');
  if (modalCategory) {
    modalCategory.classList.remove('hidden');
    // const category = document.querySelector('#modal-category-name');
    // category.innerHTML = Object.keys{shoppingList.products}
    // .
  }
};

createAddProductModal();
createAddCategoryModal();
createButtons();
updateTable();
