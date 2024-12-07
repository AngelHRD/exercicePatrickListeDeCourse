//creer une liste de course avec un objet litteral qui contient une liste de produit avec leur price et leur quantité et 2 methodes qui calcule le total de la liste de course et l'affiche en HTMl, faite un affichage propre

//voici la liste de course:
// products:{
//     fruits:[
//         {product : 'pomme', price : 0.5, quantity: 2},
//         {product : 'poire', price : 0.7, quantity: 3},
//     ],
//     vegetables:[
//         {product : 'carotte', price : 1, quantity: 2},
//         {product : 'patate', price : 5.30, quantity: 1},
//     ],
//     drinks:[
//         {product : 'coca', price : 2.49, quantity: 2},
//         {product : 'orangina', price : 2.25, quantity: 3},
//     ],
// }

// On commence avec un objet litteral (il y aura 2 méthodes(CalculTotal et SousTotal))
// 3 panneaux à créer(screen)
// 2 btn pour Catégorie (sont des clés[...]))
// Et Produit (rentrera dans un tableau et sera un objet avec 3clés(product,price,qtt)

// Pour les 3 panneaux :

// 1er PANNEAU

// 1.0 Afficher listProduct + total doit y avoir :
// des thead pour le "header" du tableau
// 2 possibilité : avec des th(statique) soit avec des clés(dynamique faut map (objet.key))

// 2.0 Afficher le tableau le body (corp tableau)
// tbody il faut fait un algo qui populate le body surêment avec un flatMap
// ex : categorie (afficher le nom de la clé,ex: fruits)
// faire en sorte que quand je log chaque ligne du tableau pour aprés le mettre dans le tableau
// + chaque ligne aura un btn pour supprimer

// 2ieme PANNEAU CREER PRODUIT

// Cree une modal <div> <form> <label> <input>
// 4 inputs select, text , 2 number
// btn annuler = cree et btn ajouter = nouveau et events sur les 2
// Il faut 1 algo pour populate le btn select
// 2ieme algo pour le btn ajouter, dans la catégorie choisie on ajoute un nouveau produit
// Une fois fini on ferme la modal + vider notre tableau + recréer (refresh)

// 3ieme PANNEAU CREER CATEGORIE

// Même chose que 2 mais pas avec des produits mais des clés

// <!> verif que les champs soit remplie si pas msg erreur

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

  calculSubTotal: function (product) {
    return product.price * product.quantity;
  },
  calculTotal: function () {
    let total = 0;
    for (const category in this.products) {
      this.products[category].forEach((product) => {
        total += this.calculSubTotal(product);
      });
    }
    return total;
  },
};

const createTable = () => {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const Headtr = document.createElement('tr');
  ['Catégorie', 'Produit', 'Prix', 'Quantité', 'Sous-total', 'Action'].forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    Headtr.appendChild(th);
  });

  for (const category in shoppingList.products) {
    shoppingList.products[category].forEach((product) => {
      const row = document.createElement('tr');

      [
        category,
        product.product,
        product.price,
        product.quantity,
        shoppingData.calculateSubtotal(product),
      ].forEach((value, index) => {
        const td = document.createElement('td');
        td.textContent = value;
        row.appendChild(td);
      });
    });
  }
};

console.log(shoppingList.products);
//------------------------------- UPDATE TABLEAU
const updateTable = () => {
  const existingTable = document.querySelector('table');
  if (existingTable) {
    existingTable.remove();
  }
  document.body.appendChild(createTable());
};

//------------------------------- AJOUTER PRODUIT

const addProduct = (category, productName, price, quantity) => {
  if (!shoppingList.products[category]) {
    shoppingList.products[category] = [];
  }
  shoppingList.products[category].push({
    product: productName,
    price: parseFloat(price),
    quantity: parseInt(quantity, 10),
  });
  updateTable();
};
//------------------------------- SUPPRIMER PRODUIT (btn)

const deleteProduct = (category, product) => {
  shoppingList.products[category] = shoppingList.products[category].filter(
    (p) => p.product !== product.product,
  );
  if (shoppingList.products[category].length === 0) {
    delete shoppingList.products[category];
  }
};

//------------------------------- CREATE ADD BTN

const createAddProductButton = () => {
  const btn = document.createElement('button');
  btn.textContent = 'Ajoutez un produit svp';
  btn.addEventListener('click', 'showAddProductModal');
  document.appendChild('button');
};
