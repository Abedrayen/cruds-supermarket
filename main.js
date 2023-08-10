let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let submit = document.getElementById('submit');
let total = document.getElementById('total');
let clear = document.getElementById('clear')

console.log(title, price, taxes, ads, discount, count, category, search, submit)
let mood = 'create'
let tmp;

function getTotal() {
    if (price.value != '') {
        let result = (+taxes.value + +price.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';

    } else {
        total.innerHTML = '';
        total.style.background = '#222';
    }
}
let dtaPro;
if (localStorage.produ != null) {
    dtaPro = JSON.parse(localStorage.produ)
} else {
    dtaPro = [];
}
submit.onclick = function() {
    let obPro = {
        title: title.value,
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        category: category.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value
    }
    if (mood === 'create') {
        let j = 0;
        while (j < count.value) {
            dtaPro.push(obPro);
            j++;
        }
    } else {
        dtaPro[tmp] = obPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';

    }



    localStorage.setItem('produ', JSON.stringify(dtaPro))
    console.log(dtaPro)
    clearData();
    showData();
}

function clearData() {
    title.value = ''
    price.value = ''
    ads.value = ''
    taxes.value = ''
    category.value = ''
    discount.value = ''
    count.value = ''
    total.innerHTML = ''
    total.style.background = '#222'
}


function showData() {
    let table = ''
    for (let i = 0; i < dtaPro.length; i++) {
        table += `
       <tr>
            <td>${i}</td>
            <td>${dtaPro[i].title}</td>
            <td>${dtaPro[i].price}</td>
            <td>${dtaPro[i].taxes}</td>
            <td>${dtaPro[i].ads}</td>
            <td>${dtaPro[i].discount}</td>
            <td>${dtaPro[i].total}</td>
            <td>${dtaPro[i].category}</td>
            <td><button id="update" style="width:70%" onclick="updateData(${i})">UPDATE</button></td>
            <td><button id="delete" style="width:70%" onclick="deleteData(${i})">DELETE</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
}
showData()

function deleteData(i) {
    dtaPro.splice(i, 1);
    localStorage.produ = JSON.stringify(dtaPro);
    showData()
}

function clearAll() {
    dtaPro = [];
    localStorage.produ = JSON.stringify(dtaPro);
    showData()
}

function updateData(i) {

    title.value = dtaPro[i].title
    price.value = dtaPro[i].title
    ads.value = dtaPro[i].ads
    taxes.value = dtaPro[i].taxes
    category.value = dtaPro[i].category
    discount.value = dtaPro[i].discount
    price.value = dtaPro[i].price
    count.style.display = 'none'
    submit.innerHTML = 'UPDATE'
    mood = 'update'
    tmp = i;
}