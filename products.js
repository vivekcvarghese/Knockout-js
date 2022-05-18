
         function AppViewModel() {
            this.items = ko.observableArray([
                { id:1, name: 'Shoe', price:40},
                { id:2, name: 'Bag', price:20},
                { id:3, name: 'Shirt', price:15},
                { id:4, name: 'Jeans', price:19},
                { id:5, name: 'Pants', price:17},
                { id:6, name: 'Cap', price:10},
                { id:7, name: 'Jacket', price:25},
                { id:8, name: 'Wallet', price:5},
                { id:9, name: 'T Shirts', price:14}
               
            ]);

            this.total = ko.observable(0);
            this.cart = ko.observableArray([]);
            

            this.addItem = (item) => {
               
                var match = this.cart.indexOf(item)
                if(match == -1){

                    this.cart.push(item);
                    this.total(this.total() + item.price);
                }
                else{
                    alert("Item already added to cart");
                }
      
               
            };

            this.removeItem = (item) => {
                this.cart.remove(item)
                this.total(this.total() - item.price);
            };

         }
         ko.applyBindings(new AppViewModel());