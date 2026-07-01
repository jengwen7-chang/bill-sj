(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.CommunityFeeStatusCalculator = api;
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  function monthToIndex(month) {
    const match = String(month || '').match(/^(\d{4})-(\d{2})$/);
    if (!match) return null;
    return parseInt(match[1], 10) * 12 + parseInt(match[2], 10) - 1;
  }

  function indexToMonth(index) {
    const year = Math.floor(index / 12);
    const month = (index % 12) + 1;
    return `${year}-${String(month).padStart(2, '0')}`;
  }

  function parsePrepaidUntilMonth(text) {
    const match = String(text || '').match(/預繳至\s*(\d{2,4})\s*[年/-]\s*(\d{1,2})/);
    if (!match) return '';

    let year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return '';
    if (year < 1911) year += 1911;
    return `${year}-${String(month).padStart(2, '0')}`;
  }

  function isFeeVoucher(voucher, proprietorId) {
    return voucher &&
      voucher.type === 'income' &&
      voucher.category === '管理費收入' &&
      voucher.proprietorId === proprietorId &&
      voucher.feeMonth;
  }

  function getCoverageEndMonth(voucher, monthlyFee) {
    const startIndex = monthToIndex(voucher.feeMonth);
    if (startIndex == null) return '';

    const explicitEndMonth = parsePrepaidUntilMonth(`${voucher.summary || ''} ${voucher.bankInfo || ''}`);
    if (explicitEndMonth) return explicitEndMonth;

    const amount = Number(voucher.amount) || 0;
    if (amount <= 0) return voucher.feeMonth;

    const monthsCovered = monthlyFee > 0 ? Math.max(1, Math.floor(amount / monthlyFee)) : 1;
    return indexToMonth(startIndex + monthsCovered - 1);
  }

  function getVoucherCoverage(voucher, monthlyFee) {
    const startMonth = voucher.feeMonth || '';
    const endMonth = getCoverageEndMonth(voucher, monthlyFee);
    return {
      voucher,
      startMonth,
      endMonth,
      startIndex: monthToIndex(startMonth),
      endIndex: monthToIndex(endMonth)
    };
  }

  function evaluateFeeStatus({ proprietor, vouchers, targetMonth }) {
    const monthlyFee = Number(proprietor && proprietor.monthlyFee) || 0;
    const targetIndex = monthToIndex(targetMonth);

    const unpaid = {
      isPaid: false,
      isPrepaidCoverage: false,
      collected: 0,
      coveredValue: 0,
      voucher: null
    };

    if (!proprietor || targetIndex == null) return unpaid;

    const coverages = (vouchers || [])
      .filter(v => isFeeVoucher(v, proprietor.id))
      .map(v => getVoucherCoverage(v, monthlyFee))
      .filter(c => c.startIndex != null && c.endIndex != null && c.startIndex <= targetIndex && targetIndex <= c.endIndex)
      .sort((a, b) => {
        const aSameMonth = a.startMonth === targetMonth ? 0 : 1;
        const bSameMonth = b.startMonth === targetMonth ? 0 : 1;
        if (aSameMonth !== bSameMonth) return aSameMonth - bSameMonth;
        return b.startIndex - a.startIndex;
      });

    if (coverages.length === 0) return unpaid;

    const coverage = coverages[0];
    const voucher = coverage.voucher;
    const isSameMonthReceipt = voucher.feeMonth === targetMonth && (Number(voucher.amount) || 0) > 0;

    return {
      isPaid: true,
      isPrepaidCoverage: !isSameMonthReceipt,
      collected: isSameMonthReceipt ? Number(voucher.amount) || 0 : 0,
      coveredValue: monthlyFee,
      voucher
    };
  }

  return {
    evaluateFeeStatus,
    getVoucherCoverage,
    parsePrepaidUntilMonth
  };
});
