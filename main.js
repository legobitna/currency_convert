const VND = {
  VND: 1,
  USD: 0.000043,
  KRW: 0.052
};

const USD = {
  VND: 23208,
  USD: 1,
  KRW: 1192
};

const KRW = {
  VND: 19.47,
  USD: 0.00084,
  KRW: 1
};

const currencies = { VND, USD, KRW };

function convertMoney() {
  let selectedFrom = document.querySelector(
    'input[name="Fromcurrency"]:checked'
  ).value; //라디오 버튼엔서 환율가져오기
  let selector = document.getElementById("toCurrency"); // 리스트에서 환율가져오기
  let selectedTo = selector[selector.selectedIndex].value;
  let money = document.getElementById("money").value; // 금액 가져오기

  //   let resultAmount = money * getCurrency(selectedFrom, selectedTo); //고정환율로 계산하는것

  //   if (selectedTo == "USD") {
  //     // 소수점 반올림
  //     resultAmount = resultAmount.toFixed(2);
  //   } else {
  //     resultAmount = resultAmount.toFixed(0);
  //   }
  //   let result = document.getElementById("result"); //결과 보여주기
  //   result.innerHTML = `${formatNumber(
  //     money
  //   )} ${selectedFrom} is same amount with ${formatNumber(
  //     resultAmount
  //   )} ${selectedTo}`;

  //   let resultArea = document.getElementById("resultArea"); //숨겨둔 라인 보여주기
  //   resultArea.style.display = "block";

  callApi(selectedFrom, selectedTo, money); //실시간환율로 계산
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const unit = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 1000]; 

function getCoin() {
  let amount = document.getElementById("amount").value;
  let coinAmount = [];
  for (i = 0; i < unit.length; i++) {
    let currentNote = unit[i];
    let denominationNote = Math.floor(amount / currentNote);
    if (denominationNote > 0) {
      amount = amount - denominationNote * currentNote;
    }
    coinAmount[i] = denominationNote;
  }
  console.log("coin amount is", coinAmount);
  let coinResult = document.getElementById("coinResult");
  let denominationsHTML="";
    for (i = 0; i < unit.length; i++) {
      denominationsHTML += `<li>${unit[i]} * ${coinAmount[i]}</li>`;
    }

  // let denominationsHTML = unit.map((_, i) => {
  //   return `<li>${unit[i]} * ${coinAmount[i]}</li>`; // map 을 이용해서 프린트하는 방법
  // });
  coinResult.innerHTML = denominationsHTML;
}


async function callApi (from, to, amount){
  let currency = from + "_" + to;
  console.log(currency);
  let url=`https://free.currencyconverterapi.com/api/v6/convert?q=${currency}&compact=y&apiKey=31afa7038ba9e6066b94`
  let data = await fetch(url);
  let jsonObj = await data.json();
  
  console.log(jsonObj[currency].val);

  console.log(jsonObj[currency].val * amount )
  let resultArea = document.getElementById("resultArea"); //숨겨둔 라인 보여주기
  resultArea.style.display = "block";
  resultArea.innerHTML = `${formatNumber(
        amount
      )} ${from} is same amount with ${formatNumber(
        jsonObj[currency].val * amount
      )} ${to}`;



} 


// async function callApi(from, to, amount) {
//   //API 부르기
//   let currency = from + "_" + to;
//   let url = `https://free.currencyconverterapi.com/api/v6/convert?q=${currency}&compact=y&apiKey=31afa7038ba9e6066b94`;

//   let button = document.getElementById('exchange');
//   button.disabled = true;
//   let data = await fetch(url);
//   let jsonObj = await data.json();
//   button.disabled = false;

//   let realTimeCur = jsonObj[currency].val; // 실시간 환율 json에서 값 읽어오기
//   let resultAmount = amount * realTimeCur; //환전하기

//   if (to == "USD") {
//     // 소수점 반올림
//     resultAmount = resultAmount.toFixed(2);
//   } else {
//     resultAmount = resultAmount.toFixed(0);
//   }
//   resultAmount = formatNumber(resultAmount); // , 붙이기
//   let result = document.getElementById("result"); // HTML에 보여주기
//   result.innerHTML = `${formatNumber(
//     amount
//   )} ${from} is same amount with ${resultAmount} ${to}`;

//   let resultArea = document.getElementById("resultArea"); //숨겨둔 라인 보여주기
//   resultArea.style.display = "block";
// }

// 버튼에 이벤트 추가하기
let button = document.getElementById("exchange");
button.addEventListener("click", convertMoney);

let coinButton = document.getElementById("coinButton");
coinButton.addEventListener("click", getCoin);
