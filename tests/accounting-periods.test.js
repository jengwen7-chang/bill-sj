const assert = require('assert');
const {
  getExpenseVoucherPeriodMonth,
  getFinancialReportPeriod,
  isDateInFinancialReportPeriod
} = require('../accounting-periods');

function testExpenseVoucherPeriodUsesTwentySixToTwentyFive() {
  assert.strictEqual(getExpenseVoucherPeriodMonth('2026-05-25'), '2026-05');
  assert.strictEqual(getExpenseVoucherPeriodMonth('2026-05-26'), '2026-06');
  assert.strictEqual(getExpenseVoucherPeriodMonth('2026-06-25'), '2026-06');
  assert.strictEqual(getExpenseVoucherPeriodMonth('2026-06-26'), '2026-07');
}

function testFinancialReportPeriodUsesSixToFive() {
  const period = getFinancialReportPeriod('2025', '05');

  assert.strictEqual(period.startDate, '2025-05-06');
  assert.strictEqual(period.endDate, '2025-06-05');
  assert.strictEqual(isDateInFinancialReportPeriod('2025-05-05', '2025', '05'), false);
  assert.strictEqual(isDateInFinancialReportPeriod('2025-05-06', '2025', '05'), true);
  assert.strictEqual(isDateInFinancialReportPeriod('2025-06-05', '2025', '05'), true);
  assert.strictEqual(isDateInFinancialReportPeriod('2025-06-06', '2025', '05'), false);
}

testExpenseVoucherPeriodUsesTwentySixToTwentyFive();
testFinancialReportPeriodUsesSixToFive();
console.log('accounting-periods tests passed');
