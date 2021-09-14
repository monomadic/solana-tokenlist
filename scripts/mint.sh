curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "EaDHz8Y3Xp77h8kEDD2zVxLB7Aew1Dz1szWJ9J2H4kgN",
      {
        "encoding": "jsonParsed"
      }
    ]
  }
' | jq