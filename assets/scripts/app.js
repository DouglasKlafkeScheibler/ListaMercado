// Seletores
const marketInput = document.getElementById("market-input");
const marketButton = document.getElementById("market-button");
const marketList = document.querySelector(".market-list");
const marketTotalPrice = document.getElementById("total-price");
const marketTotalItems = document.getElementById("total-items");
const filterOption = document.querySelector(".filter-market");
const darkModeInput = document.getElementById("dark-mode-input");
const valorInput = document.getElementById("valueInput");

// Eventos
document.addEventListener("DOMContentLoaded", getMarketItems);
document.addEventListener("DOMContentLoaded", getTotalPriceAndTotalItems);
marketButton.addEventListener("click", addMarket);
marketList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterMarket);

function changeLightMode() {
  document.body.classList.toggle("dark");
}
var numberOfItems = 0;

// Funções
function addMarket(event) {
  // Não executar a função submit default
  event.preventDefault();

  if (marketInput.value == null || marketInput.value.trim() == "") {
    throw alert("Item sem descrição");
  }

  if (searchForItemLocalStorage(marketInput.value)) {
    marketInput.value = "";
    throw alert("Item já está na lista");
  }

  //Criando DIV do supermercado
  const marketDiv = document.createElement("div");
  marketDiv.classList.add("market");

  // Criando lista
  const newMarket = document.createElement("li");

  // Check box
  const checkValue = document.createElement("input");
  checkValue.type = "checkbox";
  checkValue.classList.add("checked-item");
  marketDiv.appendChild(checkValue);

  newMarket.innerText = marketInput.value;
  newMarket.classList.add("market-item");

  marketDiv.appendChild(newMarket);

  // ================ Adicionando marketItems ao LocalStorage ================
  saveLocalMarkets(marketInput.value);

  //Criando input valor
  const newValue = document.createElement("input");
  newValue.classList.add("inputDiv");
  newValue.setAttribute("id", "valueInput");
  newValue.setAttribute("placeholder", "Digite o valor do item");
  newValue.setAttribute("type", "number");
  newValue.setAttribute("onblur", "logar(this)");
  marketDiv.appendChild(newValue);

  // label valor
  const labelValue = document.createElement("span");
  labelValue.classList.add("InputLabel");
  labelValue.innerHTML = "Reais";
  marketDiv.appendChild(labelValue);

  // Botão de lixeira
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  trashButton.classList.add("trash-btn");
  marketDiv.appendChild(trashButton);

  // Append to list
  marketList.appendChild(marketDiv);

  // Clear Todo Input Value
  marketInput.value = "";

  getTotalPriceAndTotalItems();
}

function saveLocalMarkets(item) {
  // Verifica se já existem Items salvos em localStorage
  let marketItems;

  if (localStorage.getItem("marketItems") === null) {
    marketItems = [];
  } else {
    marketItems = JSON.parse(localStorage.getItem("marketItems"));
  }

  // Adicionando nosso item ao array marketItems e salvando no localStorage
  marketItems.push([item, false]);
  localStorage.setItem("marketItems", JSON.stringify(marketItems));
}

function logar(event) {
  let = itemPrice = event.value;
  const market = event.parentElement;
  var getTagLi = market.getElementsByTagName("li")[0];
  var getValueTagLi = getTagLi.childNodes[0].textContent;
  var markedItem = [getValueTagLi, itemPrice];
  saveLocalMarketPrices(markedItem);
}

function deleteCheck(event) {
  const item = event.target;
  const market = item.parentElement;
  var getTagLi = market.getElementsByTagName("li")[0];
  var getValueTagLi = getTagLi.childNodes[0].textContent;

  // Delete
  if (item.classList[0] === "trash-btn") {
    removeLocalMarket(getValueTagLi);

    removeLocalMarketprices(getValueTagLi);

    market.remove();
  }

  // Check Mark
  if (item.classList[0] === "checked-item") {
    if (market.classList.value === "market") {
      market.classList.toggle("completed");
      removeLocalMarketprices(getValueTagLi);
      changeStateMarketItem(getValueTagLi);
    }
  }
}

function removeLocalMarket(item) {
  let marketItems;

  // Verifica se já existem Todos salvos em localStorage
  if (localStorage.getItem("marketItems") === null) {
    // Se não houver, ele iniciará a variárvel market com um array
    marketItems = [];
  } else {
    // Se houver, ele buscará os marketItems que já estão no localStorage
    marketItems = JSON.parse(localStorage.getItem("marketItems"));
  }
  let index = 0;
  marketItems.every((marketItem) => {
    if (item === marketItem[0]) {
      return false;
    } else {
      index = index + 1;
      return true;
    }
  });

  // Remove o item do array, de acordo com o index recebido
  marketItems.splice(index, 1);

  // Atualiza o array no localStorage
  localStorage.setItem("marketItems", JSON.stringify(marketItems));

  getTotalPriceAndTotalItems();
}

