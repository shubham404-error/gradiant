document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const calculateButton = document.getElementById('calculate-button');
  const concentrationFactorOutput = document.getElementById('concentration-factor');
  const concentrationRatioOutput = document.getElementById('concentration-ratio');
  const brineInfluentOutput = document.getElementById('brine-influent');
  const brineEffluentOutput = document.getElementById('brine-effluent');
  const waterEvaporatedOutput = document.getElementById('water-evaporated');
  const batchSalinity = document.getElementById('batch-salinity');
  const outputSection = document.getElementById('output-section');
  const resultsTableBody = document.getElementById('results-tbody');

  // Event listener for the calculate button
  calculateButton.addEventListener('click', function() {
    // Get input values
    const feedTDS = parseFloat(document.getElementById('feed-tds-cge').value);
    const outletTDS = parseFloat(document.getElementById('outlet-tds-cge').value);
    const feedToCGE = parseFloat(document.getElementById('feed-cge').value);
    const hoursOperation = parseFloat(document.getElementById('hours-operation').value);

    // Perform calculations
    const concentrationFactor = outletTDS / feedTDS;
    const concentrationRatioWithoutLoss = 1 - (1 / concentrationFactor);
    const brineInfluent = feedToCGE * 24 / hoursOperation;
    const brineEffluent = brineInfluent * (1 - concentrationRatioWithoutLoss);
    const waterEvaporated = brineInfluent - brineEffluent;
    const batchSalinity = brineInfluent / (brineInfluent - (brineInfluent - brineEffluent) / 2) * feedTDS;


    // Update output UI
    concentrationFactorOutput.textContent = concentrationFactor.toFixed(2);
    concentrationRatioOutput.textContent = concentrationRatioWithoutLoss.toFixed(2);
    brineInfluentOutput.textContent = brineInfluent.toFixed(2);
    brineEffluentOutput.textContent = brineEffluent.toFixed(2);
    waterEvaporatedOutput.textContent = waterEvaporated.toFixed(2);
    batchSalinity.textContent = batchSalinity.toFixed(2);
    // Store batchSalinity in local storage
    localStorage.setItem('batchSalinity', batchSalinity.toFixed(2));
    
    // Show output section
    outputSection.style.display = 'grid';

    // Populate results table
    const parameters = [
      { name: 'Feed TDS to CGE', value: feedTDS, unit: 'mg/l' },
      { name: 'Outlet TDS from CGE', value: outletTDS, unit: 'mg/l' },
      { name: 'Concentration Factor', value: concentrationFactor, unit: '' },
      { name: 'Concentration Ratio (without Loss)', value: concentrationRatioWithoutLoss, unit: '%' },
      { name: 'Feed to CGE', value: feedToCGE, unit: 'm³/day' },
      { name: 'Hours of operation', value: hoursOperation, unit: 'hrs/day' },
      { name: 'Brine Influent', value: brineInfluent, unit: 'm³/day' },
      { name: 'Brine Effluent', value: brineEffluent, unit: 'm³/day' },
      { name: 'Water Evaporated (Approx)', value: waterEvaporated, unit: 'm³/day' },
      { name: 'Batch Salinity', value: batchSalinity, unit: 'mg/l' }
    ];

    // Clear previous results
    resultsTableBody.innerHTML = '';

    // Insert new results
    parameters.forEach(param => {
      const row = resultsTableBody.insertRow();
      const paramNameCell = row.insertCell(0);
      const paramValueCell = row.insertCell(1);
      const paramUnitCell = row.insertCell(2);

      paramNameCell.textContent = param.name;
      paramValueCell.textContent = param.value.toFixed(2);
      paramUnitCell.textContent = param.unit;

      paramNameCell.className = 'px-4 py-2 whitespace-nowrap';
      paramValueCell.className = 'px-4 py-2 whitespace-nowrap';
      paramUnitCell.className = 'px-4 py-2 whitespace-nowrap';
    });

    // Show results table
    document.getElementById('results-table').style.display = 'block';
  });
});
