// Fetch all transactions
document.getElementById('get-all-transactions').addEventListener('click', async () => {
    try {
        const response = await fetch('/transaction');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const resultsContainer = document.getElementById('all-transactions-result');
        resultsContainer.innerHTML = '<h3>All Transactions:</h3>';
        data.forEach(tx => {
            resultsContainer.innerHTML += `
                <p>Transaction ID: ${tx._id}, Amount: ${tx.amount}, Type: ${tx.transaction_type}</p>
            `;
        });
    } catch (error) {
        document.getElementById('all-transactions-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Fetch specific transaction by ID
document.getElementById('transaction-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const transactionId = document.getElementById('transaction-id').value;

    try {
        const response = await fetch(`/transaction/${transactionId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('transaction-result').innerHTML = `
            <h3>Transaction ID: ${data._id}</h3>
            <p>Amount: ${data.amount}</p>
            <p>Transaction Type: ${data.transaction_type}</p>
        `;
    } catch (error) {
        document.getElementById('transaction-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Create new transaction
document.getElementById('create-transaction-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const ownerId = document.getElementById('transaction-owner-id').value;
    const amount = document.getElementById('transaction-amount').value;
    const type = document.getElementById('transaction-type').value;

    try {
        const response = await fetch('/createtransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ owner_id: ownerId, amount, type }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('create-transaction-result').innerHTML = `
            <h3>Transaction Created:</h3>
            <p>Transaction ID: ${data._id}, Amount: ${data.amount}, Type: ${data.type}</p>
        `;
    } catch (error) {
        document.getElementById('create-transaction-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});