document.addEventListener('DOMContentLoaded', () => {	
  // Данные для рассчета
  const dataCalc = {
    country: '',
    priceCurrency: 0,
    releaseAuto: 0,
    engineVolume: 0,
    enginePower: 0,
    engineType: '',
    typePerson: '',
  }

  // Кнопка рассчета
  document.getElementById("id_count_cost").addEventListener("click", funcPreload);

  // Определение значений в полях
  function funcPreload (e) {
    
    if (document.getElementById("id_price_currency").value === '' || document.getElementById("id_engine_volume").value === '' || document.getElementById("id_engine_power").value === '') return;

    e.preventDefault();

    dataCalc.country = document.getElementById("id_exporting_country").value;
    dataCalc.priceCurrency = Number(document.getElementById("id_price_currency").value);
    dataCalc.releaseAuto = Number(document.getElementById("id_year_release").value);
    dataCalc.engineVolume = Number(document.getElementById("id_engine_volume").value);
    dataCalc.enginePower = Number(document.getElementById("id_engine_power").value);
    dataCalc.engineType = document.getElementById("id_engine_type").value;
    dataCalc.typePerson = document.getElementById("id_type_person").value;


    customsСalculator();
  }

  // Создание сводки расчётов
  function tableCost (сostAuto, recyclingColl, duty, totalAmount) {
    if (document.getElementById('tableCost')) {
      document.getElementById('tableCost').remove();
    }

    var tableCost = document.createElement('div');
    tableCost.setAttribute('id', 'tableCost');
    document.querySelector('.total').appendChild(tableCost);

    var divCost = document.createElement('div');
    divCost.innerHTML = `Стоимость авто: ${сostAuto} рублей`;

    var divRecycling = document.createElement('div');
    divRecycling.innerHTML = `Утилизационный сбор: ${recyclingColl} рублей`;

    var divDuty = document.createElement('div');
    divDuty.innerHTML = `Таможенная пошлина: ${duty} рублей`;

    var divTotal = document.createElement('div');
    divTotal.innerHTML = `Общая цена: ${totalAmount} рублей`;

    tableCost.appendChild(divCost);
    tableCost.appendChild(divRecycling);
    tableCost.appendChild(divDuty);
    tableCost.appendChild(divTotal);
  }
  
  // Главная функция
  function customsСalculator () {

    const finalCost = {
      costAuto: 0,          // Стоимость авто
      customsClearance: 0,  // Таможенное оформление
      recylingColl: 0,      // Утиль
      exciseTax: 0,         // Акциз
      duty: 0,              // Таможенная пошлина
      totalAmount: 0,       // Цена за всё
    }
    const moneyСurrency = {
      JPY: 0.5466,
      CNY: 11.9469,
      KRW: 	0.06369,
      EUR: 95.3447,
    }

    // Перевод цены авто на аукционе
    switch (dataCalc.country) {
      case "Japan":
        finalCost.costAuto = dataCalc.priceCurrency * moneyСurrency.JPY;
        break;
      case "China":
        finalCost.costAuto = dataCalc.priceCurrency * moneyСurrency.CNY;
        break;
      case "Korea":
        finalCost.costAuto = dataCalc.priceCurrency * moneyСurrency.KRW;
        break;
    }

    // Таможенное оформление
    if (true) {
      if (finalCost.costAuto < 200000) finalCost.customsClearance = 775;
      else if (finalCost.costAuto < 450000) finalCost.customsClearance = 	1550;
      else if (finalCost.costAuto < 1200000) finalCost.customsClearance = 3100;
      else if (finalCost.costAuto < 4200000) finalCost.customsClearance = 8530;
      else if (finalCost.costAuto < 4500000) finalCost.customsClearance = 12000;
      else if (finalCost.costAuto < 5500000) finalCost.customsClearance = 15500;
      else if (finalCost.costAuto < 7000000) finalCost.customsClearance = 20000;
      else if (finalCost.costAuto < 8000000) finalCost.customsClearance = 23000;
      else if (finalCost.costAuto < 9000000) finalCost.customsClearance = 25000;
      else if (finalCost.costAuto < 10000000) finalCost.customsClearance = 27000;
      else if (finalCost.costAuto > 10000000) finalCost.customsClearance = 30000;
    }

    // Утилизационный сбор
    if (dataCalc.typePerson === "physical-person"){

      if (dataCalc.engineType === 'electric') {

        if (dataCalc.releaseAuto === 1) finalCost.recylingColl = 20000 * 0.17;
        else if (dataCalc.releaseAuto >= 3) finalCost.recylingColl = 20000 * 0.26;

      } else {

        if (dataCalc.releaseAuto === 1) {
          if (dataCalc.engineVolume <= 1000) finalCost.recylingColl = 20000 * 0.17;
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 2000) finalCost.recylingColl = 20000 * 0.17;
          else if (dataCalc.engineVolume >= 2001 && dataCalc.engineVolume <= 3000) finalCost.recylingColl = 20000 * 0.17;
          else if (dataCalc.engineVolume >= 3001 && dataCalc.engineVolume <= 3500) finalCost.recylingColl = 20000 * 48.5;
          else if (dataCalc.engineVolume >= 3501) finalCost.recylingColl = 20000 * 61.76;
        
        } 
        else if (dataCalc.releaseAuto >= 3) {
          if (dataCalc.engineVolume <= 1000) finalCost.recylingColl = 20000 * 0.26;
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 2000) finalCost.recylingColl = 20000 * 0.26;
          else if (dataCalc.engineVolume >= 2001 && dataCalc.engineVolume <= 3000) finalCost.recylingColl = 20000 * 0.26;
          else if (dataCalc.engineVolume >= 3001 && dataCalc.engineVolume <= 3500) finalCost.recylingColl = 20000 * 74.25;
          else if (dataCalc.engineVolume >= 3501) finalCost.recylingColl = 20000 * 	81.19;
        }
      }

    } else {
       if (dataCalc.engineType === 'electric') {

        if (dataCalc.releaseAuto === 1) finalCost.recylingColl = 150000 * 1.63;
        else if (dataCalc.releaseAuto >= 3) finalCost.recylingColl = 150000 * 6.1;

      } else {

        if (dataCalc.releaseAuto === 1) {
          if (dataCalc.engineVolume <= 1000) finalCost.recylingColl = 20000 * 4.06;
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 2000) finalCost.recylingColl = 150000 * 15.03;
          else if (dataCalc.engineVolume >= 2001 && dataCalc.engineVolume <= 3000) finalCost.recylingColl = 150000 * 42.24;
          else if (dataCalc.engineVolume >= 3001 && dataCalc.engineVolume <= 3500) finalCost.recylingColl = 150000 * 	48.5;
          else if (dataCalc.engineVolume >= 3501) finalCost.recylingColl = 150000 * 61.76;
        } 
        else if (dataCalc.releaseAuto >= 3) {  
          if (dataCalc.engineVolume <= 1000) finalCost.recylingColl = 150000 * 10.36;
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 2000) finalCost.recylingColl = 150000 * 26.44;
          else if (dataCalc.engineVolume >= 2001 && dataCalc.engineVolume <= 3000) finalCost.recylingColl = 150000 * 63.95;
          else if (dataCalc.engineVolume >= 3001 && dataCalc.engineVolume <= 3500) finalCost.recylingColl = 150000 * 74.25;
          else if (dataCalc.engineVolume >= 3501) finalCost.recylingColl = 150000 * 81.19;
        }
      }
    }

    // Пошлина
    if (dataCalc.typePerson === "physical-person") {

      if (dataCalc.engineType === 'electric') {

        finalCost.duty = (finalCost.costAuto * (15 / 100));

      } else {
        if (dataCalc.releaseAuto === 1) {

          // Рассчёт пошлины: объем в кб/см * на фиксированный размер евро в зависимости от стоимости авто в рублях к значениям в евро
          if (finalCost.costAuto < (8500 * moneyСurrency.EUR)) finalCost.duty = ((dataCalc.engineVolume * 2.5) * moneyСurrency.EUR); 
          else if (finalCost.costAuto < (16700 * moneyСurrency.EUR)) finalCost.duty = ((dataCalc.engineVolume * 3.5) * moneyСurrency.EUR);
          else if (finalCost.costAuto < (42300 * moneyСurrency.EUR)) finalCost.duty = ((dataCalc.engineVolume * 5.5) * moneyСurrency.EUR);
          else if (finalCost.costAuto < (84500 * moneyСurrency.EUR)) finalCost.duty = ((dataCalc.engineVolume * 7.5) * moneyСurrency.EUR);
          else if (finalCost.costAuto < (169000 * moneyСurrency.EUR)) finalCost.duty = ((dataCalc.engineVolume * 15) * moneyСurrency.EUR);
          else if (finalCost.costAuto >= (169000 * moneyСurrency.EUR)) finalCost.duty = ((dataCalc.engineVolume * 20) * moneyСurrency.EUR);
        } 
        // Возраст от 3 до 5
        else if (dataCalc.releaseAuto === 3) {
          if (dataCalc.engineVolume <= 1000) finalCost.duty = ((dataCalc.engineVolume * 1.5) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 1500) finalCost.duty = ((dataCalc.engineVolume * 1.7) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 1800) finalCost.duty = ((dataCalc.engineVolume * 2.5) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1801 && dataCalc.engineVolume <= 2300) finalCost.duty = ((dataCalc.engineVolume * 2.7) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 2301 && dataCalc.engineVolume <= 3000) finalCost.duty = ((dataCalc.engineVolume * 3) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 3001) finalCost.duty = ((dataCalc.engineVolume * 3.6) * moneyСurrency.EUR);
        }
        // Возраст более 5
        else if (dataCalc.releaseAuto === 5) {
          if (dataCalc.engineVolume <= 1000) finalCost.duty = ((dataCalc.engineVolume * 3) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 1500) finalCost.duty = ((dataCalc.engineVolume * 3.2) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 1800) finalCost.duty = ((dataCalc.engineVolume * 3.5) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1801 && dataCalc.engineVolume <= 2300) finalCost.duty = ((dataCalc.engineVolume * 4.8) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 2301 && dataCalc.engineVolume <= 3000) finalCost.duty = ((dataCalc.engineVolume * 5) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 3001) finalCost.duty = ((dataCalc.engineVolume * 5.7) * moneyСurrency.EUR);
        }  
      }
    } else {

      if (dataCalc.engineType === 'electric') {

        finalCost.duty = (finalCost.costAuto * (15 / 100));

      } 
      else if (dataCalc.engineType === 'petrol' || dataCalc.engineType === 'p-electric') {

        if (dataCalc.releaseAuto === 1) {
          
          // Рассчёт пошлины: стоимость авто * на фиксированный процент в зависимости от объема двигателя
          if (dataCalc.engineVolume <= 1000) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 1500) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 1800) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
          else if (dataCalc.engineVolume >= 1801 && dataCalc.engineVolume <= 2300) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
          else if (dataCalc.engineVolume >= 2301 && dataCalc.engineVolume <= 2800) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
          else if (dataCalc.engineVolume >= 2801 && dataCalc.engineVolume <= 3000) finalCost.duty = (finalCost.costAuto * (12.5 / 100)); 
          else if (dataCalc.engineVolume >= 3001) finalCost.duty = (finalCost.costAuto * (12.5 / 100)); 
        } 
        else if (dataCalc.releaseAuto === 3) {
          if (dataCalc.engineVolume <= 1000) finalCost.duty = ((dataCalc.engineVolume * 0.36) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 1500) finalCost.duty = ((dataCalc.engineVolume * 0.4) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 1800) finalCost.duty = ((dataCalc.engineVolume * 0.36) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1801 && dataCalc.engineVolume <= 2300) finalCost.duty = ((dataCalc.engineVolume * 0.44) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 2301 && dataCalc.engineVolume <= 2800) finalCost.duty = ((dataCalc.engineVolume * 0.44) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 2801 && dataCalc.engineVolume <= 3000) finalCost.duty = ((dataCalc.engineVolume * 0.44) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 3001) finalCost.duty = ((dataCalc.engineVolume * 0.8) * moneyСurrency.EUR);
        }
        else if (dataCalc.releaseAuto === 5) {
          if (dataCalc.engineVolume <= 1000) finalCost.duty = ((dataCalc.engineVolume * 0.36) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 1001 && dataCalc.engineVolume <= 1500) finalCost.duty = ((dataCalc.engineVolume * 0.4) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 1800) finalCost.duty = ((dataCalc.engineVolume * 0.36) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 1801 && dataCalc.engineVolume <= 2300) finalCost.duty = ((dataCalc.engineVolume * 0.44) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 2301 && dataCalc.engineVolume <= 2800) finalCost.duty = ((dataCalc.engineVolume * 0.44) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 2801 && dataCalc.engineVolume <= 3000) finalCost.duty = ((dataCalc.engineVolume * 0.44) * moneyСurrency.EUR);
          else if (dataCalc.engineVolume >= 3001) finalCost.duty = ((dataCalc.engineVolume * 0.8) * moneyСurrency.EUR);
        }  
      }
      else if (dataCalc.engineType === 'diesel' || dataCalc.engineType === 'd-electric') {

        if (dataCalc.releaseAuto === 1) {
          if (dataCalc.engineVolume <= 1500) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 2500) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
          else if (dataCalc.engineVolume >= 2501) finalCost.duty = (finalCost.costAuto * (15 / 100)); 
        }
        else if (dataCalc.releaseAuto === 3) {
          if (dataCalc.engineVolume <= 1500) finalCost.duty = ((dataCalc.engineVolume * 0.32 ) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 2500) finalCost.duty = ((dataCalc.engineVolume * 0.4) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 2501) finalCost.duty = ((dataCalc.engineVolume * 0.8) * moneyСurrency.EUR); 
        }
        else if (dataCalc.releaseAuto === 5) {
          if (dataCalc.engineVolume <= 1500) finalCost.duty = ((dataCalc.engineVolume * 0.32 ) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 1501 && dataCalc.engineVolume <= 2500) finalCost.duty = ((dataCalc.engineVolume * 0.4) * moneyСurrency.EUR); 
          else if (dataCalc.engineVolume >= 2501) finalCost.duty = ((dataCalc.engineVolume * 0.8) * moneyСurrency.EUR); 
        }
      }
    }

    // Акциз и НДС для юридический лиц рассчитывается для физический считается total
    if(dataCalc.typePerson === "legal-person") {

      // Акциз рассчитывается: лошадиные силы * фиксированную цену 1 л.с в рублях в зависимости от мощности авто
      if (dataCalc.enginePower <= 90) finalCost.exciseTax = dataCalc.enginePower * 0;
      else if (dataCalc.enginePower >= 91 && dataCalc.enginePower <= 150) finalCost.exciseTax = dataCalc.enginePower * 58;
      else if (dataCalc.enginePower >= 151 && dataCalc.enginePower <= 200) finalCost.exciseTax = dataCalc.enginePower * 557;
      else if (dataCalc.enginePower >= 201 && dataCalc.enginePower <= 300) finalCost.exciseTax = dataCalc.enginePower * 912;
      else if (dataCalc.enginePower >= 301 && dataCalc.enginePower <= 400) finalCost.exciseTax = dataCalc.enginePower * 1555;
      else if (dataCalc.enginePower >= 401 && dataCalc.enginePower <= 500 ) finalCost.exciseTax = dataCalc.enginePower * 1609;
      else if (dataCalc.enginePower >= 501) finalCost.exciseTax = dataCalc.enginePower * 1662;

      // Для юридического лица стоимость за всё будет рассчитываться: стоимость авто + утиль + пошлина + таможенное оформление + ((стоимость авто + пошлина + акциз) * 20%)
      finalCost.totalAmount = finalCost.costAuto + finalCost.recylingColl + finalCost.duty + finalCost.customsClearance + ((finalCost.costAuto + finalCost.duty + finalCost.exciseTax) * (20 / 100));

      console.log(`НДС: ${(finalCost.costAuto + finalCost.duty + finalCost.exciseTax) * (20 / 100)}`);
    } else {

      finalCost.totalAmount = finalCost.costAuto + finalCost.recylingColl + finalCost.duty + finalCost.customsClearance;
    }


    // Вводы значений со всеми знаками после запятой
    console.log(
      `Стоимость авто в рублях: ${finalCost.costAuto}`, 
      `Утиль: ${finalCost.recylingColl}`, 
      `Пошлина: ${finalCost.duty}`, 
      `Таможенное оформление: ${finalCost.customsClearance}`, 
      `Акциз: ${finalCost.exciseTax}`);
     
    // Создание сводной таблицы
    tableCost(Number(finalCost.costAuto.toFixed(2)), Number(finalCost.recylingColl.toFixed(2)), Number(finalCost.duty.toFixed(2)), Number(finalCost.totalAmount.toFixed(2)));
  }
});