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
let realcur ; // 실시간 환율저장 

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
convertMoney(selectedFrom,selectedTo,money)//실시간환율로 계산 
}

function getCurrency(from, to) { //고정환율계산 
  return currencies[from][to];
  
}
function convertMoney(from,to,money){
  let str=from+'_'+to;
  callApi(str);
  let result = document.getElementById("result");
  let resultArea = document.getElementById("resultArea"); //숨겨둔 라인 보여주기
  resultArea.style.display = "block";
  let resultAmount=money*realcur;
  console.log("resultamount",resultAmount);
  if (to == "USD") {
    // 소수점 반올림
    resultAmount = resultAmount.toFixed(2);
  } else {
    resultAmount = resultAmount.toFixed(0);
  }
 
  result.innerHTML = `${formatNumber(
    money
  )} ${selectedFrom} is same amount with ${formatNumber(
    resultAmount
  )} ${selectedTo}`;
  

}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const unit = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 1000];

function getCoin() {
  let amount = document.getElementById("amount").value;
  let coinAmount = [];
  for (i = 0; i < unit.length; i++) {
    let currentCoin = unit[i];
    let numberOfCoinsPossible = Math.floor(amount / currentCoin);
    if (numberOfCoinsPossible > 0) {
      amount = amount - numberOfCoinsPossible * currentCoin;
    }
    coinAmount[i] = numberOfCoinsPossible;
  }
  console.log("coin amount is", coinAmount);
  let coinResult = document.getElementById("coinResult");
  let hi2 = "";
//   for (i = 0; i < unit.length; i++) {
//     hi += `<li>${unit[i]} * ${coinAmount[i]}</li>`;
//   }

let hi=unit.map((_, i)=> {
    return `<li>${unit[i]} * ${coinAmount[i]}</li>`; // map 을 이용해서 프린트하는 방법 
})
  coinResult.innerHTML = hi;
}

async function callApi(currency) { //API 부르기
    var xhr = new XMLHttpRequest();
    let value;
    await xhr.open('GET', `https://free.currencyconverterapi.com/api/v6/convert?q=${currency}&compact=y&apiKey=31afa7038ba9e6066b94`); // API키 가져오기 
    xhr.onload = function() {
        if (xhr.status === 200) {
            updateResults(JSON.parse(xhr.responseText),currency);
            let jsonObj=JSON.parse(xhr.responseText);
            value=jsonObj[currency];
           // updateResults(value)

        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
   await xhr.send();
    // 끝
    
  }


  function updateResults(response,currency) {
    console.log(response);
    let jsonObj=response
    console.log(jsonObj[currency].val,"2222222222222")
    realcur=jsonObj[currency].val;
    console.log(realcur)
    let board=document.getElementById("currencyBoard");
    board.innerHTML=realcur
  }



// 버튼에 이벤트 추가하기
let button = document.getElementById("exchange");
button.addEventListener("click", convertMoney);

let coinButton = document.getElementById("coinButton");
coinButton.addEventListener("click", getCoin);

