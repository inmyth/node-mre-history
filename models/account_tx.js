'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('account_tx', {
        account           : DataTypes.STRING,
        hash              : DataTypes.STRING,
        ledger_index      : DataTypes.BIGINT,
        date              : DataTypes.BIGINT,
        human_date        : DataTypes.DATE,
        transaction_type  : DataTypes.STRING,
        txn_account       : DataTypes.STRING,
        tx                : DataTypes.TEXT,
        meta              : DataTypes.TEXT
    });



    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
