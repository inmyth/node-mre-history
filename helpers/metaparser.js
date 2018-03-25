"use strict";

const inspect = require('util').inspect;
var Big = require('./big.min.js');
const parseOrderbookChanges = require('ripple-lib-transactionparser').parseOrderbookChanges;
const parseBalanceChanges = require('ripple-lib-transactionparser').parseBalanceChanges;

function show(object){
  return inspect(object, false, null);
}

function balanceChanges(raw, myAddress){
  return raw
  .map(r => {
    let meta = JSON.parse(r.meta)
    let balanceChanges = parseBalanceChanges(meta);
    let myBalanceChanges = balanceChanges[myAddress];
    return {hash: r.hash, ledger_index: r.ledger_index, human_date: r.human_date, data : myBalanceChanges};
  })
  .filter(r => r.data !== undefined);
}


const maxFeeXRP  = Big('0.00012');
const zero = Big('0.0');
function balanceToTrade(raw, myAddress){
  return balanceChanges(raw, myAddress)
  .filter(r => r.data.length > 1) // length 1 = payment or fees
  .map(r => {
    let get  = [];
    let pay  = [];
    let fee  = [];

    if (r.data.length == 2){ // order taken or exchange
      for (var i = 0; i < r.data.length; i++){
        balanceToTradePusher(r.data[i], get, pay);
      }
    }
    else {
      // could be offerCreate + consumed (l = 3) or payment (l = any number)
      // we need to filter out xrp fee
      for (var i = 0; i < r.data.length; i++){
        let d = r.data[i];
        if (d.currency === 'XRP' && Big(d.value).lt(zero) && Big(d.value).abs().lte(maxFeeXRP)){
          fee.push(d);
        }
        else{
          balanceToTradePusher(d, get, pay);
        }
      }
    }
    return {hash: r.hash, ledger_index: r.ledger_index, human_date: r.human_date, get : get, pay : pay, fee : fee};
  })
  // exchange has only get or pay filled so trades must have both
  .filter(r => r.get.length > 0 && r.pay.length > 0);
}

function balanceToTradePusher(data, get, pay){
  let bigValue = Big(data.value);
  data.value = toFixed(data.value);
  if (bigValue.lt(zero)){
    pay.push(data);
  } else {
    get.push(data);
  }
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}


module.exports = {
  balanceChanges : balanceChanges,
  balanceToTrade : balanceToTrade
}
