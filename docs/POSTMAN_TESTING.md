# Postman API Testing

## Collection

Import `postman/Todo_API.postman_collection.json` into Postman.

The collection uses this variable:

```text
baseUrl = http://localhost:5000/api/tasks
```

Start MongoDB and the backend before running the collection.

## How to Run the Complete Test

1. Open Postman.
2. Click **Import**.
3. Select `Todo_API.postman_collection.json`.
4. Open the imported **Todo API - Jatin Task** collection.
5. Confirm the `baseUrl` collection variable is `http://localhost:5000/api/tasks`.
6. Click the collection menu and choose **Run collection**.
7. Run the requests in their saved order.
8. Confirm every test shows **Passed**.
9. Take one screenshot of the Collection Runner summary and keep it with the project submission.

## Requests Covered

| No. | Test | Expected result |
|---:|---|---|
| 1 | API health check | `200` |
| 2 | Get all tasks | `200`, tasks array |
| 3 | Reject short title | `400` validation response |
| 4 | Create task | `201`, saves returned task ID |
| 5 | Search task | `200`, tasks array |
| 6 | Update task | `200`, updated title |
| 7 | Complete task | `200`, `completed` is `true` |
| 8 | Reject invalid ObjectId | `400` before database query |
| 9 | Delete task | `200` |
| 10 | Deleted task is not found | `404` |

## Manual Testing Notes

The collection automatically stores the ID returned by **Create task** in the `taskId` variable. Later update, status, and delete requests reuse that same ID.

After running the collection, record the result below and attach a screenshot. This section should be completed by the student on the same computer used for submission.

```text
Test date: ____________________
Backend URL: http://localhost:5000
MongoDB used: Local / Atlas
Total requests: 10
Passed: ______
Failed: ______
Screenshot filename: ____________________
```

## Why These Tests Matter

- The short-title request proves backend validation works.
- The invalid-ID request proves MongoDB ObjectId format is checked before a query.
- The deleted-task request proves the API returns a correct `404` response.
- Running the full sequence proves create, read, update, status change, search and delete all work together.
