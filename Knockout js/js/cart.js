function Cart() {
    this.cart = ko.observableArray([]);
    this.total = ko.observable(0);

    $.getJSON("http://localhost:5000/items", (items) => {
    
        this.cart(items);
        // Grant total calculation
        if (items.length != 0) {
        this.total(items.map((item) => item.price).reduce((a, b) => a + b));
        } else {
        this.total(0);
        }
    });


    this.removeItem = (item) => {
        $.ajax({
          type: "DELETE",
          url: `http://localhost:5000/items/${item.id}`,
          success: (result) => {
            this.cart.remove(item)
            if (this.cart().length != 0) {
              this.total(this.cart().map((data) => data.price).reduce((a, b) => a + b));
            } else {
              this.total(0);
            }
          },
          error: (error) => {
            console.log("error", error);
          },
        });
      };

      this.home = () => {
                
        window.location.href = './products.html';
    };


}
ko.applyBindings(new Cart());