document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loanTypes = Array.from(document.getElementById('loanType').selectedOptions).map(option => option.value);
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);

    // Collect results for each loan type
    const results = loanTypes.map(type => {
        const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12; // Monthly rate
        const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12; // Total number of months

        const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
        return { type, emi: emi.toFixed(2) };
    });

    // Display results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    results.forEach(result => {
        resultDiv.innerHTML += `<p>${result.type.charAt(0).toUpperCase() + result.type.slice(1)} EMI: $${result.emi}</p>`;
    });
});
