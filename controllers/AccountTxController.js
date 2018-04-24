'use strict';
const account_tx = require('../models').account_tx;
const Op = require('sequelize').Op;
const balanceToTrade = require('../helpers/metaparser.js').balanceToTrade;

const getTradesByDates = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let account = req.params.account;
  let minDate = req.query.min;
  let maxDate = req.query.max;

  let r;
//SELECT * FROM main.account_tx WHERE account = 'r9ZkXqeLGdKSp13ddpUa6H3fZVE94iBprE' AND (transaction_type = "OfferCreate" OR transaction_type = "Payment") AND human_date BETWEEN '2017-09-01' AND '2017-10-05'
  r = await to (account_tx.findAll({
    attributes: ['hash','ledger_index', 'human_date', 'txn_account', 'tx','meta' ],
    where: {
      account: account,
      transaction_type : {
        [Op.or]:["Payment", "OfferCreate"]
      },
      human_date: {
        [Op.between]: [minDate, maxDate]
      }
    }
  }));
  let trades = balanceToTrade(r[1], account);
  return ReS(res, {res:trades});
}
module.exports.getTradesByDates = getTradesByDates;

const getTradesByLedgers = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let account = req.params.account;
  let minLedger = req.query.min;
  let maxLedger = req.query.max;

  let r;
  r = await to (account_tx.findAll({
    attributes: ['hash','ledger_index', 'human_date', 'meta' ],
    where: {
      account: account,
      transaction_type : {
        [Op.or]:["Payment", "OfferCreate"]
      },
      ledger_index: {
        [Op.between]: [minLedger, maxLedger]
      }
    }
  }));
  let trades = balanceToTrade(r[1], account);
  return ReS(res, {res:trades});
}
module.exports.getTradesByLedgers = getTradesByLedgers;

const getDbByAccDates = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let account = req.params.account;
  let minDate = req.query.min;
  let maxDate = req.query.max;

  let r;
  r = await to (account_tx.findAll({
    where: {
      account: account,
      human_date: {
          [Op.between]: [minDate, maxDate]
      }
    }
  }));
  return ReS(res, {res:r[1]});
}
module.exports.getDbByAccDates = getDbByAccDates;

const getDbByAccLedgers = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let account = req.params.account;
  let minLeder = req.query.min;
  let maxLedger = req.query.max;

  let r;
  r = await to (account_tx.findAll({
    where: {
      account: account,
      ledger_index: {
          [Op.between]: [minLeder, maxLedger]
      }
    }
  }));
  return ReS(res, {res:r[1]});
}
module.exports.getDbByAccLedgers = getDbByAccLedgers;

const getDbByHash = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let hash = req.params.hash;

  let r;
  r = await to (account_tx.findAll({
    where: {
      hash: hash
    }
  }));
  return ReS(res, {res:r[1]});
}
module.exports.getDbByHash = getDbByHash;



/*
router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});

*/
