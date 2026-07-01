const assert = require('assert');
const {
  mergeHistoricalData
} = require('../historical-data-importer');

function testMergeAddsHistoricalVouchersOnce() {
  const existingVoucher = { id: 'v_existing', voucherNo: 'M11506001' };
  const db = {
    vouchers: [existingVoucher],
    bankBalances: {}
  };
  const source = {
    importId: 'world-garden-history-v1',
    vouchers: [
      { id: 'hist_2021_09_expense_security', amount: 139970 },
      { id: 'hist_2021_09_income_management', amount: 83041 }
    ],
    bankBalances: {
      '2021-09': {
        sinopac: { balance: 216796, timeDepositBalance: 400000 },
        union: { balance: 628691, timeDepositBalance: 1500000 }
      }
    }
  };

  const first = mergeHistoricalData(db, source);
  assert.strictEqual(first.addedVoucherCount, 2);
  assert.strictEqual(first.addedBankBalanceCount, 1);
  assert.strictEqual(db.vouchers.length, 3);
  assert.strictEqual(db.bankBalances['2021-09'].sinopac.balance, 216796);

  const second = mergeHistoricalData(db, source);
  assert.strictEqual(second.addedVoucherCount, 0);
  assert.strictEqual(second.addedBankBalanceCount, 0);
  assert.strictEqual(db.vouchers.length, 3);
}

testMergeAddsHistoricalVouchersOnce();
console.log('historical-data-importer tests passed');
