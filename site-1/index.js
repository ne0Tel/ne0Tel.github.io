let prevElementMap = null;
let tablePrice = {
  "RU-AMU": {
    "sedan": 20000,
    "hatchback": 20000,
    "crossover": 25000,
    "jeep": 30000,
    "minibus": 30000,
    "truck": 30000,

    "dayDelivery": 2,
  },
  "RU-KHA": {
    "sedan": 25000,
    "hatchback": 25000,
    "crossover": 30000,
    "jeep": 35000,
    "minibus": 35000,
    "truck": 35000,

    "dayDelivery": 4,
  },
  "RU-MAG": {
    "sedan": 120000,
    "hatchback": 120000,
    "crossover": 120000,
    "jeep": 130000,
    "minibus": 145000,
    "truck": 145000,

    "dayDelivery": 25,
  },
}

document.addEventListener('change', () =>  {

  if (document.getElementById('id_delivery_area').value !== '' && document.getElementById('id_car_body_type').value !== '') {

    insertPriceDelivery(document.getElementById('id_delivery_area').value, document.getElementById('id_car_body_type').value);
    changeColorMap(prevElementMap);
  }

  function changeColorMap (prev) {
    if (prev !== null) {
      prev.setAttribute('fill', "#282828");
      prev.setAttribute('stroke', '#1B1B1B');
    } 

    prevElementMap = document.querySelector( `path[data-code=${document.getElementById('id_delivery_area').value}]`);

    prevElementMap.setAttribute('fill', '#464646');
    prevElementMap.setAttribute('stroke', '#1B1B1B');
  }

  function insertPriceDelivery (code, carBodyType) {
    document.getElementById('id_delivery_price').innerHTML = `Стоимость авто: ${tablePrice[code][carBodyType]} ₽`;
    document.getElementById('id_delivery_time').innerHTML = `Срок доставки: до ${tablePrice[code]["dayDelivery"]}`;
  }
});