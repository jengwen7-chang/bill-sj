(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.CommunityAdvanceClaimManager = api;
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  function calculateAdvanceClaimSummary(items, month = getCurrentMonth()) {
    let monthExpense = 0;
    let unreimbursed = 0;
    let reimbursed = 0;

    (items || []).forEach(item => {
      const expense = Number(item.expense) || 0;
      if (item.date && item.date.substring(0, 7) === month) {
        monthExpense += expense;
      }
      if (item.status === 'unreimbursed' && expense > 0) {
        unreimbursed += expense;
      }
      if (item.status === 'reimbursed' && expense > 0) {
        reimbursed += expense;
      }
    });

    return { monthExpense, unreimbursed, reimbursed };
  }

  function createAdvanceClaimVoucherDraft(items) {
    const checkedItems = [...(items || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (checkedItems.length === 0) {
      throw new Error('請先勾選要請款的代墊項目');
    }

    const firstDate = checkedItems[0].date;
    const rcYear = parseInt(firstDate.substring(0, 4), 10) - 1911;
    const month = parseInt(firstDate.substring(5, 7), 10);
    const amount = checkedItems.reduce((sum, item) => sum + (Number(item.expense) || 0), 0);
    const indexes = checkedItems.map(item => item.index).join(', ');

    return {
      category: '公共事務費',
      amount,
      summary: `${rcYear}年${month}月份-代墊請款 (項目 ${indexes})`,
      receiptNo: '檢附代墊明細與憑證',
      paymentMethod: 'transfer',
      fixedType: 'non-fixed',
      bankInfo: '請填代墊人匯款帳戶',
      vendorId: ''
    };
  }

  return {
    calculateAdvanceClaimSummary,
    createAdvanceClaimVoucherDraft
  };
});
