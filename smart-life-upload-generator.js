(function (root, factory) {
  let feeCalculator = root.CommunityFeeCalculator;
  if (typeof module === 'object' && module.exports) {
    feeCalculator = require('./fee-calculator');
  }

  const api = factory(feeCalculator);
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.CommunitySmartLifeUploadGenerator = api;
})(typeof globalThis !== 'undefined' ? globalThis : window, function (feeCalculator) {
  const TEMPLATE_FILE = '智生活管理費匯入範本_世界花園二期_20260630.xlsx';
  const SHEET_NAME = '繳費單列表';
  const DATA_START_ROW_INDEX = 5;
  const COLUMN_COUNT = 19;

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function parseFeeMonth(feeMonth) {
    const match = String(feeMonth || '').match(/^(\d{4})-(\d{2})$/);
    if (!match) throw new Error('費用年月格式需為 YYYY-MM');
    return {
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10)
    };
  }

  function getNextFeeMonth(baseFeeMonth) {
    const { year, month } = parseFeeMonth(baseFeeMonth);
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    return `${nextYear}-${pad2(nextMonth)}`;
  }

  function getLastDayOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function buildFeePeriod(targetMonth) {
    const { year, month } = parseFeeMonth(targetMonth);
    const endDay = getLastDayOfMonth(year, month);
    const rcYear = year - 1911;
    return {
      feeMonth: targetMonth,
      year,
      month,
      rcYear,
      fileMonth: `${year}${pad2(month)}`,
      periodLabel: `${rcYear}年${month}月管理費`,
      startDate: `${year}/${pad2(month)}/01`,
      endDate: `${year}/${pad2(month)}/${pad2(endDay)}`
    };
  }

  function normalizeUnit(value) {
    return String(value || '')
      .trim()
      .replace(/棟/g, '')
      .replace(/樓/g, 'F')
      .replace(/\s+/g, '')
      .toUpperCase();
  }

  function proprietorUnitKeys(proprietor) {
    const building = normalizeUnit(proprietor.building);
    const floor = normalizeUnit(proprietor.floor);
    const room = normalizeUnit(proprietor.room);
    return [
      `${building}-${floor}`,
      `${building}-${room}`
    ].filter(Boolean);
  }

  function buildProprietorMap(proprietors) {
    const map = new Map();
    (proprietors || []).forEach(proprietor => {
      proprietorUnitKeys(proprietor).forEach(key => {
        if (key && !map.has(key)) map.set(key, proprietor);
      });
    });
    return map;
  }

  function isChargeableTemplateUnit(unit) {
    return /^A\d+-\d{2}F$/.test(unit);
  }

  function cloneRow(row) {
    const next = Array.isArray(row) ? row.slice(0, COLUMN_COUNT) : [];
    while (next.length < COLUMN_COUNT) next.push(null);
    return next;
  }

  function normalizeFees(proprietor) {
    if (!feeCalculator || !feeCalculator.normalizeProprietorFees) {
      throw new Error('管理費計算器尚未載入');
    }
    return feeCalculator.normalizeProprietorFees(proprietor);
  }

  function prepareSmartLifeUploadRows({ templateRows, proprietors, targetMonth }) {
    const period = buildFeePeriod(targetMonth);
    const rows = (templateRows || []).map(cloneRow);
    const proprietorMap = buildProprietorMap(proprietors);
    const stats = {
      matchedCount: 0,
      unmatchedTemplateUnits: [],
      totalAmount: 0
    };

    if (rows.length < DATA_START_ROW_INDEX) {
      throw new Error('智生活範本格式不完整');
    }

    rows[2] = cloneRow(rows[2]);
    rows[2][6] = '每月應繳管理費';
    rows[2][7] = '每月應繳維護費';
    rows[3] = cloneRow(rows[3]);
    rows[3][6] = '系統自動產生下期管理費與固定維護費；未使用費用欄請留空。';

    for (let rowIndex = DATA_START_ROW_INDEX; rowIndex < rows.length; rowIndex += 1) {
      const row = cloneRow(rows[rowIndex]);
      const templateUnit = normalizeUnit(row[3]);
      if (!templateUnit || !isChargeableTemplateUnit(templateUnit)) {
        rows[rowIndex] = row;
        continue;
      }

      const proprietor = proprietorMap.get(templateUnit);
      if (!proprietor) {
        stats.unmatchedTemplateUnits.push(row[3]);
        rows[rowIndex] = row;
        continue;
      }

      const fees = normalizeFees(proprietor);
      const excelRow = rowIndex + 1;
      row[2] = fees.name || row[2];
      row[4] = period.periodLabel;
      row[5] = { f: `SUM(G${excelRow}:P${excelRow})` };
      row[6] = fees.managementFee || 0;
      row[7] = fees.maintenanceFee || 0;
      for (let col = 8; col <= 15; col += 1) row[col] = null;
      row[16] = period.startDate;
      row[17] = period.endDate;
      row[18] = period.endDate;

      stats.matchedCount += 1;
      stats.totalAmount += fees.monthlyFee || 0;
      rows[rowIndex] = row;
    }

    return { rows, period, stats };
  }

  function sheetCell(xlsx, rowIndex, colIndex) {
    return xlsx.utils.encode_cell({ r: rowIndex, c: colIndex });
  }

  function setSheetCell(xlsx, sheet, rowIndex, colIndex, value) {
    const address = sheetCell(xlsx, rowIndex, colIndex);
    const existing = sheet[address] || {};

    if (value && typeof value === 'object' && value.f) {
      sheet[address] = { ...existing, t: 'n', f: value.f };
      delete sheet[address].v;
      return;
    }

    if (value == null || value === '') {
      delete sheet[address];
      return;
    }

    const type = typeof value === 'number' ? 'n' : 's';
    sheet[address] = { ...existing, t: type, v: value };
  }

  function applyRowsToWorkbook(workbook, xlsx, rows) {
    const sheetName = workbook.SheetNames.includes(SHEET_NAME) ? SHEET_NAME : workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error('找不到智生活上傳範本工作表');

    rows.forEach((row, rowIndex) => {
      cloneRow(row).forEach((value, colIndex) => {
        setSheetCell(xlsx, sheet, rowIndex, colIndex, value);
      });
    });

    sheet['!ref'] = xlsx.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: rows.length - 1, c: COLUMN_COUNT - 1 }
    });

    sheet['!autofilter'] = { ref: `A5:S${rows.length}` };
    return sheetName;
  }

  function prepareWorkbookFromTemplate({ workbook, xlsx, proprietors, targetMonth }) {
    const sheetName = workbook.SheetNames.includes(SHEET_NAME) ? SHEET_NAME : workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error('找不到智生活上傳範本工作表');

    const templateRows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null, raw: false });
    const prepared = prepareSmartLifeUploadRows({ templateRows, proprietors, targetMonth });
    applyRowsToWorkbook(workbook, xlsx, prepared.rows);
    return { ...prepared, sheetName };
  }

  function buildFilename(period) {
    return `智生活管理費上傳檔_世界花園二期_${period.fileMonth}.xlsx`;
  }

  return {
    TEMPLATE_FILE,
    SHEET_NAME,
    buildFeePeriod,
    buildFilename,
    getNextFeeMonth,
    prepareSmartLifeUploadRows,
    prepareWorkbookFromTemplate
  };
});
