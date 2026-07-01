(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.CommunityHistoricalDataImporter = api;
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  function mergeHistoricalData(db, source) {
    const result = {
      addedVoucherCount: 0,
      addedBankBalanceCount: 0
    };

    if (!source || !Array.isArray(source.vouchers)) return result;

    if (!Array.isArray(db.vouchers)) db.vouchers = [];
    if (!db.bankBalances) db.bankBalances = {};

    const existingIds = new Set(db.vouchers.map(v => v.id));
    source.vouchers.forEach(voucher => {
      if (!voucher || !voucher.id || existingIds.has(voucher.id)) return;
      db.vouchers.push({ ...voucher });
      existingIds.add(voucher.id);
      result.addedVoucherCount += 1;
    });

    Object.entries(source.bankBalances || {}).forEach(([yearMonth, value]) => {
      if (db.bankBalances[yearMonth]) return;
      db.bankBalances[yearMonth] = JSON.parse(JSON.stringify(value));
      result.addedBankBalanceCount += 1;
    });

    return result;
  }

  return {
    mergeHistoricalData
  };
});
