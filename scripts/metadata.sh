
# cluster: https://api.devnet.solana.com
# wallet: 4DQpzL1SCiutXjhCzGDCwcgShYxFKVxw13RZSvWKBqaa
# nft account: 7pr5qg3PpVrxVs571BLiGhb8WvF1J5VaSbq5t33XrxPH
# nft token: 6eNvdpQdJkZa1At6Upco94gHBCcPRKPhz1yNzJdLLiku
# nft mint: EaDHz8Y3Xp77h8kEDD2zVxLB7Aew1Dz1szWJ9J2H4kgN
# spl program: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
# metadata program: metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s
# metaplex program: p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98

# pulled by metaplex prog: EQqMwocey9poFmWep7aUsagFmnVsnwNyg4b1eBQmitPQ

# wallet -> token-account -> nft-token -> nft-mint -> metaplex-metadata

# find all metadata accounts for nft mint 6eNvdpQdJkZa1At6Upco94gHBCcPRKPhz1yNzJdLLiku
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
              "bytes": "EaDHz8Y3Xp77h8kEDD2zVxLB7Aew1Dz1szWJ9J2H4kgN"
            }
          }
        ]
      }
    ]
  }
' | jq