curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "6eNvdpQdJkZa1At6Upco94gHBCcPRKPhz1yNzJdLLiku",
      {
        "encoding": "jsonParsed"
      }
    ]
  }
' | jq