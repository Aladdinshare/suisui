module sandbox::people {
    use std::string::{Self, String};
    use std::vector::{Self};

    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    fun init(ctx: &mut TxContext) {
    }

    /// wrapped store
    struct People has store, drop {
        name: String,
        img: String,
        author: address,
    }

    /// top struct key-value
    struct Thread has key, store {
        id: UID,
        post_list: vector<People>,
    }

    public entry fun new_people(
        ctx: &mut TxContext,
    ) {
        let memo = Thread {
            id: object::new(ctx),
            post_list: vector::empty(),
        };
        transfer::public_share_object(memo);
    }

    public entry fun write_people(
        thread: &mut Thread,
        name: vector<u8>,
        img: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let people = People {
            name: string::utf8(name),
            img: string::utf8(img),
            author: tx_context::sender(ctx),
        };
        vector::push_back(&mut thread.post_list, people);
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}
