# How to Add API to Custom GPT Actions

## Step 1: Deploy Your API to Render
Make sure your API is deployed and get the live URL (e.g., `https://vistaprint-content-api.onrender.com`)

## Step 2: Update the OpenAPI Schema
1. Open `openapi-schema.json`
2. Replace the server URL on line 11:
   ```json
   "url": "https://your-app-name.onrender.com"
   ```
   with your actual Render URL:
   ```json
   "url": "https://vistaprint-content-api.onrender.com"
   ```

## Step 3: Create/Edit Your Custom GPT
1. Go to [ChatGPT](https://chat.openai.com)
2. Click your profile → **"My GPTs"**
3. Click **"Create a GPT"** or edit an existing one

## Step 4: Configure the Action
1. Go to the **"Configure"** tab
2. Scroll down to **"Actions"** section
3. Click **"Create new action"**

## Step 5: Import the Schema
You have two options:

### Option A: Import from URL (Recommended)
1. After deploying, host the `openapi-schema.json` somewhere accessible
2. Click **"Import from URL"**
3. Paste the URL to your schema file

### Option B: Copy-Paste (Easiest)
1. Open `openapi-schema.json`
2. Copy the entire content
3. In Custom GPT, click **"Import from URL"** and then switch to manual editor
4. Paste the schema
5. Click **"Save"**

## Step 6: Configure Authentication (Optional)
For this POC API, no authentication is needed:
- Set **Authentication** to **"None"**

## Step 7: Test the Action
1. In the schema editor, you'll see available operations:
   - `healthCheck`
   - `getContent`
   - `getImageRedirect`
2. Click **"Test"** next to `getContent`
3. Fill in test parameters:
   - `productID`: `123`
   - `requestor`: `myapp`
   - `limit`: `10`
4. Click **"Run"**

## Step 8: Add Instructions to Your GPT
In the **"Instructions"** section, add something like:

```
You are a Vistaprint design assistant. You can help users find and browse gallery designs.

When users ask about designs or templates, use the getContent action to fetch design information from the Vistaprint gallery.

Parameters:
- productID: The product type identifier (e.g., business cards, flyers)
- requestor: Use "customgpt" as the requestor
- limit: Number of designs to fetch (default 10)

Present the results in a user-friendly way, showing:
- Design concept names
- Preview images (use the previewUrl)
- Studio URLs for editing
```

## Step 9: Save and Test
1. Click **"Save"** in the top right
2. Go to the **"Preview"** pane
3. Test with prompts like:
   - "Show me 5 business card designs"
   - "Find templates for product ID 123"

## Example Prompts Your GPT Can Handle

```
User: "Show me some business card designs"
GPT: Calls getContent(productID="businesscards", requestor="customgpt", limit=5)
     Then displays the results with images and links

User: "I need 10 flyer templates"
GPT: Calls getContent(productID="flyers", requestor="customgpt", limit=10)
     Then shows the design options

User: "Check if the API is working"
GPT: Calls healthCheck()
     Then confirms the status
```

## Available Operations in Your Custom GPT

### 1. **healthCheck**
- Check API status
- No parameters required

### 2. **getContent** (Main Operation)
- **Required**: `productID`, `requestor`
- **Optional**: `limit` (default: 10)
- Returns normalized design data with short preview URLs

### 3. **getImageRedirect**
- Redirects to original image
- **Required**: `hash` (8-character identifier)
- Usually not called directly by GPT

## Schema Features

✅ OpenAPI 3.1.0 compliant
✅ Full request/response examples
✅ Detailed parameter descriptions
✅ Error response schemas
✅ Type definitions for all fields
✅ Ready for ChatGPT Actions

## Troubleshooting

### Action Test Fails
- Verify your Render app is deployed and running
- Check the server URL in the schema matches your Render URL
- Ensure the API responds to health check

### GPT Doesn't Use Action
- Add clear instructions about when to use the action
- Use keywords like "fetch designs", "get templates" in instructions
- Test with direct prompts mentioning the action purpose

### Invalid Schema Error
- Validate your JSON at [jsonlint.com](https://jsonlint.com)
- Ensure all quotes and commas are correct
- Check that the server URL is properly formatted

---

## Quick Copy-Paste for Testing

**Server URL (update this):**
```
https://your-app-name.onrender.com
```

**Test Parameters:**
```json
{
  "productID": "123",
  "requestor": "customgpt",
  "limit": 5
}
```

---

Need help? Check that:
1. ✅ API is deployed and accessible
2. ✅ Server URL in schema is correct
3. ✅ Authentication is set to "None"
4. ✅ GPT has clear instructions on when to use the action
