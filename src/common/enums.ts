export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Network {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

type NetworkMap = {
  [key in Network]: string;
};

export const TON_CENTER_API_V3: NetworkMap = {
  [Network.MAINNET]: 'https://toncenter.com/api/v3',
  [Network.TESTNET]: 'https://testnet.toncenter.com/api/v3',
};

export enum Sort {
  DESC = 'desc',
  ASC = 'asc',
}

export enum Direction {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}
