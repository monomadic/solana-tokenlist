# getTokenAccountsByOwner(<wallet pubkey>, mint: <nft-token>)

curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getTokenAccountsByOwner",
    "params": [
      "4DQpzL1SCiutXjhCzGDCwcgShYxFKVxw13RZSvWKBqaa",
      {
        "mint": "6eNvdpQdJkZa1At6Upco94gHBCcPRKPhz1yNzJdLLiku"
      },
      {
        "encoding": "jsonParsed"
      }
    ]
  }
' | jq