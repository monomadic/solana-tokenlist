curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "EQqMwocey9poFmWep7aUsagFmnVsnwNyg4b1eBQmitPQ",
      {
        "encoding": "jsonParsed"
      }
    ]
  }
' | jq