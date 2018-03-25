'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('account_tx', {
        account: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        hash: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        ledger_index      : DataTypes.BIGINT,
        date              : DataTypes.BIGINT,
        human_date        : DataTypes.DATE,
        transaction_type  : DataTypes.STRING,
        txn_account       : DataTypes.STRING,
        tx                : DataTypes.TEXT,
        meta              : DataTypes.TEXT
    },
    {
      freezeTableName: true, //disable auto table plural naming
      timestamps: false // disable "created_at" column
    }
  );



    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
