function calculateAllocations() {
    const totalInvestment = parseFloat(document.getElementById('totalInvestment').value);
    
    if (isNaN(totalInvestment) || totalInvestment <= 0) {
        document.getElementById('results').innerHTML = '<p>Please enter a valid investment amount.</p>';
        return;
    }

    const allocations = {
        stocks: (totalInvestment * 0.40).toFixed(2),
        bonds: (totalInvestment * 0.30).toFixed(2),
        mutualFunds: (totalInvestment * 0.20).toFixed(2),
        realEstate: (totalInvestment * 0.10).toFixed(2),
        cryptocurrency: (totalInvestment * 0.05).toFixed(2),
    };

    // Store the allocations in localStorage
    localStorage.setItem('investmentAllocations', JSON.stringify(allocations));

    // Create a table for the results
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Investment Type</th>
                    <th>Allocation Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Stocks</td>
                    <td>$${allocations.stocks}</td>
                </tr>
                <tr>
                    <td>Bonds</td>
                    <td>$${allocations.bonds}</td>
                </tr>
                <tr>
                    <td>Mutual Funds/ETFs</td>
                    <td>$${allocations.mutualFunds}</td>
                </tr>
                <tr>
                    <td>Real Estate</td>
                    <td>$${allocations.realEstate}</td>
                </tr>
                <tr>
                    <td>Cryptocurrency</td>
                    <td>$${allocations.cryptocurrency}</td>
                </tr>
            </tbody>
        </table>
    `;

    // Display the table in the results div
    document.getElementById('results').innerHTML = tableHTML;
}
