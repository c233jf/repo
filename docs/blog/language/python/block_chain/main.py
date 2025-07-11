import uuid
from fastapi import FastAPI

from blockchain import Blockchain, Transaction


app = FastAPI()

blockchain = Blockchain()
node_identifier = str(uuid.uuid4())


@app.get("/mine")
async def mine():
    # We run the proof of work algorithm to get the next proof...
    last_block = blockchain.last_block
    last_proof = last_block["proof"]
    proof = blockchain.proof_of_work(last_proof)

    # We must receive a reward for finding the proof.
    # The sender is "0" to signify that this node has mined a new coin.
    blockchain.new_transaction(
        sender="0", recipient=node_identifier, amount=1)

    # Forge the new Block by adding it to the chain
    previous_hash = blockchain.hash(last_block)
    block = blockchain.new_block(proof, previous_hash)

    return {
        "message": "New Block Forged",
        "index": block["index"],
        "transactions": block["transactions"],
        "proof": block["proof"],
        "previous_hash": block["previous_hash"],
    }


@app.post("/transactions/new")
async def new_transaction(transaction: Transaction):
    index = blockchain.new_transaction(
        transaction["sender"], transaction["recipient"], transaction["amount"])
    return {"message": f"Transaction will be added to Block {index}"}


@app.get("/chain")
async def full_chain():
    response = {
        "chain": blockchain.chain,
        "length": len(blockchain.chain),
    }
    return response


@app.post("/nodes/register")
async def register_nodes(addresses: list[str]):
    for address in addresses:
        blockchain.register_node(address)

    response = {
        "message": "New nodes have been added",
        "total_nodes": list(blockchain.nodes),
    }
    return response


@app.get("/nodes/resolve")
async def consensus():
    replaced = blockchain.resolve_conflicts()

    if replaced:
        response = {
            "message": "Our chain was replaced",
            "new_chain": blockchain.chain,
        }
    else:
        response = {
            "message": "Our chain is authoritative",
            "chain": blockchain.chain,
        }

    return response
