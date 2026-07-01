const assert = require('assert');
const { evaluateFeeStatus } = require('../fee-status-calculator');

const proprietor = {
  id: 'prop_annual',
  monthlyFee: 2083
};

function testAnnualPrepaymentCoversFollowingMonths() {
  const annualVoucher = {
    id: 'v_annual',
    type: 'income',
    category: '管理費收入',
    proprietorId: proprietor.id,
    feeMonth: '2026-06',
    amount: 2083 * 7,
    summary: '06F 管理費收繳 - 預繳至115/12(年繳)',
    date: '2026-06-24',
    voucherNo: 'I11506001'
  };

  const status = evaluateFeeStatus({
    proprietor,
    vouchers: [annualVoucher],
    targetMonth: '2026-07'
  });

  assert.strictEqual(status.isPaid, true);
  assert.strictEqual(status.isPrepaidCoverage, true);
  assert.strictEqual(status.coveredValue, 2083);
  assert.strictEqual(status.collected, 0);
  assert.strictEqual(status.voucher.id, 'v_annual');
}

function testAnnualPrepaymentDoesNotCoverAfterEndMonth() {
  const annualVoucher = {
    id: 'v_annual',
    type: 'income',
    category: '管理費收入',
    proprietorId: proprietor.id,
    feeMonth: '2026-06',
    amount: 2083 * 7,
    summary: '06F 管理費收繳 - 預繳至115/12(年繳)',
    date: '2026-06-24',
    voucherNo: 'I11506001'
  };

  const status = evaluateFeeStatus({
    proprietor,
    vouchers: [annualVoucher],
    targetMonth: '2027-01'
  });

  assert.strictEqual(status.isPaid, false);
  assert.strictEqual(status.coveredValue, 0);
}

function testLargePaymentWithoutEndMonthInfersCoverageByAmount() {
  const lumpSumVoucher = {
    id: 'v_lump',
    type: 'income',
    category: '管理費收入',
    proprietorId: proprietor.id,
    feeMonth: '2026-06',
    amount: 2083 * 12,
    summary: '今網自動匯入 - 115年6月 管理費',
    date: '2026-06-24',
    voucherNo: 'I11506002'
  };

  const status = evaluateFeeStatus({
    proprietor,
    vouchers: [lumpSumVoucher],
    targetMonth: '2026-11'
  });

  assert.strictEqual(status.isPaid, true);
  assert.strictEqual(status.isPrepaidCoverage, true);
  assert.strictEqual(status.coveredValue, 2083);
}

function testCurrentMonthPaymentKeepsActualCollectedAmount() {
  const monthlyVoucher = {
    id: 'v_monthly',
    type: 'income',
    category: '管理費收入',
    proprietorId: proprietor.id,
    feeMonth: '2026-07',
    amount: 2083,
    summary: '07F 管理費收繳',
    date: '2026-07-10',
    voucherNo: 'I11507001'
  };

  const status = evaluateFeeStatus({
    proprietor,
    vouchers: [monthlyVoucher],
    targetMonth: '2026-07'
  });

  assert.strictEqual(status.isPaid, true);
  assert.strictEqual(status.isPrepaidCoverage, false);
  assert.strictEqual(status.collected, 2083);
  assert.strictEqual(status.coveredValue, 2083);
}

testAnnualPrepaymentCoversFollowingMonths();
testAnnualPrepaymentDoesNotCoverAfterEndMonth();
testLargePaymentWithoutEndMonthInfersCoverageByAmount();
testCurrentMonthPaymentKeepsActualCollectedAmount();
console.log('fee-status-calculator tests passed');
