# TON Wallet Listener

A NestJS-based service for monitoring TON blockchain wallet transactions and sending notifications via webhooks.

## Features

- Monitors a specified TON wallet for incoming and outgoing transactions
- Supports both mainnet and testnet
- Sends notifications to configured webhooks

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v comb16 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

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
2. Configure the `.env` file with the following variables:
   - `ADDRESS`: TON wallet address to monitor
   - `WEBHOOK`: Default webhook URL
   - `NETWORK`: Network to use (`mainnet` or `testnet`)
   - `FREQUENCY`: Polling interval in milliseconds (e.g., `5000`)
   - `API_KEY`: Your Toncenter API key
   - `PORT`: Server port (default: `3133`)

   Example:
   ```env
   ADDRESS=0QCBjGmzK0pr7MNPEe6wZ-34Kj0ZckqtAZcZ-pT1z4dwKCrF
   WEBHOOK=https://webhook.site/decdc976-6c3b-425b-8061-d59ef0cd8edc
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

#### Docker

Run the application using Docker:

```bash
docker run -d \
  --name ton-wallet-listener \
  -e ADDRESS=0QCBjGmzK0pr7MNPEe6wZ-34Kj0ZckqtAZcZ-pT1z4dwKCrF \
  -e WEBHOOK=https://webhook.site/decdc976-6c3b-425b-8061-d59ef0cd8edc \
  -e NETWORK=testnet \
  -e FREQUENCY=5000 \
  -e API_KEY=123456789 \
  -e PORT=3133 \
  -p 3133:3133 \
  ghcr.io/l1ttps/ton-wallet-listener:latest
```

The service will start monitoring the specified wallet and send notifications to the configured webhook.

### Testing

```bash
npm run test
```

## License

This project is licensed under the MIT License.
