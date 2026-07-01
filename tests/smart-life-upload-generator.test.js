const assert = require('assert');
const {
  buildFeePeriod,
  getNextFeeMonth,
  prepareSmartLifeUploadRows
} = require('../smart-life-upload-generator');

const templateRows = [
  ['社區名稱', '世界花園二期'],
  [null, null, null, null, null, null, ' 建立繳費單的繳費項目及金額'],
  ['戶別Id資料(請勿修改內容資料)', '戶別代碼', '所有權人姓名', '通訊地址', '戶別通訊欄(限50字)', '應繳總額', 'xx費', 'xx費', 'xx費', 'xx費', 'xx費', 'xx費', 'xx費', 'xx費', 'xx費', 'xx費', '繳費開始日期', '繳費結束日期', '條碼到期日期'],
  [null, null, null, '(如留空白則住址處出現戶別代碼)', '此欄備註為戶別各自顯示於繳費單', '(依據右欄費用自動加總)', '1.請將「xx費」改為您要新增的繳費項目 ，並針對每戶輸入應繳金額'],
  ['篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選', '篩選'],
  ['template-id-a3', '17-2號2樓', '章正文', 'A3-02F', null, '=SUM(G6:P6)'],
  ['template-id-a4', '17-3號2樓', '林怡玲', 'A4-02F', null, '=SUM(G7:P7)'],
  ['template-id-office', '管理室', '管理室', '蔡善儒', null, '=SUM(G8:P8)']
];

function testNextFeeMonthCrossesYear() {
  assert.strictEqual(getNextFeeMonth('2026-06'), '2026-07');
  assert.strictEqual(getNextFeeMonth('2026-12'), '2027-01');
}

function testFeePeriodUsesTaiwanYearAndMonthDates() {
  const period = buildFeePeriod('2026-07');

  assert.strictEqual(period.rcYear, 115);
  assert.strictEqual(period.periodLabel, '115年7月管理費');
  assert.strictEqual(period.startDate, '2026/07/01');
  assert.strictEqual(period.endDate, '2026/07/31');
  assert.strictEqual(period.fileMonth, '202607');
}

function testRowsUseTemplateIdentityAndSplitFees() {
  const result = prepareSmartLifeUploadRows({
    templateRows,
    proprietors: [{
      id: 'prop_21',
      building: 'A3棟',
      floor: '02F',
      room: '02F',
      name: '章正文',
      feeType: 'fixed',
      feeRate: 1454,
      parkingFee: 0,
      monthlyFee: 1454
    }],
    targetMonth: '2026-07'
  });

  assert.strictEqual(result.stats.matchedCount, 1);
  assert.deepStrictEqual(result.stats.unmatchedTemplateUnits, ['A4-02F']);
  assert.strictEqual(result.stats.totalAmount, 1454);

  const row = result.rows[5];
  assert.strictEqual(row[0], 'template-id-a3');
  assert.strictEqual(row[1], '17-2號2樓');
  assert.strictEqual(row[2], '章正文');
  assert.strictEqual(row[3], 'A3-02F');
  assert.strictEqual(row[4], '115年7月管理費');
  assert.deepStrictEqual(row[5], { f: 'SUM(G6:P6)' });
  assert.strictEqual(row[6], 1304);
  assert.strictEqual(row[7], 150);
  assert.strictEqual(row[16], '2026/07/01');
  assert.strictEqual(row[17], '2026/07/31');
  assert.strictEqual(row[18], '2026/07/31');
}

testNextFeeMonthCrossesYear();
testFeePeriodUsesTaiwanYearAndMonthDates();
testRowsUseTemplateIdentityAndSplitFees();
console.log('smart-life-upload-generator tests passed');
