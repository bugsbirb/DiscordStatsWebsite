import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/nav";

export default function UpdateStatsDocs() {
  return (
    <>
      <Header />    
    <div className="container mx-auto px-4 py-8 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Update Bot Stats API</CardTitle>
          <CardDescription>
            Learn how to update your bot's stats using our API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This documentation will guide you through the process of updating
            your Discord bot's stats using our API.
          </p>
          <p className="mb-4">
            To ensure your bot's stats are kept up to date, you'll need to send
            periodic updates about your bot’s guild count to the API. This
            should be done using a scheduled task in your bot's code, so it runs
            on a loop at regular intervals (e.g., every few minutes or hours,
            depending on your needs).
          </p>
          <p>
            Once you’ve set up the loop, the data will be automatically saved in
            the server's db, which you can later use for analytics and tracking
            growth.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endpoint</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>POST http://stats-pearl.vercel.app/UpdateStats</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            To authenticate the request, include your API key in the{" "}
            <strong>Authorization</strong> header:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>Authorization: api_######</code>
          </pre>
          <p className="mt-4">
            Replace <code>api_######</code> with your actual API key.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request Body</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The request body should be a JSON object containing the following
            data:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>
              {`
  {
    "guilds": number
  }
              `.trim()}
            </code>
          </pre>
          <p className="mt-4">
            Where <code>guilds</code> is the number of guilds (servers) your bot
            is currently in.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example Request</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Here's an example of how to make a request using curl:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>
              {`
  curl --request POST \\
    --url 'http://127.0.0.1:8000/Updatestats' \\
    --header 'Authorization: api_######' \\
    --header 'Content-Type: application/json' \\
    --data '{
      "guilds": 10000
    }'
              `.trim()}
            </code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Upon a successful update, you should receive a response indicating
            that the stats were updated.
          </p>
          <p className="mb-4">A successful response will look like:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>
              {`
  {
    "message": "Stats updated successfully"
  }
              `.trim()}
            </code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Handling</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            If an error occurs, the API will return an appropriate HTTP status
            code along with an error message.
          </p>
          <p className="mb-4">Here are the common errors:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>401 Unauthorized</strong>: Invalid or missing API key in
              the <code>Authorization</code> header.
            </li>
            <li>
              <strong>400 Bad Request</strong>: Invalid or missing data in the
              request body.
            </li>
            <li>
              <strong>404 Not Found</strong>: No bot found with the provided API
              key or no update made.
            </li>
            <li>
              <strong>500 Internal Server Error</strong>: Server-side issues
              like database errors.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
    </>

  );
}
