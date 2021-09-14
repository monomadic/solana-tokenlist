#  find all token accounts for the TESTpKgj42ya3st2SQTKiANjTBmncQSCqLAZGcSPLGM mint:
curl http://api.mainnet-beta.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      {
        "encoding": "jsonParsed",
        "filters": [
          {
            "dataSize": 165
          },
          {
            "memcmp": {
              "offset": 0,
              "bytes": "TESTpKgj42ya3st2SQTKiANjTBmncQSCqLAZGcSPLGM"
            }
          }
        ]
      }
    ]
  }
'