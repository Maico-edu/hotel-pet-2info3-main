from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def inicio():
    return {"mensagem": "API Hotel-pet-2info3 esta em funcionamento perfeitamete!"}
