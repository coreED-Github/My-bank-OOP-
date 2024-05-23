#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("your balance in empty");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount}Successful. Remaining balance: $${this.balance}`);
    }
    checkBalance() {
        console.log(`current balance: $${this.balance}`);
    }
}
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNum;
    account;
    constructor(firstName, lastName, gender, age, mobileNum, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNum = mobileNum;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(10001, 5000),
    new BankAccount(10002, 10000),
    new BankAccount(10003, 2000),
];
const customers = [
    new customer("Saira", "Mahira", "female", 24, 33332223, accounts[0]),
    new customer("Saima", "Tania", "female", 20, 33332290, accounts[1]),
    new customer("Laiba", "Iqra", "female", 19, 333322765, accounts[2])
];
async function service() {
    do {
        const accountNumInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumInput.accountNumber);
        if (customer) {
            console.log(`Welcome!, ${customer.firstName}, ${customer.lastName}! \n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "check balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "check balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting program...");
                    console.log("\n Thank you for using our bank services.");
                    return;
            }
        }
        else {
            console.log("Your account number is invalid. Try again.");
        }
    } while (true);
}
service();
