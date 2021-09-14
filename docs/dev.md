# Development Tips

## JSON RPC API
https://docs.solana.com/developing/clients/jsonrpc-api

- string addresses are base58 (note base58 can be recognised as: a-zA-Z1-9 without 0 or o).
- program ids are not account pubkeys, they are derived addresses.
    - program ids look like:        `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`
    - account pubkeys look like:    `83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri`

## METADATA

- The concept of the Token Metadata program is to provide decorator structs to a token mint. 
