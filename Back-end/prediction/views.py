import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Load model and tokenizer
MODEL_PATH = 'C:\\Users\\ashis\\Downloads\\CHARGECODER\\Back-end\\fine_tuned_bert_cybercrime'
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

@api_view(["POST"])
def predict_section(request):
    data = request.data
    text = data.get("text", "")

    if not text:
        return Response({"error": "No text provided"}, status=400)

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)

    predictions = torch.argmax(outputs.logits, dim=-1).item()
    return Response({"predicted_section": predictions})
