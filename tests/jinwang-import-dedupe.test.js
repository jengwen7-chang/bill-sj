const assert = require('assert');
const {
  createRecordImportKey,
  createVoucherImportKey,
  filterNewImportRecords
} = require('../jinwang-import-dedupe');

function testUsesReceiptNoWhenProvided() {
  const record = {
    date: '2026-06-24',
    addr: 'A1-02F',
    amount: 2083,
    feeMonth: '2026-07',
    receiptNo: '18091901-202607-0001'
  };
  const voucher = {
    type: 'income',
    category: '管理費收入',
    receiptNo: '18091901-202607-0001',
    vendorName: '住戶 (A1-02F)',
    date: '2026-06-24',
    amount: 2083,
    feeMonth: '2026-07'
  };

  assert.strictEqual(createRecordImportKey(record), 'receipt:18091901-202607-0001');
  assert.strictEqual(createVoucherImportKey(voucher), 'receipt:18091901-202607-0001');
  assert.strictEqual(filterNewImportRecords([record], [voucher]).newRecords.length, 0);
  assert.strictEqual(filterNewImportRecords([record], [voucher]).skippedRecords.length, 1);
}

function testFallsBackToStableRowKeyWhenReceiptNoIsGenerated() {
  const record = {
    date: '2026-06-24',
    addr: 'A1-02F',
    amount: 2083,
    feeMonth: '2026-07',
    receiptNo: ''
  };
  const voucher = {
    type: 'income',
    category: '管理費收入',
    receiptNo: 'SL_I1150624001',
    vendorName: '住戶 (A1-02F)',
    date: '2026-06-24',
    amount: 2083,
    feeMonth: '2026-07'
  };

  assert.strictEqual(createRecordImportKey(record), 'row|A1-02F|2026-07|2026-06-24|2083');
  assert.strictEqual(createVoucherImportKey(voucher), 'row|A1-02F|2026-07|2026-06-24|2083');
  assert.strictEqual(filterNewImportRecords([record], [voucher]).newRecords.length, 0);
}

function testSkipsDuplicatesWithinSameFile() {
  const record = {
    date: '2026-06-24',
    addr: 'A1-02F',
    amount: 2083,
    feeMonth: '2026-07',
    receiptNo: ''
  };

  const result = filterNewImportRecords([record, { ...record }], []);

  assert.strictEqual(result.newRecords.length, 1);
  assert.strictEqual(result.skippedRecords.length, 1);
}

testUsesReceiptNoWhenProvided();
testFallsBackToStableRowKeyWhenReceiptNoIsGenerated();
testSkipsDuplicatesWithinSameFile();
console.log('jinwang-import-dedupe tests passed');
