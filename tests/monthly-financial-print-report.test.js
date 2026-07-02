const assert = require('assert');
const {
  createMonthlyFinancialPrintReport
} = require('../monthly-financial-print-report');

function testBuildsReferenceStyleMonthlyReportData() {
  const report = createMonthlyFinancialPrintReport({
    year: '2025',
    month: '05',
    vouchers: [
      {
        type: 'income',
        date: '2025-05-31',
        vendorName: '管理費收入',
        category: '管理費收入',
        amount: 69957,
        summary: '114年5月 歷史收支彙總 - 項目：管理費收入'
      },
      {
        type: 'expense',
        date: '2025-05-31',
        vendorName: '保全服務費',
        category: '物業管理費',
        amount: 72985,
        summary: '114年5月 歷史收支彙總 - 項目：保全服務費'
      }
    ],
    bankBalances: {
      '2025-04': {
        sinopac: { balance: 1572038, timeDepositBalance: 200000 },
        union: { balance: 183025, timeDepositBalance: 1549951 }
      },
      '2025-05': {
        sinopac: { balance: 594182, timeDepositBalance: 1200000 },
        union: { balance: 183723, timeDepositBalance: 1549951 }
      }
    }
  });

  assert.strictEqual(report.title, '鴻邦世界花園第二期管理委員會114年5月收支總表');
  assert.strictEqual(report.periodLabel, '114年5月6日~6月5日');
  assert.deepStrictEqual(report.incomeRows[0], {
    dateLabel: '全月',
    subject: '管理費收入',
    amount: 69957
  });
  assert.deepStrictEqual(report.expenseRows[0], {
    dateLabel: '全月',
    subject: '定存',
    amount: 1000000
  });
  assert.strictEqual(report.expenseRows[1].subject, '保全服務費');
  assert.strictEqual(report.incomeTotal, 69957);
  assert.strictEqual(report.expenseTotal, 1072985);
  assert.strictEqual(report.bankSections.sinopac.active.beginning, 1572038);
  assert.strictEqual(report.bankSections.sinopac.active.income, 69957);
  assert.strictEqual(report.bankSections.sinopac.active.expense, 1072985);
  assert.strictEqual(report.bankSections.sinopac.active.ending, 594182);
  assert.strictEqual(report.bankSections.sinopac.timeDeposit.income, 1000000);
  assert.strictEqual(report.bankGrandTotal, 3527856);
}

function testCalculatesRepairReserveAndPublicFund() {
  const report = createMonthlyFinancialPrintReport({
    year: '2026',
    month: '07',
    vouchers: [
      {
        type: 'income',
        date: '2026-07-06',
        vendorName: 'A1-02F 管理費',
        category: '管理費收入',
        amount: 2083,
        maintenanceFee: 150,
        summary: '管理費$1,933 + 維護費$150'
      },
      {
        type: 'income',
        date: '2026-07-07',
        vendorName: 'A1-03F 管理費',
        category: '管理費收入',
        amount: 2083,
        summary: '管理費$1,933 + 維護費$150'
      },
      {
        type: 'expense',
        date: '2026-07-08',
        vendorName: '清潔費',
        category: '清潔服務費',
        amount: 1000
      }
    ],
    bankBalances: {
      '2026-06': {
        repairReserveFund: 5000,
        sinopac: { balance: 10000, timeDepositBalance: 20000 },
        union: { balance: 30000, timeDepositBalance: 40000 }
      },
      '2026-07': {
        sinopac: { balance: 11000, timeDepositBalance: 20000 },
        union: { balance: 31000, timeDepositBalance: 40000 }
      }
    }
  });

  assert.strictEqual(report.maintenanceFeeIncome, 300);
  assert.strictEqual(report.repairReserveContribution, 287);
  assert.strictEqual(report.repairReserveFund, 5587);
  assert.strictEqual(report.bankGrandTotal, 102000);
  assert.strictEqual(report.publicFund, 96413);
}

function testMonthlyReportUsesFinancialPeriodSixToFive() {
  const report = createMonthlyFinancialPrintReport({
    year: '2025',
    month: '05',
    vouchers: [
      { type: 'income', date: '2025-05-05', category: '管理費收入', amount: 100 },
      { type: 'income', date: '2025-05-06', category: '管理費收入', amount: 200 },
      { type: 'expense', date: '2025-06-05', category: '電費', amount: 80 },
      { type: 'expense', date: '2025-06-06', category: '水費', amount: 40 }
    ],
    bankBalances: {}
  });

  assert.strictEqual(report.incomeTotal, 200);
  assert.strictEqual(report.expenseTotal, 80);
}

