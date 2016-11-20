(function () {
'use strict';

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


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.buyitems = ShoppingListCheckOffService.getBuyItems();

  toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBuy = this;

  alreadyBuy.boughtitems = ShoppingListCheckOffService.getBoughtItems();
}

// ShoppingListCheckOffService
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var buy = shoppingList;
  var bought = [];
  service.buyItem = function (itemIndex) {
      var item = buy[itemIndex];
      buy.splice(itemIndex, 1);
      bought.push(item);
  };

  service.getBuyItems = function () {
    return buy;
  };

  service.getBoughtItems = function () {
    return bought;
  };
}


function ShoppingListCheckOffServiceProvider() {
  var provider = this;

  provider.$get = function () {
    var shoppingListCheckOffService = new ShoppingListCheckOffService();

    return shoppingListCheckOffService;
  };
}

})();
