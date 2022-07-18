import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;
  
  const { Items } = await document.query({
    TableName: "todos",
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid": userid
    }
  }).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      todos: Items
    })
  }
} 