const assert = require('assert');
const { parseJinwangRows } = require('../import-parser');

function testSettlementReportFormat() {
  const rows = [
    ['社區名稱', '世界花園二期'],
    ['預計入帳日', '2026/06/24'],
    ['統一編號', '82294051'],
    ['銀行分行代號', '8071701'],
    ['撥款帳號', '17001800071272'],
    ['入帳筆數', '1'],
    ['代收手續費', '10'],
    ['匯款手續費', '0'],
    ['撥款金額', '1444'],
    ['入帳報表僅會顯示預計存入社區戶頭交易總額及明細'],
    [],
    ['期別名稱', '戶別代碼', '所有權人', '繳費金額', '繳費日期', '繳費方式', '費用支付模式', '代收手續費', '入帳金額', '銷帳編號', '收據單號'],
    ['115年7月管理費單', '17-2號2樓', '章正文', '1454', '2026/06/23', '信用卡', '內含', '10', '1444', '57602140031513', '18091901-202606-0015']
  ];

  const parsed = parseJinwangRows(rows);

  assert.strictEqual(parsed.headerRowIndex, 11);
  assert.strictEqual(parsed.headers[8], '入帳金額');
  assert.strictEqual(parsed.mappedColumns.amount, 8);
  assert.strictEqual(parsed.records.length, 1);
  assert.deepStrictEqual(parsed.records[0], {
    date: '2026-06-24',
    addr: '17-2號2樓',
    payer: '章正文',
    amount: 1444,
    periodName: '115年7月管理費單',
    feeMonth: '2026-07',
    receiptNo: '18091901-202606-0015',
    paymentMethod: '信用卡'
  });
}

testSettlementReportFormat();
console.log('import-parser tests passed');
