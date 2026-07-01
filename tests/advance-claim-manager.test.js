const assert = require('assert');
const {
  calculateAdvanceClaimSummary,
  createAdvanceClaimVoucherDraft
} = require('../advance-claim-manager');

const items = [
  {
    id: 'pc_1',
    index: '01',
    date: '2026-06-02',
    category: '行政事務費',
    summary: '影印紙代墊',
    income: 0,
    expense: 300,
    status: 'unreimbursed'
  },
  {
    id: 'pc_2',
    index: '02',
    date: '2026-06-10',
    category: '雜支',
    summary: '清潔用品代墊',
    income: 0,
    expense: 500,
    status: 'reimbursed'
  },
  {
    id: 'pc_3',
    index: '03',
    date: '2026-05-31',
    category: '雜支',
    summary: '郵資代墊',
    income: 0,
    expense: 100,
    status: 'unreimbursed'
  }
];

function testSummaryTracksClaimsNotCashBalance() {
  const summary = calculateAdvanceClaimSummary(items, '2026-06');

  assert.deepStrictEqual(summary, {
    monthExpense: 800,
    unreimbursed: 400,
    reimbursed: 500
  });
}

function testVoucherDraftUsesTransferForAdvanceClaims() {
  const draft = createAdvanceClaimVoucherDraft([items[0], items[1]]);

  assert.strictEqual(draft.amount, 800);
  assert.strictEqual(draft.paymentMethod, 'transfer');
  assert.strictEqual(draft.bankInfo, '請填代墊人匯款帳戶');
  assert.strictEqual(draft.receiptNo, '檢附代墊明細與憑證');
  assert.strictEqual(draft.fixedType, 'non-fixed');
  assert.strictEqual(draft.summary, '115年6月份-代墊請款 (項目 01, 02)');
}

testSummaryTracksClaimsNotCashBalance();
testVoucherDraftUsesTransferForAdvanceClaims();
console.log('advance-claim-manager tests passed');
