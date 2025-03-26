import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Load model and tokenizer
MODEL_PATH = 'D:\\test project\\CHARGECODER\\Back-end\\fine_tuned_bert_cybercrime'
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

# Mapping extracted from dataset
id2label = {
    0: 'BNS: Section 336, IT Act: Section 72A',
    1: 'BNS: Section 332, IT Act: Section 66D',
    2: 'BNS: Section 331, IT Act: Section 66',
    3: 'BNS: Section 336, IT Act: Section 43',
    4: 'BNS: Section 334, IT Act: Section 66D',
    5: 'BNS: Section 171, IT Act: Section 72A',
    6: 'BNS: Section 337, IT Act: Section 72A',
    7: 'BNS: Section 330, IT Act: Section 43',
    8: 'BNS: Section 336, IT Act: Section 66D',
    9: 'BNS: Section 337, IT Act: Section 43A',
    10: 'BNS: Section 354, IT Act: Section 67',
    11: 'BNS: Section 334, IT Act: Section 67C',
    12: 'BNS: Section 332, IT Act: Section 72A',
    13: 'BNS: Section 330, IT Act: Section 72A',
    14: 'BNS: Section 333, IT Act: Section 67',
    15: 'BNS: Section 354, IT Act: Section 67A',
    16: 'BNS: Section 332, IT Act: Section 66',
    17: 'BNS: Section 332, IT Act: Section 70',
    18: 'BNS: Section 331, IT Act: Section 72A',
    19: 'BNS: Section 355, IT Act: Section 66C',
    20: 'BNS: Section 330, IT Act: Section 66D',
    21: 'BNS: Section 330, IT Act: Section 67A',
    22: 'BNS: Section 330, IT Act: Section 66C',
    23: 'BNS: Section 335, IT Act: Section 43',
    24: 'BNS: Section 171, IT Act: Section 66',
    25: 'BNS: Section 355, IT Act: Section 72A',
    26: 'BNS: Section 171, IT Act: Section 66D',
    27: 'BNS: Section 334, IT Act: Section 43',
    28: 'BNS: Section 335, IT Act: Section 72A',
    29: 'BNS: Section 171, IT Act: Section 70',
    30: 'BNS: Section 330, IT Act: Section 70',
    31: 'BNS: Section 334, IT Act: Section 66',
    32: 'BNS: Section 334, IT Act: Section 72A',
    33: 'BNS: Section 339, IT Act: Section 67A',
    34: 'BNS: Section 330, IT Act: Section 66',
    35: 'BNS: Section 171, IT Act: Section 43',
    36: 'BNS: Section 333, IT Act: Section 66A',
    37: 'BNS: Section 339, IT Act: Section 67',
    38: 'BNS: Section 171, IT Act: Section 43A',
    39: 'BNS: Section 355, IT Act: Section 66D',
    40: 'BNS: Section 331, IT Act: Section 43',
    41: 'BNS: Section 333, IT Act: Section 43',
    42: 'BNS: Section 333, IT Act: Section 66D',
    43: 'BNS: Section 331, IT Act: Section 67C',
    44: 'BNS: Section 171, IT Act: Section 66C',
    45: 'BNS: Section 331, IT Act: Section 43A',
    46: 'BNS: Section 333, IT Act: Section 67A',
    47: 'BNS: Section 354, IT Act: Section 66A',
    48: 'BNS: Section 332, IT Act: Section 43',
    49: 'BNS: Section 335, IT Act: Section 66',
    50: 'BNS: Section 337, IT Act: Section 66',
    51: 'BNS: Section 334, IT Act: Section 70',
    52: 'BNS: Section 330, IT Act: Section 66A',
    53: 'BNS: Section 333, IT Act: Section 66',
    54: 'BNS: Section 171, IT Act: Section 67C',
    55: 'BNS: Section 333, IT Act: Section 72A',
    56: 'BNS: Section 336, IT Act: Section 66C',
    57: 'BNS: Section 333, IT Act: Section 70',
    58: 'BNS: Section 330, IT Act: Section 67',
    59: 'BNS: Section 331, IT Act: Section 70',
    60: 'BNS: Section 332, IT Act: Section 66C',
    61: 'BNS: Section 333, IT Act: Section 66E',
    62: 'BNS: Section 330, IT Act: Section 66E',
    63: 'BNS: Section 339, IT Act: Section 66E',
    64: 'BNS: Section 335, IT Act: Section 70',
    65: 'BNS: Section 335, IT Act: Section 66D',
    66: 'BNS: Section 506, IT Act: Section 67',
    67: 'BNS: Section 420, IT Act: Section 66D',
    68: 'BNS: Section 384, IT Act: Section 66E',
    69: 'BNS: Section 420, IT Act: Section 66C',
    70: 'BNS: Section 354C, IT Act: Section 66E',
    71: 'BNS: Section 384, IT Act: Section 66F',
    72: 'BNS: Section 500, IT Act: Section 66C',
    73: 'BNS: Section 406, IT Act: Section 66D',
    74: 'BNS: Section 409, IT Act: Section 72A'
}

@api_view(["POST"])
def predict_section(request):
    data = request.data
    text = data.get("text", "")

    if not text:
        return Response({"error": "No text provided"}, status=400)

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)

    predicted_index = torch.argmax(outputs.logits, dim=-1).item()
    predicted_section = id2label.get(predicted_index, "Unknown Section")

    return Response({"predicted_section": predicted_section})
