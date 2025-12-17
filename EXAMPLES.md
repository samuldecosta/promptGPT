# API Testing Examples

## Using cURL

### Health Check
```bash
curl http://localhost:3000/health
```

### Get Content (Basic)
```bash
curl "http://localhost:3000/api/v1/content?productID=123&requestor=myapp&limit=10"
```

### Get Content (Real Example - Replace with actual values)
```bash
curl "http://localhost:3000/api/v1/content?productID=YOUR_PRODUCT_ID&requestor=YOUR_REQUESTOR&limit=5"
```

## Using Postman or Browser

### Health Check
```
GET http://localhost:3000/health
```

### Get Content
```
GET http://localhost:3000/api/v1/content?productID=123&requestor=myapp&limit=10
```

## Using JavaScript (fetch)

```javascript
// Example using fetch API
async function getContent(productID, requestor, limit = 10) {
  try {
    const url = new URL('http://localhost:3000/api/v1/content');
    url.searchParams.append('productID', productID);
    url.searchParams.append('requestor', requestor);
    url.searchParams.append('limit', limit);

    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
getContent('123', 'myapp', 5);
```

## Using Node.js (axios)

```javascript
const axios = require('axios');

async function getContent(productID, requestor, limit = 10) {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/content', {
      params: {
        productID,
        requestor,
        limit
      }
    });
    
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Usage
getContent('123', 'myapp', 5);
```

## Expected Response Format

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "designId": "design123",
      "designConceptId": "concept456",
      "designConceptName": "Business Card Design",
      "studioUrl": "https://example.com/studio/...",
      "previewUrls": [
        "https://example.com/preview1.jpg",
        "https://example.com/preview2.jpg"
      ],
      "productOptions": {
        "color": "blue",
        "size": "standard"
      }
    },
    {
      "designId": "design789",
      "designConceptId": "concept012",
      "designConceptName": "Flyer Design",
      "studioUrl": "https://example.com/studio/...",
      "previewUrls": [
        "https://example.com/preview3.jpg"
      ],
      "productOptions": {
        "orientation": "landscape"
      }
    }
  ]
}
```

## Error Response Examples

### Missing Parameter
```json
{
  "success": false,
  "error": "Missing required parameter: productID"
}
```

### Invalid Limit
```json
{
  "success": false,
  "error": "Invalid limit parameter: must be a positive number"
}
```

### Upstream API Error
```json
{
  "error": "Vistaprint API Error: 404 - Not Found"
}
```
