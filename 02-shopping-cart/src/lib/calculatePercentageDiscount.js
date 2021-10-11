import Dinero from "dinero.js";

const Money = Dinero;

const calculatePercentageDiscount = (amount, { condition, quantity }) => {
  if (condition?.percentage && quantity > condition.minimum) {
    return amount.percentage(condition.percentage);
  }

  return Money({ amount: 0 });
};

export default calculatePercentageDiscount;
