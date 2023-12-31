module sandbox::i_coin {
    use std::string::{Self, String};
    use std::vector::{Self};
    use std::option;

    use sui::coin::{Self, TreasuryCap};
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::vec_set::{Self, VecSet};
    use sui::dynamic_field as df;
    use sui::dynamic_object_field as dof;

    const MAX_RECENT_POSTS: u64 = 20;

    // must be the same as the capitalized module name
    struct I_COIN has drop {}

    fun liked_key(): String {
        string::utf8(b"liked")
    }

    fun repled_key(): String {
        string::utf8(b"replyed")
    }

    fun init(
        witness: I_COIN,
        ctx: &mut TxContext
    ) {
    //     create_coin(witness, ctx);
    // }

    // fun create_coin(
    //     witness: I_COIN,
    //     ctx: &mut TxContext,
    // ) {
        let (treasury_cap, metadata) = coin::create_currency<I_COIN>(
            witness,
            2,
            b"LIKE",
            b"Like Coin",
            b"Like Coin for Suitter",
            option::none(),
            ctx,
        );
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx))
    }

    struct Post has key, store {
        id: UID,
        text: String,
        created_at: u64,
        author: address,
        count_likes: u64,
        count_replies: u64,
    }

    struct ReplyPool has key, store {
        id: UID,
    }

    struct RecentPosts has key, store {
        id: UID,
        posts: vector<ID>,
    }

    fun new_post(
        text: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Post {
        let post = Post {
            id: object::new(ctx),
            text: string::utf8(text),
            created_at: clock::timestamp_ms(clock),
            author: tx_context::sender(ctx),
            count_likes: 0,
            count_replies: 0,
        };
        df::add(&mut post.id, liked_key(), vec_set::empty<address>());
        dof::add(&mut post.id, repled_key(), ReplyPool { id: object::new(ctx) });
        post
    }

    public entry fun create_post(
        text: vector<u8>,
        recent_posts: &mut RecentPosts,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        let post = new_post(text, clock, ctx);
        update_recent_posts(recent_posts, object::id(&post));
        transfer::public_share_object(post);
    }

    public entry fun like_post<T>(
        your_post: &mut Post,
        treasury_cap: &mut TreasuryCap<T>,
        ctx: &mut TxContext,
    ) {
        your_post.count_likes = your_post.count_likes + 1;
        let liked_set: &mut VecSet<address> = df::borrow_mut(&mut your_post.id, liked_key());
        let my_address = tx_context::sender(ctx);
        vec_set::insert(liked_set, my_address);

        let your_address = your_post.author;
        mint_like_and_transfer(treasury_cap, 1, your_address, ctx);
    }

    public entry fun reply_post(
        your_post: &mut Post,
        text: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        your_post.count_replies = your_post.count_replies + 1;
        let reply_pool: &mut ReplyPool = dof::borrow_mut(&mut your_post.id, repled_key());
        let my_post = new_post(text, clock, ctx);
        let my_post_id = object::id(&my_post);
        dof::add(&mut reply_pool.id, my_post_id, my_post);
    }

    fun create_recent_posts(
        ctx: &mut TxContext,
    ) {
        let recent_posts = RecentPosts {
            id: object::new(ctx),
            posts: vector::empty()
        };
        transfer::public_share_object(recent_posts);
    }

    fun update_recent_posts(
        recent_posts: &mut RecentPosts,
        post_id: ID,
    ) {
        // TODO: Use Deque
        vector::push_back(&mut recent_posts.posts, post_id);
        if (vector::length(&recent_posts.posts) > MAX_RECENT_POSTS) {
            vector::remove<ID>(&mut recent_posts.posts, 0);
        };
    }

    fun mint_like_and_transfer<T>(
        treasury_cap: &mut TreasuryCap<T>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}
