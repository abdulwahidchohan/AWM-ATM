#! /usr/bin/env node
import inquirer from "inquirer";
// Account data (replace with actual data storage mechanism)
const accounts = {
    4532350: { accountNumber: 4532350, pin: 1234, balance: 10000 },
};
async function main() {
    // Account number prompt
    const { accountNum } = await inquirer.prompt({
        type: "number",
        name: "accountNum",
        message: "Enter your Account Number: ",
    });
    // Validate account number
    if (!accounts[accountNum]) {
        console.log("Incorrect Account Number!!!");
        return;
    }
    // PIN prompt
    const { pinNumber } = await inquirer.prompt({
        type: "number",
        name: "pinNumber",
        message: "Enter your pin number: ",
    });
    // Validate PIN
    if (accounts[accountNum].pin !== pinNumber) {
        console.log("Invalid PIN number.");
        return;
    }
    // Main menu prompt
    const { choice } = await inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Select an option: ",
        choices: ["Check Balance", "Withdraw Cash", "Exit"],
    });
    switch (choice) {
        case "Check Balance":
            console.log(`Your balance is: $${accounts[accountNum].balance}`);
            break;
        case "Withdraw Cash":
            const amount = await getWithdrawalAmount();
            if (amount > accounts[accountNum].balance) {
                console.error("Insufficient funds.");
            }
            else {
                accounts[accountNum].balance -= amount;
                console.log(`Withdrawal successful. New balance: $${accounts[accountNum].balance}`);
            }
            break;
        case "Exit":
            console.log("Exiting ATM.");
            break;
    }
}
async function getWithdrawalAmount() {
    const { withdrawalAmount } = await inquirer.prompt({
        type: "number",
        name: "withdrawalAmount",
        message: "Enter withdrawal amount: ",
    });
    return withdrawalAmount;
}
main();
