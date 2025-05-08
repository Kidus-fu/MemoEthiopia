import base64
import json

def encode_query_data(data: dict):
    json_str = json.dumps(data)
    return base64.urlsafe_b64encode(json_str.encode()).decode()

def decode_query_data(encoded: str):
    decoded_bytes = base64.urlsafe_b64decode(encoded)
    return json.loads(decoded_bytes.decode())
