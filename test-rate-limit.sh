#!/bin/bash

# Test de rate limiting - API Orders
# Ce script teste la limite de 5 requêtes par heure

echo "🧪 Test du Rate Limiting (5 requêtes/heure)"
echo "==========================================="
echo ""

for i in {1..7}; do
  echo "📨 Requête $i/7..."

  response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" -X POST http://localhost:3000/api/orders \
    -H "Content-Type: application/json" \
    -d '{
      "nom":"Test Rate Limit",
      "email":"test'$i'@test.com",
      "telephone":"0123456789",
      "bouquet_id":"123e4567-e89b-12d3-a456-426614174000",
      "date_heure":"2025-12-20T10:00:00"
    }')

  http_status=$(echo "$response" | grep "HTTP_STATUS" | cut -d':' -f2)
  body=$(echo "$response" | grep -v "HTTP_STATUS")

  echo "   Status: $http_status"
  echo "   Response: $body"
  echo ""

  # Si on atteint la limite (429), afficher un message spécial
  if [ "$http_status" = "429" ]; then
    echo "✅ Rate limit atteint à la requête $i (attendu après 5 requêtes)"
    echo "   Les requêtes 1-5 doivent avoir réussi (status 201)"
    echo "   Les requêtes 6+ doivent échouer (status 429)"
    break
  fi

  sleep 0.5
done

echo ""
echo "Test terminé !"
