(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./accounting-periods'));
  } else {
    root.MonthlyFinancialPrintReport = factory(root.AccountingPeriods);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (AccountingPeriods) {
  const BANK_KEYS = ['sinopac', 'union'];
  const LEGACY_UNIT_MAINTENANCE_FEE = 150;

  function toNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function toTaiwanYear(year) {
    return Number(year) - 1911;
  }

  function getPreviousYearMonth(year, month) {
    const date = new Date(Number(year), Number(month) - 2, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  function getNextMonthLabel(year, month) {
    const date = new Date(Number(year), Number(month), 1);
    return `${date.getMonth() + 1}月`;
  }

  function getVoucherSubject(voucher) {
    return voucher.vendorName || voucher.category || voucher.summary || '未分類';
  }

  function getTransactionSubject(tx) {
    const summary = String(tx.summary || '').trim();
    const memo = String(tx.memo || '').trim();
    
    let subject;
    if (summary && memo) {
      const genericTerms = ['電子轉帳', '跨行轉帳', '轉帳', 'ATM轉帳', '網銀轉帳', '代收轉帳', '轉帳存入', '跨行轉入', '存入', '支出'];
      const isGeneric = genericTerms.some(term => summary.includes(term)) && !summary.includes('利息');
      if (isGeneric) {
        subject = memo;
      } else {
        const isNumericMemo = /^\d+$/.test(memo);
        subject = isNumericMemo ? summary : `${summary} (${memo})`;
      }
    } else {
      subject = summary || memo || '未分類支出';
    }
    
    // 統一將「零用金章正文」或「章正文」替換為「零用金」
    subject = subject.replace(/零用金章正文/g, '零用金').replace(/章正文/g, '零用金');
    return subject;
  }

  function getVoucherDateLabel(voucher, reportYear, reportMonth) {
    if (!voucher.date) return '全月';

    const [year, month, day] = voucher.date.split('-').map(part => Number(part));
    const lastDay = new Date(year, month, 0).getDate();
    if (String(year) === String(reportYear) && String(month).padStart(2, '0') === String(reportMonth) && day === lastDay) {
      return '全月';
    }
    return `${toTaiwanYear(year)}/${month}`;
  }

  function monthToIndex(yearMonth) {
    const match = String(yearMonth || '').match(/^(\d{4})-(\d{2})$/);
    if (!match) return null;
    return parseInt(match[1], 10) * 12 + parseInt(match[2], 10) - 1;
  }

  function buildVoucherRows(vouchers, type, year, month, proprietors = []) {
    if (type === 'income') {
      return buildIncomeRows(vouchers, year, month, proprietors);
    }

    return vouchers
      .filter(voucher => voucher.type === type)
      .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')))
      .map(voucher => ({
        dateLabel: getVoucherDateLabel(voucher, year, month),
        subject: getVoucherSubject(voucher),
        amount: toNumber(voucher.amount)
      }));
  }

  function addSummaryRow(summaryMap, subject, amount) {
    if (!amount) return;
    if (!summaryMap.has(subject)) {
      summaryMap.set(subject, { dateLabel: '全月', subject, amount: 0 });
    }
    summaryMap.get(subject).amount += amount;
  }

  function buildIncomeRows(vouchers, targetYear, targetMonth, proprietors = []) {
    const summaryMap = new Map();
    const targetYearMonth = `${targetYear}-${targetMonth}`;
    const targetIndex = monthToIndex(targetYearMonth);

    // 建立住戶月費對照表
    const proprietorMap = new Map(proprietors.map(p => {
      const mgmt = toNumber(p.managementFee) || 0;
      const maint = toNumber(p.maintenanceFee) || 0;
      return [p.id, { managementFee: mgmt, maintenanceFee: maint, monthlyFee: mgmt + maint }];
    }));

    vouchers
      .filter(voucher => voucher.type === 'income')
      .forEach(voucher => {
        if (voucher.category === '管理費收入') {
          if (voucher.proprietorId) {
            const prop = proprietorMap.get(voucher.proprietorId);
            let monthlyMgmt = prop ? prop.managementFee : 0;
            let monthlyMaint = prop ? prop.maintenanceFee : getVoucherMaintenanceFee(voucher);
            
            if (monthlyMgmt + monthlyMaint === 0) {
              monthlyMaint = getVoucherMaintenanceFee(voucher);
              monthlyMgmt = Math.max(0, toNumber(voucher.amount) - monthlyMaint);
            }
            
            const monthlyTotal = monthlyMgmt + monthlyMaint;
            const amount = toNumber(voucher.amount);
            
            // 計算涵蓋月份
            const startMonth = voucher.feeMonth || (voucher.date ? voucher.date.substring(0, 7) : '');
            const startIndex = monthToIndex(startMonth);
            const monthsCovered = monthlyTotal > 0 ? Math.max(1, Math.floor(amount / monthlyTotal)) : 1;
            const endIndex = startIndex !== null ? (startIndex + monthsCovered - 1) : null;
            
            const isCovered = startIndex !== null && targetIndex !== null && startIndex <= targetIndex && targetIndex <= endIndex;
            const isReceiptMonth = voucher.date && AccountingPeriods.isDateInFinancialReportPeriod(voucher.date, targetYear, targetMonth);
            
            const recognizedMgmt = isCovered ? monthlyMgmt : 0;
            const recognizedMaint = isCovered ? monthlyMaint : 0;
            const prepaidAdjustment = (isReceiptMonth ? amount : 0) - recognizedMgmt - recognizedMaint;
            
            if (recognizedMgmt > 0) {
              addSummaryRow(summaryMap, '管理費收入', recognizedMgmt);
            }
            if (recognizedMaint > 0) {
              addSummaryRow(summaryMap, '維護費收入', recognizedMaint);
            }
            if (prepaidAdjustment !== 0) {
              addSummaryRow(summaryMap, '預收管理費', prepaidAdjustment);
            }
          } else {
            // Legacy / no proprietor fallback: count entirely in receipt month
            if (voucher.date && AccountingPeriods.isDateInFinancialReportPeriod(voucher.date, targetYear, targetMonth)) {
              const maintenanceFee = getVoucherMaintenanceFee(voucher);
              const managementFee = Math.max(0, toNumber(voucher.amount) - maintenanceFee);
              addSummaryRow(summaryMap, '管理費收入', managementFee);
              addSummaryRow(summaryMap, '維護費收入', maintenanceFee);
            }
          }
          return;
        }

        // 非管理費收入的其它收入（僅在收件月份計入）
        if (voucher.date && AccountingPeriods.isDateInFinancialReportPeriod(voucher.date, targetYear, targetMonth)) {
          addSummaryRow(summaryMap, getVoucherSubject(voucher), toNumber(voucher.amount));
        }
      });

    return Array.from(summaryMap.values());
  }

  function getBankBalance(bankBalances, yearMonth, bankKey) {
    const bank = (bankBalances[yearMonth] && bankBalances[yearMonth][bankKey]) || {};
    return {
      balance: toNumber(bank.balance),
      interest: toNumber(bank.interest),
      timeDepositBalance: toNumber(bank.timeDepositBalance),
      timeDepositInterest: toNumber(bank.timeDepositInterest)
    };
  }

  function getMonthBankData(bankBalances, yearMonth) {
    return bankBalances[yearMonth] || {};
  }

  function getStoredRepairReserveFund(bankBalances, yearMonth) {
    const value = getMonthBankData(bankBalances, yearMonth).repairReserveFund;
    return value === undefined || value === null || value === '' ? null : toNumber(value);
  }

  function getVoucherMaintenanceFee(voucher) {
    if (voucher.maintenanceFee !== undefined && voucher.maintenanceFee !== null && voucher.maintenanceFee !== '') {
      return Math.min(toNumber(voucher.maintenanceFee), toNumber(voucher.amount));
    }
    if (String(voucher.category || '').includes('維護費')) {
      return toNumber(voucher.amount);
    }

    const summary = String(voucher.summary || '');
    const match = summary.match(/維護費\s*\$?\s*([\d,]+)/);
    if (!match) {
      const isLegacyUnitManagementFee = voucher.category === '管理費收入' && (
        String(voucher.vendorName || '').includes('(管理費)') ||
        String(voucher.vendorName || '').startsWith('住戶') ||
        Boolean(voucher.proprietorId) ||
        Boolean(voucher.feeMonth)
      );
      return isLegacyUnitManagementFee ? Math.min(LEGACY_UNIT_MAINTENANCE_FEE, toNumber(voucher.amount)) : 0;
    }

    return Math.min(toNumber(match[1].replace(/,/g, '')), toNumber(voucher.amount));
  }

  function sumRows(rows) {
    return rows.reduce((sum, row) => sum + toNumber(row.amount), 0);
  }

  function createBankSection(previous, current, income, expense) {
    return {
      active: {
        beginning: previous.balance,
        income,
        expense,
        ending: current.balance
      },
      timeDeposit: {
        beginning: previous.timeDepositBalance,
        income: Math.max(0, current.timeDepositBalance - previous.timeDepositBalance),
        expense: Math.max(0, previous.timeDepositBalance - current.timeDepositBalance),
        ending: current.timeDepositBalance
      }
    };
  }

  function createMonthlyFinancialPrintReport({ year, month, vouchers = [], bankBalances = {}, sinopacTransactions = [], proprietors = [] }) {
    const yearMonth = `${year}-${month}`;
    const previousYearMonth = getPreviousYearMonth(year, month);
    const monthNumber = Number(month);
    const rcYear = toTaiwanYear(year);

    const monthlyVouchers = vouchers.filter(voucher => (
      voucher.date && AccountingPeriods.isDateInFinancialReportPeriod(voucher.date, year, month)
    ));
    const previousBanks = Object.fromEntries(BANK_KEYS.map(key => [key, getBankBalance(bankBalances, previousYearMonth, key)]));
    const currentBanks = Object.fromEntries(BANK_KEYS.map(key => [key, getBankBalance(bankBalances, yearMonth, key)]));
    const sinopacTimeDepositDelta = currentBanks.sinopac.timeDepositBalance - previousBanks.sinopac.timeDepositBalance;

    const incomeRows = buildVoucherRows(vouchers, 'income', year, month, proprietors);
    
    // 判斷當月是否有永豐對帳單匯入資料，若有則以對帳單支出為準
    const monthlyTransactions = sinopacTransactions.filter(tx => (
      tx.date && AccountingPeriods.isDateInFinancialReportPeriod(tx.date, year, month)
    ));
    const hasImportedTransactions = monthlyTransactions.length > 0;

    if (hasImportedTransactions) {
      const csvInterestRows = monthlyTransactions
        .filter(tx => tx.income > 0 && (String(tx.summary || '').includes('利息') || String(tx.memo || '').includes('利息')))
        .map(tx => {
          const [y, m, d] = tx.date.split('-').map(part => Number(part));
          return {
            dateLabel: `${m}/${d}`,
            subject: getTransactionSubject(tx),
            amount: toNumber(tx.income)
          };
        });
      incomeRows.push(...csvInterestRows);
    }
    
    let expenseRows;
    if (hasImportedTransactions) {
      expenseRows = monthlyTransactions
        .filter(tx => tx.expense > 0)
        .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')))
        .map(tx => {
          const [y, m, d] = tx.date.split('-').map(part => Number(part));
          return {
            dateLabel: `${m}/${d}`,
            subject: getTransactionSubject(tx),
            amount: toNumber(tx.expense)
          };
        });
    } else {
      expenseRows = buildVoucherRows(monthlyVouchers, 'expense', year, month);
    }

    if (sinopacTimeDepositDelta > 0) {
      expenseRows.unshift({
        dateLabel: '全月',
        subject: '定存',
        amount: sinopacTimeDepositDelta
      });
    } else if (sinopacTimeDepositDelta < 0) {
      incomeRows.unshift({
        dateLabel: '全月',
        subject: '定存解約',
        amount: Math.abs(sinopacTimeDepositDelta)
      });
    }

    const incomeTotal = sumRows(incomeRows);
    const expenseTotal = sumRows(expenseRows);
    const netTotal = incomeTotal - expenseTotal;
    const unionInterest = currentBanks.union.interest + currentBanks.union.timeDepositInterest;

    const bankSections = {
      sinopac: createBankSection(previousBanks.sinopac, currentBanks.sinopac, incomeTotal, expenseTotal),
      union: createBankSection(previousBanks.union, currentBanks.union, unionInterest, 0)
    };

    const bankGrandTotal = BANK_KEYS.reduce((sum, key) => (
      sum + currentBanks[key].balance + currentBanks[key].timeDepositBalance
    ), 0);
    const maintenanceFeeIncome = monthlyVouchers
      .filter(voucher => voucher.type === 'income')
      .reduce((sum, voucher) => sum + getVoucherMaintenanceFee(voucher), 0);
    const previousRepairReserveFund = getStoredRepairReserveFund(bankBalances, previousYearMonth) || 0;
    const positiveAllocationBase = netTotal > 0 ? Math.max(0, netTotal - maintenanceFeeIncome) : 0;
    const repairReserveContribution = Math.round(positiveAllocationBase * 0.1);
    const suggestedRepairReserveFund = previousRepairReserveFund + repairReserveContribution + maintenanceFeeIncome;
    const storedRepairReserveFund = getStoredRepairReserveFund(bankBalances, yearMonth);
    const repairReserveFund = storedRepairReserveFund === null ? suggestedRepairReserveFund : storedRepairReserveFund;
    const publicFund = bankGrandTotal - repairReserveFund;

    return {
      title: `鴻邦世界花園第二期管理委員會${rcYear}年${monthNumber}月收支總表`,
      periodLabel: `${rcYear}年${monthNumber}月6日~${getNextMonthLabel(year, month)}5日`,
      yearMonth,
      previousYearMonth,
      incomeRows,
      expenseRows,
      incomeTotal,
      expenseTotal,
      netTotal,
      currentBanks,
      previousBanks,
      bankSections,
      bankGrandTotal,
      maintenanceFeeIncome,
      previousRepairReserveFund,
      repairReserveContribution,
      suggestedRepairReserveFund,
      repairReserveFund,
      publicFund,
      signatureLabels: ['主任委員', '監察委員', '財務委員']
    };
  }

  return {
    createMonthlyFinancialPrintReport
  };
});
