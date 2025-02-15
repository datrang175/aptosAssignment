module counter_addr::Counter {
    use std::signer;

    struct CountHolder has key {
        count: u64,
    }

    #[view]
    public fun getCount(addr: address): u64 acquires CountHolder {
        assert!(exists<CountHolder>(addr), 0);
        *&borrow_global<CountHolder>(addr).count
    }

    public entry fun increment(account: &signer) acquires CountHolder {
        let addr = signer::address_of(account);
        if (!exists<CountHolder>(addr)) {
            move_to(account, CountHolder { count: 0 });
        };
        let countHolderRef = borrow_global_mut<CountHolder>(addr);
        countHolderRef.count = countHolderRef.count + 1;
    }
}
