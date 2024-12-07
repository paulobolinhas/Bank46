// Fetch all loans
document.getElementById('get-all-loans').addEventListener('click', async () => {
    try {
        const response = await fetch('/loan');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const resultsContainer = document.getElementById('all-loan-result');
        resultsContainer.innerHTML = '<h3>All Loans:</h3>';
        data.forEach(loan => {
            resultsContainer.innerHTML += `
                <p>Loan ID: ${loan._id}, Amount: ${loan.amount}, Interest Rate: ${loan.interestRate}%</p>
            `;
        });
    } catch (error) {
        document.getElementById('all-loan-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Fetch specific loan by ID
document.getElementById('loan-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const loanId = document.getElementById('loan-id').value;

    try {
        const response = await fetch(`/loan/${loanId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('loan-result').innerHTML = `
            <h3>Loan ID: ${data._id}</h3>
            <p>Amount: ${data.amount}</p>
            <p>Interest Rate: ${data.interestRate}%</p>
        `;
    } catch (error) {
        document.getElementById('loan-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Create new loan
document.getElementById('create-loan-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const ownerId = document.getElementById('loan-owner-id').value;
    const title = document.getElementById('loan-title').value;
    const amount = document.getElementById('loan-amount').value;
    const interestRate = document.getElementById('loan-interest-rate').value;

    try {
        const response = await fetch('/createloan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ owner_id: ownerId, title, amount, interestRate }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('create-loan-result').innerHTML = `
            <h3>Loan Created:</h3>
            <p>Loan ID: ${data._id}, Title: ${data.title}, Amount: ${data.amount}, Interest Rate: ${data.interestRate}%</p>
        `;
    } catch (error) {
        document.getElementById('create-loan-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
