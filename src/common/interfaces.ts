export interface Transaction {
  account: string;
  hash: string;
  lt: string;
  now: number;
  mc_block_seqno: number;
  trace_id: string;
  prev_trans_hash: string;
  prev_trans_lt: string;
  orig_status: string;
  end_status: string;
  total_fees: string;
  total_fees_extra_currencies: Record<string, unknown>;
  description: {
    type: string;
    aborted: boolean;
    destroyed: boolean;
    credit_first: boolean;
    storage_ph?: {
      storage_fees_collected: string;
      status_change: string;
    };
    credit_ph?: {
      credit: string;
    };
    compute_ph: {
      skipped: boolean;
      success: boolean;
      msg_state_used: boolean;
      account_activated: boolean;
      gas_fees: string;
      gas_used: string;
      gas_limit: string;
      gas_credit?: string;
      mode: number;
      exit_code: number;
      vm_steps: number;
      vm_init_state_hash: string;
      vm_final_state_hash: string;
    };
    action: {
      success: boolean;
      valid: boolean;
      no_funds: boolean;
      status_change: string;
      total_fwd_fees?: string;
      total_action_fees?: string;
      result_code: number;
      tot_actions: number;
      spec_actions: number;
      skipped_actions: number;
      msgs_created: number;
      action_list_hash: string;
      tot_msg_size: {
        cells: string;
        bits: string;
      };
    };
  };
  block_ref: {
    workchain: number;
    shard: string;
    seqno: number;
  };
  in_msg: {
    hash: string;
    source: string | null;
    destination: string;
    value: string | null;
    value_extra_currencies: Record<string, unknown> | null;
    fwd_fee: string | null;
    ihr_fee: string | null;
    created_lt: string | null;
    created_at: string | null;
    opcode: string;
    ihr_disabled: boolean | null;
    bounce: boolean | null;
    bounced: boolean | null;
    import_fee: string | null;
    message_content: {
      hash: string;
      body: string;
      decoded: unknown;
    };
    init_state: unknown;
    hash_norm?: string;
  };
  out_msgs: Array<{
    hash: string;
    source: string;
    destination: string;
    value: string;
    value_extra_currencies: Record<string, unknown>;
    fwd_fee: string;
    ihr_fee: string;
    created_lt: string;
    created_at: string;
    opcode: string;
    ihr_disabled: boolean;
    bounce: boolean;
    bounced: boolean;
    import_fee: null;
    message_content: {
      hash: string;
      body: string;
      decoded: unknown;
    };
    init_state: unknown;
  }>;
  account_state_before: {
    hash: string;
    balance: string;
    extra_currencies: Record<string, unknown>;
    account_status: string;
    frozen_hash: string | null;
    data_hash: string;
    code_hash: string;
  };
  account_state_after: {
    hash: string;
    balance: string;
    extra_currencies: Record<string, unknown>;
    account_status: string;
    frozen_hash: string | null;
    data_hash: string;
    code_hash: string;
  };
  emulated: boolean;
}

export interface AddressBook {
  [address: string]: {
    user_friendly: string;
    domain: string | null;
  };
}

export interface TransactionResponse {
  transactions: Transaction[];
  address_book: AddressBook;
}
