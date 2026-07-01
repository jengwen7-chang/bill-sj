(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AccountingPeriods = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function parseDateParts(dateString) {
    const [year, month, day] = String(dateString || '').split('-').map(part => Number(part));
    if (!year || !month || !day) return null;
    return { year, month, day };
  }

  function formatYearMonth(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;
  }

  function formatDate(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  }

  function getExpenseVoucherPeriodMonth(dateString) {
    const parts = parseDateParts(dateString);
    if (!parts) return '';

    const periodDate = new Date(parts.year, parts.month - 1, 1);
    if (parts.day >= 26) {
      periodDate.setMonth(periodDate.getMonth() + 1);
    }
    return formatYearMonth(periodDate);
  }

  function getFinancialReportPeriod(year, month) {
    const start = new Date(Number(year), Number(month) - 1, 6);
    const end = new Date(Number(year), Number(month), 5);

    return {
      startDate: formatDate(start),
      endDate: formatDate(end)
    };
  }

  function isDateInRange(dateString, startDate, endDate) {
    return String(dateString || '') >= startDate && String(dateString || '') <= endDate;
  }

  function isDateInFinancialReportPeriod(dateString, year, month) {
    const period = getFinancialReportPeriod(year, month);
    return isDateInRange(dateString, period.startDate, period.endDate);
  }

  return {
    getExpenseVoucherPeriodMonth,
    getFinancialReportPeriod,
    isDateInFinancialReportPeriod
  };
});
