import Cart from "./Cart";

describe("Cart", () => {
  let cart;

  let product = {
    title: "Adiddas running shoes - men",
    price: 35388,
  };

  let product2 = {
    title: "Adiddas running shoes - women",
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe("getTotal()", () => {
    it("should return 0 when getTotal() is executed in a newly created instance", () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it("should multiply quantity and price and receive the total amount", () => {
      cart.add({
        product,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should ensure no more than on product exists at a time", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it("should update total when a product gets included and then removed", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe("checkout()", () => {
    it("should return an object with the total and the list of items", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it("should return an object with the total and the list of items when summary() is called", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it("should reset the cart when checkout() is called", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });
});
