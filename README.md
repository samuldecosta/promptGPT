# Vistaprint Content API Wrapper

A Node.js API wrapper for the Vistaprint Gallery Content API with response normalization.

## Features

- ✅ Express.js REST API
- ✅ Wraps Vistaprint Gallery Content API
- ✅ Response normalization (returns only essential fields)
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled

## Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) For development with auto-reload:
```bash
npm install
```

## Usage

### Start the Server

**Production:**
```bash
npm start
```

**Development (with auto-reload):**
```bash
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-12-17T10:30:00.000Z"
}
```

### Get Content

**GET** `/api/v1/content`

Fetches and normalizes content from Vistaprint Gallery API.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productID` | string | Yes | The product ID |
| `requestor` | string | Yes | The requestor identifier |
| `limit` | number | No | Maximum number of results (default: 10) |

**Example Request:**
```bash
curl "http://localhost:3000/api/v1/content?productID=123&requestor=myapp&limit=5"
```

**Example Response:**
```json
{
  "success": true,
  "count": 5,
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
    }
  ]
}
```

## Normalized Response Fields

The API normalizes the Vistaprint response to include only these fields:

- `designId` - The design identifier
- `designConceptId` - The design concept identifier
- `designConceptName` - The name of the design concept
- `studioUrl` - URL to the studio editor
- `previewUrls` - Array of preview image URLs
- `productOptions` - Object containing product options

## Error Handling

The API returns appropriate HTTP status codes and error messages:

**400 Bad Request** - Missing or invalid parameters:
```json
{
  "success": false,
  "error": "Missing required parameter: productID"
}
```

**500 Internal Server Error** - Server or upstream API errors:
```json
{
  "error": "Vistaprint API Error: 404 - Not Found"
}
```

## Project Structure

```
vistaprint-gpt/
├── src/
│   ├── server.js                    # Express app setup
│   ├── routes/
│   │   └── content.routes.js        # Route definitions
│   ├── controllers/
│   │   └── content.controller.js    # Request handlers
│   └── services/
│       └── content.service.js       # Business logic & API calls
├── package.json
└── README.md
```

## Development

The project follows a clean architecture pattern:

- **Routes** - Define API endpoints
- **Controllers** - Handle HTTP requests/responses and validation
- **Services** - Contain business logic and external API calls

## Environment Variables

You can customize the server using environment variables:

- `PORT` - Server port (default: 3000)

## License

ISC

---

## Ways Of Contributing

Every team member will be responsible for one particular direction, those are as follow:

### Explore if we need build Public API to expose Vistaprint APIs (gallery names, content query etc...)
### Develop and refine proper instructions for the vistaprint-gpt.
### Develop and refine conversation starters. 
### Develop and refine Knowledge Base for GPT.
### Test and decide on recommended GPT Model.
### Create and refine Actions for the GPT.  

