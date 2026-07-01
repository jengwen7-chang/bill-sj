(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JinwangImportDedupe = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function normalize(value) {
    return String(value == null ? '' : value).trim();
  }

  function normalizeAmount(value) {
    const amount = Number(value);
    return Number.isFinite(amount) ? amount : 0;
  }

  function isGeneratedReceiptNo(receiptNo) {
    return /^SL_I\d+/.test(normalize(receiptNo));
  }

  function getAddrFromVoucher(voucher) {
    const vendorMatch = normalize(voucher.vendorName).match(/住戶\s*\((.+)\)/);
    if (vendorMatch) return vendorMatch[1].trim();

    const summaryMatch = normalize(voucher.summary).match(/戶別:([^\s]+)/);
    return summaryMatch ? summaryMatch[1].trim() : '';
  }

  function createRecordImportKey(record) {
    const receiptNo = normalize(record.receiptNo);
    if (receiptNo) return `receipt:${receiptNo}`;

    const date = normalize(record.date);
    const feeMonth = normalize(record.feeMonth) || date.substring(0, 7);
    return [
      'row',
      normalize(record.addr),
      feeMonth,
      date,
      normalizeAmount(record.amount)
    ].join('|');
  }

  function createVoucherImportKey(voucher) {
    if (voucher.sourceImportKey) return voucher.sourceImportKey;

    const receiptNo = normalize(voucher.receiptNo);
    if (receiptNo && !isGeneratedReceiptNo(receiptNo)) {
      return `receipt:${receiptNo}`;
    }

    const addr = getAddrFromVoucher(voucher);
    if (!addr) return '';

    const date = normalize(voucher.date);
    const feeMonth = normalize(voucher.feeMonth) || date.substring(0, 7);
    return [
      'row',
      addr,
      feeMonth,
      date,
      normalizeAmount(voucher.amount)
    ].join('|');
  }

  function filterNewImportRecords(records, existingVouchers) {
    const existingKeys = new Set(
      (existingVouchers || [])
        .filter(voucher => voucher.type === 'income' && voucher.category === '管理費收入')
        .map(createVoucherImportKey)
        .filter(Boolean)
    );
    const seenKeys = new Set();
    const newRecords = [];
    const skippedRecords = [];

    (records || []).forEach(record => {
      const key = createRecordImportKey(record);
      if (existingKeys.has(key) || seenKeys.has(key)) {
        skippedRecords.push({ record, key });
        return;
      }
      seenKeys.add(key);
      newRecords.push({ record, key });
    });

    return {
      newRecords,
      skippedRecords
    };
  }

  return {
    createRecordImportKey,
    createVoucherImportKey,
    filterNewImportRecords
  };
});
