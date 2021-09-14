# https://docs.solana.com/developing/clients/jsonrpc-api
curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
      {
        "encoding": "jsonParsed",
        "filters": [
          {
            "memcmp": {
              "offset": 0,
              "bytes": "1"
            }
          }
        ]
      }
    ]
  }
' | jq