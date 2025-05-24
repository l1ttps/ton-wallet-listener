# TON Wallet Listener

A NestJS-based service for listening to TON blockchain wallet transactions and sending notifications via webhooks.

## Features

- Monitors a specified TON wallet for incoming and outgoing transactions
- Supports both mainnet and testnet
- Sends notifications to configured webhooks

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/l1ttps/ton-wallet-listener.git
   cd ton-wallet-listener
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Copy the example environment file and edit it:
   ```bash
   cp example.env .env
   ```
2. Open `.env` and configure the following variables:

   - `ADDRESS`: The TON wallet address to monitor
   - `NETWORK`: Network to use (`mainnet` or `testnet`)
   - `FREQUENCY`: Polling interval in milliseconds (e.g., `5000`)
   - `API_KEY`: Your Toncenter API key
   - `PORT`: Port for the server (default: `3133`)

   Example:

   ```env
   ADDRESS=0QCBjGmzK0pr7MNPEe6wZ-34Kj0ZckqtAZcZ-pT1z4dwKCrF
   NETWORK=testnet
   FREQUENCY=5000
   API_KEY=123456789
   PORT=3133
   ```

### Running the Application

#### Development

```bash
npm run start:dev
```

#### Production

```bash
npm run start:prod
```

The service will start and begin monitoring the specified wallet. Notifications will be sent to configured webhooks.

### Testing

```bash
npm run test
```

## License

This project is licensed under the MIT License.
