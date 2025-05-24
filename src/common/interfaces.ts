import { Direction } from './enums';

// Interface cho address_book
export interface AddressBook {
  [key: string]: AddressEntry;
}

export interface AddressEntry {
  domain: string;
  user_friendly: string;
}

// Interface cho extra_currencies
export interface ExtraCurrencies {
  [key: string]: string;
}

// Interface cho account_state_before và account_state_after
export interface AccountState {
  account_status: string;
  balance: string;
  code_boc: string;
  code_hash: string;
  data_boc: string;
  data_hash: string;
  extra_currencies: ExtraCurrencies;
  frozen_hash: string;
  hash: string;
}

// Interface cho block_ref
export interface BlockRef {
  seqno: number;
  shard: string;
  workchain: number;
}

// Interface cho tot_msg_size
export interface TotalMessageSize {
  bits: string;
  cells: string;
}

// Interface cho action
export interface Action {
  action_list_hash: string;
  msgs_created: number;
  no_funds: boolean;
  result_arg: number;
  result_code: number;
  skipped_actions: number;
  spec_actions: number;
  status_change: string;
  success: boolean;
  tot_actions: number;
  tot_msg_size: TotalMessageSize;
  total_action_fees: string;
  total_fwd_fees: string;
  valid: boolean;
}

// Interface cho bounce
export interface Bounce {
  fwd_fees: string;
  msg_fees: string;
  msg_size: TotalMessageSize;
  req_fwd_fees: string;
  type: string;
}

// Interface cho compute_ph
export interface ComputePhase {
  account_activated: boolean;
  exit_arg: number;
  exit_code: number;
  gas_credit: string;
  gas_fees: string;
  gas_limit: string;
  gas_used: string;
  mode: number;
  msg_state_used: boolean;
  reason: string;
  skipped: boolean;
  success: boolean;
  vm_final_state_hash: string;
  vm_init_state_hash: string;
  vm_steps: number;
}

// Interface cho credit_ph
export interface CreditPhase {
  credit: string;
  credit_extra_currencies: ExtraCurrencies;
  due_fees_collected: string;
}

// Interface cho split_info
export interface SplitInfo {
  acc_split_depth: number;
  cur_shard_pfx_len: number;
  sibling_addr: string;
  this_addr: string;
}

// Interface cho storage_ph
export interface StoragePhase {
  status_change: string;
  storage_fees_collected: string;
  storage_fees_due: string;
}

// Interface cho description
export interface Description {
  aborted: boolean;
  action: Action;
  bounce: Bounce;
  compute_ph: ComputePhase;
  credit_first: boolean;
  credit_ph: CreditPhase;
  destroyed: boolean;
  installed: boolean;
  is_tock: boolean;
  split_info: SplitInfo;
  storage_ph: StoragePhase;
  type: string;
}

// Interface cho decoded
export interface Decoded {
  comment: string;
  type: string;
}

// Interface cho init_state và message_content
export interface MessageContent {
  body: string;
  decoded: Decoded;
  hash: string;
}

// Interface cho in_msg và out_msgs
export interface Message {
  bounce: boolean;
  bounced: boolean;
  created_at: string;
  created_lt: string;
  destination: string;
  fwd_fee: string;
  hash: string;
  hash_norm: string;
  ihr_disabled: boolean;
  ihr_fee: string;
  import_fee: string;
  in_msg_tx_hash: string;
  init_state: MessageContent;
  message_content: MessageContent;
  opcode: number;
  out_msg_tx_hash: string;
  source: string;
  value: string;
  value_extra_currencies: ExtraCurrencies;
}

// Interface cho transaction
export interface Transaction {
  account: string;
  account_state_after: AccountState;
  account_state_before: AccountState;
  block_ref: BlockRef;
  description: Description;
  emulated: boolean;
  end_status: string;
  hash: string;
  in_msg: Message;
  lt: string;
  mc_block_seqno: number;
  now: number;
  orig_status: string;
  out_msgs: Message[];
  prev_trans_hash: string;
  prev_trans_lt: string;
  total_fees: string;
  total_fees_extra_currencies: ExtraCurrencies;
  trace_external_hash: string;
  trace_id: string;
}

// Interface chính cho toàn bộ JSON
export interface BlockchainData {
  address_book: AddressBook;
  transactions: Transaction[];
}

export interface Notification {
  value: string | number;
  direction: Direction;
  message: Message;
  timeStamp: number;
}
