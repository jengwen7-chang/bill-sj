(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.CommunityFeeCalculator = api;
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  const MAINTENANCE_FEE = 150;

  function toNumber(value) {
    const num = parseFloat(value);
    return Number.isFinite(num) ? num : 0;
  }

  function calculateProprietorFees(input) {
    const area = toNumber(input.area);
    const feeRate = toNumber(input.feeRate);
    const parkingFee = toNumber(input.parkingFee);
    const feeType = input.feeType || 'fixed';
    const managementFee = Math.max(0, Math.round((feeType === 'area' ? area * feeRate : feeRate) + parkingFee));
    const maintenanceFee = MAINTENANCE_FEE;

    return {
      managementFee,
      maintenanceFee,
      monthlyFee: managementFee + maintenanceFee
    };
  }

  function normalizeProprietorFees(proprietor) {
    const normalized = { ...proprietor };
    const parkingFee = toNumber(normalized.parkingFee);
    const legacyMonthlyFee = toNumber(normalized.monthlyFee);

    if (toNumber(normalized.maintenanceFee) === MAINTENANCE_FEE && toNumber(normalized.managementFee) > 0) {
      const fees = calculateProprietorFees(normalized);
      return { ...normalized, ...fees };
    }

    const managementFee = Math.max(0, Math.round(legacyMonthlyFee - MAINTENANCE_FEE));

    normalized.managementFee = managementFee;
    normalized.maintenanceFee = MAINTENANCE_FEE;
    normalized.monthlyFee = managementFee + MAINTENANCE_FEE;

    if ((normalized.feeType || 'fixed') === 'fixed') {
      normalized.feeRate = Math.max(0, managementFee - parkingFee);
    }

    return normalized;
  }

  return {
    MAINTENANCE_FEE,
    calculateProprietorFees,
    normalizeProprietorFees
  };
});
