const form = document.getElementById("calculatorForm");

const resetBtn = document.getElementById("resetBtn");

const productCost = document.getElementById("productCost");
const packagingCost = document.getElementById("packagingCost");
const deliveryCost = document.getElementById("deliveryCost");
const shipmentCost = document.getElementById("shipmentCost");
const quantity = document.getElementById("quantity");
const profitMargin = document.getElementById("profitMargin");

const unitCostEl = document.getElementById("unitCost");
const orderCostEl = document.getElementById("orderCost");
const sellingPriceEl = document.getElementById("sellingPrice");
const totalProfitEl = document.getElementById("totalProfit");

const bProduct = document.getElementById("bProduct");
const bPackaging = document.getElementById("bPackaging");
const bDelivery = document.getElementById("bDelivery");
const bShipment = document.getElementById("bShipment");
const bQuantity = document.getElementById("bQuantity");
const bMargin = document.getElementById("bMargin");

const money = (value) =>
  "৳" +
  new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const safeNumber = (input, fallback = 0) => {
  const value = Number.parseFloat(input.value);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
};

function calculate() {
  const product = safeNumber(productCost);
  const packaging = safeNumber(packagingCost);
  const delivery = safeNumber(deliveryCost);
  const shipment = safeNumber(shipmentCost);

  const qty = Math.max(1, Math.floor(safeNumber(quantity, 1)));
  const margin = safeNumber(profitMargin);

  const unitCost = product + packaging + delivery + shipment;

  const orderCost = unitCost * qty;

  const sellingPrice = unitCost + (unitCost * margin / 100);

  const totalProfit = (sellingPrice - unitCost) * qty;

  unitCostEl.textContent = money(unitCost);
  orderCostEl.textContent = money(orderCost);
  sellingPriceEl.textContent = money(sellingPrice);
  totalProfitEl.textContent = money(totalProfit);

  bProduct.textContent = money(product);
  bPackaging.textContent = money(packaging);
  bDelivery.textContent = money(delivery);
  bShipment.textContent = money(shipment);
  bQuantity.textContent = qty;
  bMargin.textContent =
    margin.toFixed(2).replace(".00", "") + "%";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  calculate();
});

[
  productCost,
  packagingCost,
  deliveryCost,
  shipmentCost,
  quantity,
  profitMargin,
].forEach((input) => {
  input.addEventListener("input", calculate);
});

resetBtn.addEventListener("click", () => {
  form.reset();

  quantity.value = 1;
  profitMargin.value = 20;

  calculate();
  productCost.focus();
});

calculate();