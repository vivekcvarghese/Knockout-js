
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

            // this.products(this.products().map((data)=>{
            //     return {name:data.name,price:data.price,quantity:ko.observable(data.quantity)}
            //   }))

            this.total = ko.observable(0);
            this.cart = ko.observableArray([]);

            $.getJSON("http://localhost:5000/items", (items) => {
    
                this.cart(items);
                // Grant total calculation
                if (items.length != 0) {
                this.total(items.map((item) => item.price).reduce((a, b) => a + b));
                } else {
                this.total(0);
                }
            });
            

            this.addItem = (item) => {
               
                // console.log(this.cart())
                var match = this.cart().some(element => {
                    if (element.id === item.id) {
                      return true;
                    }
                  
                    return false;
                  });
                // console.log(match)
                if(match == false){

                    
                    // add item to cart
                    fetch("http://localhost:5000/items", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(item),
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data.response);
                            this.cart.push(item);
                            this.total(this.total() + item.price);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                    });
                }
                else{
                    alert("Item already added to cart");
                }
      
               
            };

            // this.removeItem = (item) => {
            //     this.cart.remove(item)
            //     this.total(this.total() - item.price);
            // };

            this.goToCart = () => {
                
                window.location.href = './cart.html';
            };

           

         }
         ko.applyBindings(new AppViewModel());