// Fetch all insurances
document.getElementById('get-all-insurances').addEventListener('click', async () => {
    try {
        const response = await fetch('/insurance');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const resultsContainer = document.getElementById('all-insurance-result');
        resultsContainer.innerHTML = '<h3>All Insurances:</h3>';
        data.forEach(ins => {
            resultsContainer.innerHTML += `
                <p>Insurance ID: ${ins._id}, Monthly Payment: ${ins.monthly_payment} ${ins.currency}</p>
            `;
        });
    } catch (error) {
        document.getElementById('all-insurance-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Fetch specific insurance by ID
document.getElementById('insurance-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const insuranceId = document.getElementById('insurance-id').value;

    try {
        const response = await fetch(`/insurance/${insuranceId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('insurance-result').innerHTML = `
            <h3>Insurance ID: ${data._id}</h3>
            <p>Monthly Payment: ${data.monthly_payment} ${data.currency}</p>
        `;
    } catch (error) {
        document.getElementById('insurance-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Create new insurance
document.getElementById('create-insurance-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const ownerId = document.getElementById('owner-id').value;
    const title = document.getElementById('title').value;
    const monthlyPayment = document.getElementById('monthly-payment').value;
    const currency = document.getElementById('currency').value;

    try {
        const response = await fetch('/insurance/createinsurance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ owner_id: ownerId, title, monthly_payment: monthlyPayment, currency }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('create-insurance-result').innerHTML = `
            <h3>Insurance Created:</h3>
            <p>Insurance ID: ${data._id}, Title: ${data.title}, Monthly Payment: ${data.monthly_payment} ${data.currency}</p>
        `;
    } catch (error) {
        document.getElementById('create-insurance-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
