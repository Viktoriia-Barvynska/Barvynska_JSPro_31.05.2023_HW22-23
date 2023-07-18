// Масив категорій та відповідних товарів
const productsByCategory = {
  'Електроніка': ['Телефон', 'Ноутбук', 'Телевізор'],
  'Одяг': ['Футболка', 'Джинси', 'Спідниця'],
  'Книги': ['Роман', 'Детектив', 'Наукова література']
};

// Отримуємо елементи DOM
const categoryList = document.getElementById('categoryList');
const productList = document.getElementById('productList');
const productDetails = document.getElementById('productDetails');
const orderForm = document.getElementById('orderForm');
const myOrdersButton = document.getElementById('myOrdersButton');

//  обробник подій на категорії
categoryList.addEventListener('click', function(event) {
  event.preventDefault();
  const target = event.target;
  if (target.tagName === 'A') {
    const category = target.textContent;
    showProducts(category);
  }
});

//  обробник подій на товари
productList.addEventListener('click', function(event) {
  event.preventDefault();
  const target = event.target;
  if (target.tagName === 'A') {
    const product = target.textContent;
    showProductDetails(product);
  }
});

//  обробник подій на кнопку "Купити"
productDetails.addEventListener('click', function(event) {
  event.preventDefault();
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    const product = target.dataset.product;
    showOrderForm();
  }
});

// Додаємо обробник події submit до форми
orderForm.addEventListener('submit', submitOrder);

// Додати обробник події на кнопку "Мої замовлення"
myOrdersButton.addEventListener('click', displayOrders);

// Функція для відображення товарів обраної категорії
function showProducts(category) {
  const products = productsByCategory[category];
  productList.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = product;
    li.appendChild(a);
    productList.appendChild(li);
  });
}

// Функція для відображення деталей товару
function showProductDetails(product) {
  productDetails.innerHTML = `<h3>${product}</h3>
                              <button data-product="${product}">Купити</button>`;
}

// Функція для показу форми замовлення
function showOrderForm() {
  const orderForm = document.querySelector('.order-form');
  orderForm.style.display = 'block';
}

// Функція для очищення форми замовлення
function resetOrderForm() {
  const orderForm = document.querySelector('.order-form');
  // orderForm.reset();
  orderForm.innerHTML = '';
  orderForm.style.display = 'none';
}

// Функція для підтвердження замовлення
function submitOrder(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const city = document.getElementById('city').value;
  const deliveryPoint = document.getElementById('deliveryPoint').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const quantity = document.getElementById('quantity').value;
  const comment = document.getElementById('comment').value;

  if (fullName === '' || city === '' || deliveryPoint === '' || paymentMethod === '' || quantity === '') {
    alert('Будь ласка, заповніть всі обов\'язкові поля');
    return;
  }

  const orderDetails = {
    product: document.querySelector('.product-details h3').textContent,
    fullName,
    city,
    deliveryPoint,
    paymentMethod,
    quantity,
    comment
  };

  saveOrderDetails(orderDetails);
  displayOrderDetails(orderDetails);
  resetOrderForm();
}

// Функція для збереження деталей замовлення в localStorage
function saveOrderDetails(orderDetails) {
  let orders = localStorage.getItem('orders');

  if (orders) {
    orders = JSON.parse(orders);
    orders.push(orderDetails);
  } else {
    orders = [orderDetails];
  }

  localStorage.setItem('orders', JSON.stringify(orders));
}

// Функція для виведення інформації про замовлення
function displayOrderDetails(orderDetails) {
  const orderInfo = document.createElement('div');
  orderInfo.classList.add('info')
  orderInfo.innerHTML = `
    <h3>Інформація про замовлення:</h3>
    <p>Товар: ${orderDetails.product}</p>
    <p>ПІБ покупця: ${orderDetails.fullName}</p>
    <p>Місто: ${orderDetails.city}</p>
    <p>Склад Нової пошти: ${orderDetails.deliveryPoint}</p>
    <p>Спосіб оплати: ${orderDetails.paymentMethod}</p>
    <p>Кількість: ${orderDetails.quantity}</p>
    <p>Коментар: ${orderDetails.comment}</p>
  `;

  document.body.appendChild(orderInfo);
}

// Функція для відображення списку замовлень
function displayOrders() {
  const orders = localStorage.getItem('orders');

  if (orders) {
    const ordersList = document.createElement('div');
    ordersList.classList.add('orders-list');
    ordersList.innerHTML = '<h3>Мої замовлення:</h3>';

    const parsedOrders = JSON.parse(orders);
    parsedOrders.forEach(order => {
      const orderItem = document.createElement('div');
      orderItem.classList.add('order-item');
      orderItem.innerHTML = `
        <p>Товар: ${order.product}</p>
        <p>ПІБ покупця: ${order.fullName}</p>
        <p>Місто: ${order.city}</p>
        <p>Склад Нової пошти: ${order.deliveryPoint}</p>
        <p>Спосіб оплати: ${order.paymentMethod}</p>
        <p>Кількість: ${order.quantity}</p>
        <p>Коментар: ${order.comment}</p>
      `;

      ordersList.appendChild(orderItem);
    });

    document.body.appendChild(ordersList);
  }
}