function testSummarizesUnitFeeIncomeLikeHistoricalReport() {
  const report = createMonthlyFinancialPrintReport({
    year: '2026',
    month: '06',
    vouchers: [
      {
        type: 'income',
        date: '2026-06-06',
        vendorName: '住戶A (管理費)',
        category: '管理費收入',
        amount: 2083,
        managementFee: 1933,
        maintenanceFee: 150
      },
      {
        type: 'income',
        date: '2026-06-07',
        vendorName: '住戶B (管理費)',
        category: '管理費收入',
        amount: 2091,
        managementFee: 1941,
        maintenanceFee: 150
      },
      {
        type: 'income',
        date: '2026-06-08',
        vendorName: '利息收入',
        category: '利息收入',
        amount: 500
      },
      {
        type: 'income',
        date: '2026-06-09',
        vendorName: '住戶 (8樓-C2)',
        category: '管理費收入',
        amount: 1800
      }
    ],
    bankBalances: {}
  });

  assert.deepStrictEqual(report.incomeRows, [
    { dateLabel: '全月', subject: '管理費收入', amount: 5524 },
    { dateLabel: '全月', subject: '維護費收入', amount: 450 },
    { dateLabel: '全月', subject: '利息收入', amount: 500 }
  ]);
  assert.strictEqual(report.incomeTotal, 6474);
}

function testDoesNotAllocateTenPercentWhenNetIncomeIsNegative() {
  const report = createMonthlyFinancialPrintReport({
    year: '2026',
    month: '08',
    vouchers: [
      {
        type: 'income',
        date: '2026-08-06',
        category: '管理費收入',
        amount: 150,
        maintenanceFee: 150
      },
      {
        type: 'expense',
        date: '2026-08-07',
        category: '維修費',
        amount: 1000
      }
    ],
    bankBalances: {
      '2026-07': {
        repairReserveFund: 5587
      },
      '2026-08': {
        repairReserveFund: 6000,
        sinopac: { balance: 5000 },
        union: { balance: 3000 }
      }
    }
  });

  assert.strictEqual(report.suggestedRepairReserveFund, 5737);
  assert.strictEqual(report.repairReserveFund, 6000);
  assert.strictEqual(report.repairReserveContribution, 0);
  assert.strictEqual(report.publicFund, 2000);
}

function testSinoPacTransactionsReconciliation() {
  const report = createMonthlyFinancialPrintReport({
    year: '2026',
    month: '07',
    vouchers: [
      {
        type: 'income',
        date: '2026-07-06',
        vendorName: '管理費收入',
        category: '管理費收入',
        amount: 2000,
        summary: '管理費'
      },
      {
        type: 'expense',
        date: '2026-07-10',
        category: '清潔服務費',
        amount: 5000,
        summary: '估計清潔費'
      }
    ],
    bankBalances: {
      '2026-06': {
        repairReserveFund: 10000,
        sinopac: { balance: 20000 },
        union: { balance: 10000 }
      },
      '2026-07': {
        repairReserveFund: 10000,
        sinopac: { balance: 15000 },
        union: { balance: 10000 }
      }
    },
    sinopacTransactions: [
      {
        date: '2026-07-08',
        expense: 1500,
        income: 0,
        balance: 18500,
        summary: '電子轉帳',
        memo: '實際電梯保養費'
      },
      {
        date: '2026-07-12',
        expense: 3500,
        income: 0,
        balance: 15000,
        summary: '電子轉帳',
        memo: '實際垃圾清運費'
      },
      {
        date: '2026-07-21',
        expense: 0,
        income: 300,
        balance: 15300,
        summary: '利息存入',
        memo: ''
      }
    ]
  });

  // Verify that the expense rows are derived from sinopacTransactions instead of vouchers
  assert.strictEqual(report.expenseRows.length, 2);
  assert.deepStrictEqual(report.expenseRows[0], {
    dateLabel: '7/8',
    subject: '實際電梯保養費',
    amount: 1500
  });
  assert.deepStrictEqual(report.expenseRows[1], {
    dateLabel: '7/12',
    subject: '實際垃圾清運費',
    amount: 3500
  });
  assert.strictEqual(report.expenseTotal, 5000);

  // Verify that the interest transaction from CSV is automatically added to incomeRows
  assert.strictEqual(report.incomeRows.length, 2);
  assert.deepStrictEqual(report.incomeRows[1], {
    dateLabel: '7/21',
    subject: '利息存入',
    amount: 300
  });
  assert.strictEqual(report.incomeTotal, 2300);
}

testBuildsReferenceStyleMonthlyReportData();
testSinoPacTransactionsReconciliation();
testCalculatesRepairReserveAndPublicFund();
testMonthlyReportUsesFinancialPeriodSixToFive();
testSummarizesUnitFeeIncomeLikeHistoricalReport();
testDoesNotAllocateTenPercentWhenNetIncomeIsNegative();
console.log('monthly-financial-print-report tests passed');
