import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from "uuid";

import { document } from "../utils/dynamodbClient";

interface ITodoRequestBody {
  title: string;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ITodoRequestBody;

  const Item = {
    id: uuid(),
    userid,
    title,
    done: false,
    deadline: new Date(deadline).toUTCString()
  }

  await document.put({
    TableName: "todos",
    Item
  }).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo criado com sucesso!",
      todo: Item
    })
  }
} 