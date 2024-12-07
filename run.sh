#!/bin/bash

cd microservices/

echo "--- Starting Insurance service (Node.js) ---" 
cd insuranceMS/
node insurance_service.js &

echo "--- Starting Loan service (Node.js) ---"
cd .. 
cd loanMS/
node loan_service.js &

echo "--- Starting Transaction service (Node.js) ---"
cd .. 
cd transactionMS/
node transaction_service.js &

echo "--- Starting B4F service (Python) ---"
cd ..
cd ..
cd back4Front/
uvicorn api:app --reload &

wait

echo "All services have been started."
