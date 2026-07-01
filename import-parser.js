(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.CommunityImportParser = api;
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  function cellText(value) {
    return String(value == null ? '' : value).trim();
  }

  function isNonEmpty(value) {
    return cellText(value) !== '';
  }

  function parseAmount(value) {
    const normalized = cellText(value).replace(/,/g, '').replace(/[^\d.-]/g, '');
    const amount = parseFloat(normalized);
    return Number.isFinite(amount) ? amount : 0;
  }

  function parseDate(value) {
    if (typeof value === 'number') {
      const date = new Date((value - 25569) * 86400 * 1000);
      return date.toISOString().substring(0, 10);
    }

    const text = cellText(value);
    const parts = text.match(/(\d{2,4})[/-](\d{1,2})[/-](\d{1,2})/);
    if (!parts) return '';

    let year = parseInt(parts[1], 10);
    if (year < 1911) year += 1911;
    return `${year}-${parts[2].padStart(2, '0')}-${parts[3].padStart(2, '0')}`;
  }

  function parseFeeMonth(periodName) {
    const match = cellText(periodName).match(/(\d{2,3})\s*年\s*(\d{1,2})\s*月/);
    if (!match) return '';
    let year = parseInt(match[1], 10);
    if (year < 1911) year += 1911;
    return `${year}-${match[2].padStart(2, '0')}`;
  }

  function findColumn(headers, patterns) {
    for (const pattern of patterns) {
      const idx = headers.findIndex(header => pattern.test(header));
      if (idx !== -1) return idx;
    }
    return -1;
  }

  function mapColumns(headers) {
    return {
      period: findColumn(headers, [/期別名稱/, /期別|期/i]),
      addr: findColumn(headers, [/戶別代碼/, /戶別|棟|房|房屋|門牌/i]),
      payer: findColumn(headers, [/所有權人$/, /所有權人姓名/, /姓名|繳款人|住戶|成員/i]),
      amount: findColumn(headers, [/^入帳金額$/, /實繳|實收/i, /^單筆繳費金額$/, /^繳費金額$/, /金額|應繳總額/i]),
      date: findColumn(headers, [/^入帳日期$/, /^繳費日期$/, /^(?!.*(?:建立|到期)).*(日期|時間|收款)/i]),
      receiptNo: findColumn(headers, [/收據單號/, /銷帳編號/, /收據|憑證/i]),
      paymentMethod: findColumn(headers, [/繳費方式/, /支付方式/i])
    };
  }

  function findHeaderRow(rows) {
    let best = { index: -1, score: 0, nonEmpty: 0 };

    rows.forEach((row, index) => {
      const headers = row.map(cellText);
      const nonEmpty = headers.filter(Boolean).length;
      const mapped = mapColumns(headers);
      const score = Object.values(mapped).filter(idx => idx !== -1).length;

      if (score > best.score || (score === best.score && nonEmpty > best.nonEmpty)) {
        best = { index, score, nonEmpty };
      }
    });

    if (best.score < 3) return -1;
    return best.index;
  }

  function readMetadata(rows, headerRowIndex) {
    const metadata = {};
    rows.slice(0, Math.max(headerRowIndex, 0)).forEach(row => {
      const key = cellText(row[0]);
      const value = row[1];
      if (key === '預計入帳日') metadata.settlementDate = parseDate(value);
      if (key === '撥款金額') metadata.settlementAmount = parseAmount(value);
      if (key === '代收手續費') metadata.collectionFee = parseAmount(value);
      if (key === '匯款手續費') metadata.transferFee = parseAmount(value);
    });
    return metadata;
  }

  function filterDataRows(rows) {
    return rows.filter(row => {
      if (!row.some(isNonEmpty)) return false;
      if (row.every(cell => cellText(cell) === '篩選')) return false;
      return true;
    });
  }

  function parseRecords(dataRows, headers, mappedColumns, metadata) {
    const useSettlementDate = mappedColumns.amount !== -1 && headers[mappedColumns.amount] === '入帳金額' && metadata.settlementDate;

    return dataRows.map(row => {
      const periodName = mappedColumns.period === -1 ? '' : cellText(row[mappedColumns.period]);
      const date = useSettlementDate ? metadata.settlementDate : parseDate(row[mappedColumns.date]);

      return {
        date,
        addr: mappedColumns.addr === -1 ? '' : cellText(row[mappedColumns.addr]),
        payer: mappedColumns.payer === -1 ? '' : cellText(row[mappedColumns.payer]),
        amount: mappedColumns.amount === -1 ? 0 : parseAmount(row[mappedColumns.amount]),
        periodName,
        feeMonth: parseFeeMonth(periodName) || date.substring(0, 7),
        receiptNo: mappedColumns.receiptNo === -1 ? '' : cellText(row[mappedColumns.receiptNo]),
        paymentMethod: mappedColumns.paymentMethod === -1 ? '' : cellText(row[mappedColumns.paymentMethod])
      };
    }).filter(record => record.amount > 0 && record.addr);
  }

  function parseJinwangRows(rows) {
    const headerRowIndex = findHeaderRow(rows);
    if (headerRowIndex === -1) {
      throw new Error('找不到今網匯入檔案的資料表頭');
    }

    const headers = rows[headerRowIndex].map(cellText);
    const dataRows = filterDataRows(rows.slice(headerRowIndex + 1));
    const metadata = readMetadata(rows, headerRowIndex);
    const mappedColumns = mapColumns(headers);
    const records = parseRecords(dataRows, headers, mappedColumns, metadata);

    return {
      headerRowIndex,
      headers,
      dataRows,
      metadata,
      mappedColumns,
      records
    };
  }

  return {
    parseJinwangRows,
    parseRecords,
    parseDate,
    parseFeeMonth,
    parseAmount,
    mapColumns
  };
});