function getMarketItems() {
  // Verifica se já existem Todos salvos em localStorage
  let marketItems;

  if (localStorage.getItem("marketItems") === null) {
    marketItems = [];
  } else {
    marketItems = JSON.parse(localStorage.getItem("marketItems"));
  }

  marketItems.forEach((item) => {
    // Cria Div
    const marketDiv = document.createElement("div");
    marketDiv.classList.add("market");

    // Cria Check box e verifica estado
    if (item[1]) {
      const checkValue = document.createElement("input");
      checkValue.type = "checkbox";
      checkValue.classList.add("checked-item");
      checkValue.checked = true;
      marketDiv.classList.toggle("completed");

      marketDiv.appendChild(checkValue);
    } else {
      const checkValue = document.createElement("input");
      checkValue.type = "checkbox";
      checkValue.classList.add("checked-item");

      marketDiv.appendChild(checkValue);
    }

    // Cria li
    const newMarket = document.createElement("li");
    newMarket.innerText = item[0];
    newMarket.classList.add("market-item");

    marketDiv.appendChild(newMarket);

    //Criando input valor
    const newValue = document.createElement("input");
    newValue.classList.add("inputDiv");
    newValue.setAttribute("id", "valueInput");
    newValue.setAttribute("onblur", "logar(this)");
    marketDiv.appendChild(newValue);

    // label valor
    const labelValue = document.createElement("span");
    labelValue.classList.add("InputLabel");
    labelValue.innerHTML = "Reais";
    marketDiv.appendChild(labelValue);

    // Cria botão lixo
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    marketDiv.appendChild(trashButton);

    // adiciona
    marketList.appendChild(marketDiv);
  });
}

function saveLocalMarketPrices(markedItem) {
  let marketPrice;
  console.log(markedItem[0]);

  if (localStorage.getItem("marketPrice") === null) {
    marketPrice = [];
  } else {
    marketPrice = JSON.parse(localStorage.getItem("marketPrice"));
  }
  // Adicionando nosso item ao array marketItems e salvando no localStorage

  // TODO   marketPrice.push({ name: markedItem[0], price: markedItem[1] });
  marketPrice.push(markedItem);
  localStorage.setItem("marketPrice", JSON.stringify(marketPrice));

  getTotalPriceAndTotalItems();
}

function removeLocalMarketprices(item) {
  let marketPrice;

  // Verifica se já existem Todos salvos em localStorage
  if (localStorage.getItem("marketPrice") === null) {
    // Se não houver, ele iniciará a variárvel market com um array
    marketPrice = [];
  } else {
    // Se houver, ele buscará os marketPrice que já estão no localStorage
    marketPrice = JSON.parse(localStorage.getItem("marketPrice"));
  }

  let index = 0;
  marketPrice.every((marketItem) => {
    if (item === marketItem[0]) {
      return false;
    } else {
      index = index + 1;
      return true;
    }
  });

  // Remove o item do array, de acordo com o index recebido
  marketPrice.splice(index, 1);

  // Atualiza o array no localStorage
  localStorage.setItem("marketPrice", JSON.stringify(marketPrice));

  getTotalPriceAndTotalItems();
}

function getTotalPriceAndTotalItems() {
  let totalPrice = 0;
  let totalItems = 0;

  //Pegar o preço total
  //   TODO
  //   let recuperarValor = JSON.parse(localStorage.getItem("marketPrice", "price"));
  //   let marketPriceF = recuperarValor?.map((marketPrice) => marketPrice.price);
  //   console.log(marketPriceF);
  let marketPrice = JSON.parse(localStorage.getItem("marketPrice"));

  if (marketPrice != null) {
    marketPrice.forEach((item) => {
      totalPrice = Number(totalPrice) + Number(item[1]);
    });
  }

  //Pegar o total de itens
  let marketItems = JSON.parse(localStorage.getItem("marketItems"));

  if (marketItems != null) {
    marketItems.forEach((item) => {
      totalItems = totalItems + 1;
    });
  }

  marketTotalPrice.innerHTML = totalPrice.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  marketTotalItems.innerHTML = totalItems;
}

function filterMarket(event) {
  const markets = marketList.childNodes;

  markets.forEach(function (item) {
    switch (event.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "bought":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;

      case "Not bought":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
    }
  });
}

function changeStateMarketItem(item) {
  let marketItems;

  if (localStorage.getItem("marketItems") === null) {
    marketItems = [];
  } else {
    marketItems = JSON.parse(localStorage.getItem("marketItems"));
  }

  let index = 0;
  marketItems.every((marketItems) => {
    if (item === marketItems[0]) {
      return false;
    } else {
      index = index + 1;
      return true;
    }
  });

  marketItems[index][1] = !marketItems[index][1];
  localStorage.setItem("marketItems", JSON.stringify(marketItems));
}

function searchForItemLocalStorage(item) {
  let marketItems;

  if (localStorage.getItem("marketItems") === null) {
    marketItems = [];
  } else {
    marketItems = JSON.parse(localStorage.getItem("marketItems"));
  }

  let hasItem = false;
  marketItems.every((marketItems) => {
    if (item === marketItems[0]) {
      hasItem = true;
      return false;
    } else {
      return true;
    }
  });
  return hasItem;
}
