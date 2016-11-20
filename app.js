(function () {
'use strict';
//Initial Shopping list
var shoppingList = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }
];

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider);

//First controller adds button behaviour
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.buyitems = ShoppingListCheckOffService.getBuyItems();

  toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

//Second controller shows items bought
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBuy = this;

  alreadyBuy.boughtitems = ShoppingListCheckOffService.getBoughtItems();
}

// ShoppingListCheckOffService, shares data between controllers
function ShoppingListCheckOffService() {
  var service = this;

  // 2 Lists: buy items and bought items
  var buy = shoppingList;
  var bought = [];
  service.buyItem = function (itemIndex) {
      var item = buy[itemIndex];
      buy.splice(itemIndex, 1);
      bought.push(item);
  };

//Retunrs buy array
  service.getBuyItems = function () {
    return buy;
  };

//Retunrs bought array
  service.getBoughtItems = function () {
    return bought;
  };
}

//Provides ShoppingListCheckOffService object
function ShoppingListCheckOffServiceProvider() {
  var provider = this;

  provider.$get = function () {
    var shoppingListCheckOffService = new ShoppingListCheckOffService();

    return shoppingListCheckOffService;
  };
}

})();
