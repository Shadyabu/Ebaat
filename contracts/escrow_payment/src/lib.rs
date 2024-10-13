#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, token::TokenClient, Address, Env};

// const COUNTER: Symbol = symbol_short!("COUNTER");
// const SWITCH: Symbol = symbol_short!("SWITCH");

/*
    Bob is the seller, he creates a payment link which includes his address and the amount -> create_escrow_payment
    Alice opens the link, which fills in her address as the source of the payment (auth later)
    Alice completes the payment with the authentication -> change some states in
*/

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Init,
    Balance,
    ClaimableBalance,
}

#[derive(Clone)]
#[contracttype]
pub struct Balance {
    pub token: Address,
    pub amount: i128,
    pub releaser: Address,
}

#[derive(Clone)]
#[contracttype]
pub struct ClaimableBalance {
    pub balance: Balance,
    pub claimant: Address,
}

#[contract]
pub struct EscrowPayment;

// escrowpayment

fn is_initialized(env: &Env) -> bool {
    env.storage().instance().has(&DataKey::Init)
}

#[contractimpl]
impl EscrowPayment {
    //test

    /// Increment increments an internal counter, and returns the value.

    pub fn deposit(env: Env, from: Address, token: Address, amount: i128) {
        if is_initialized(&env) {
            panic!("contract has been already initialized");
        }

        // Make sure `from` address authorized the deposit call with all the
        // arguments.
        from.require_auth();

        // Transfer token from `from` to this contract address.
        TokenClient::new(&env, &token).transfer(&from, &env.current_contract_address(), &amount);
        // Store all the necessary info to allow one of the claimants to claim it.

        let releaser = from.clone();

        env.storage().instance().set(
            &DataKey::Balance,
            &Balance {
                token,
                amount,
                releaser,
            },
        );
        // Mark contract as initialized to prevent double-usage.
        // Note, that this is just one way to approach initialization - it may
        // be viable to allow one contract to manage several claimable balances.
        env.storage().instance().set(&DataKey::Init, &());
    }

    // add claimant
    pub fn claim(env: Env, claimant: Address) {
        claimant.require_auth();
        let balance: Balance = env.storage().instance().get(&DataKey::Balance).unwrap();

        env.storage().instance().set(
            &DataKey::ClaimableBalance,
            &ClaimableBalance { balance, claimant },
        );
    }

    pub fn release(env: Env, releaser: Address) {
        releaser.require_auth();

        let claimable_balance: ClaimableBalance = env
            .storage()
            .instance()
            .get(&DataKey::ClaimableBalance)
            .unwrap();
        let original_releaser = &claimable_balance.balance.releaser;

        if !original_releaser.eq(&releaser) {
            panic!("releaser is not allowed to release this balance");
        }

        let claimant = &claimable_balance.claimant;

        // Transfer the stored amount of token to claimant after passing
        // all the checks.
        TokenClient::new(&env, &claimable_balance.balance.token).transfer(
            &env.current_contract_address(),
            &claimant,
            &claimable_balance.balance.amount,
        );
        // Remove the balance entry to prevent any further claims.
        env.storage().instance().remove(&DataKey::Balance);
    }
}

mod test;
