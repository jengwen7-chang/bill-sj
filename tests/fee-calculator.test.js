const assert = require('assert');
const {
  MAINTENANCE_FEE,
  calculateProprietorFees,
  normalizeProprietorFees
} = require('../fee-calculator');

function testFixedFeeIncludesMaintenanceFee() {
  const fees = calculateProprietorFees({
    feeType: 'fixed',
    feeRate: 1304,
    parkingFee: 0
  });

  assert.strictEqual(MAINTENANCE_FEE, 150);
  assert.deepStrictEqual(fees, {
    managementFee: 1304,
    maintenanceFee: 150,
    monthlyFee: 1454
  });
}

function testLegacyMonthlyFeeIsSplitWithoutChangingTotal() {
  const proprietor = normalizeProprietorFees({
    feeType: 'fixed',
    feeRate: 1454,
    parkingFee: 0,
    monthlyFee: 1454
  });

  assert.strictEqual(proprietor.managementFee, 1304);
  assert.strictEqual(proprietor.maintenanceFee, 150);
  assert.strictEqual(proprietor.monthlyFee, 1454);
  assert.strictEqual(proprietor.feeRate, 1304);
}

testFixedFeeIncludesMaintenanceFee();
testLegacyMonthlyFeeIsSplitWithoutChangingTotal();
console.log('fee-calculator tests passed');
