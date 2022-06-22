import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuidv4 } from "uuid";

interface IToDos {
  id: uuidv4;
  user_id: uuidv4;
  title: string;
  done: boolean;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: { ":user_id": user_id },
    })
    .promise();

  const todos = response.Items as IToDos[];

  return {
    statusCode: 200,
    body: JSON.stringify({ todos }),
  };
};
