import Dinero from "dinero.js";
import calculatePercentageDiscount from "./calculatePercentageDiscount";
import calculateQuantityDiscount from "./calculateQuantityDiscount";

const Money = Dinero;

const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map((cond) => {
      if (cond.percentage) {
        return calculatePercentageDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      }

      if (cond.quantity) {
        return calculateQuantityDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
};

export default calculateDiscount;
