//show shop
OregonH.UI.showShop = function(products){
    
     //get shop area
     var shopDiv = document.getElementById('shop');
     shopDiv.classList.remove('hidden');
    
     //init the shop just once
     if(!this.shopInitiated) {
    
       //event delegation
       shopDiv.addEventListener('click', function(e){
         //what was clicked
         var target = e.target || e.src;
    
         //exit button
         if(target.tagName == 'BUTTON') {
           //resume journey
           shopDiv.classList.add('hidden');
           OregonH.UI.game.resumeJourney();
         }
         else if(target.tagName == 'DIV' && target.className.match(/product/)) {
    
           OregonH.UI.buyProduct({
             item: target.getAttribute('data-item'),
             qty: target.getAttribute('data-qty'),
             price: target.getAttribute('data-price')
           });
    
         }
       });
    
       this.shopInitiated = true;
     }
    
     //clear existing content
     var prodsDiv = document.getElementById('prods');
     prodsDiv.innerHTML = '';
    
     //show products
     var product;
     for(var i=0; i < products.length; i++) {
       product = products[i];
       prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
     }
   };
    
   //buy product
   OregonH.UI.buyProduct = function(product) {
     //check we can afford it
     if(product.price > OregonH.UI.caravan.money) {
       OregonH.UI.notify('Not enough money', 'negative');
       return false;
     }
    
     OregonH.UI.caravan.money -= product.price;
    
     OregonH.UI.caravan[product.item] += +product.qty;
    
     OregonH.UI.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');
    
     //update weight
     OregonH.UI.caravan.updateWeight();
    
     //update visuals
     OregonH.UI.refreshStats();
   };