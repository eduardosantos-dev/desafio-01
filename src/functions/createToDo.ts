import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuidv4 } from "uuid";

interface ICreateToDo {
  id: uuidv4;
  title: string;
  done: boolean;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateToDo;

  try {
    await document
      .put({
        TableName: "todos",
        Item: {
          id: uuidv4(),
          user_id,
          title,
          done: false,
          deadline: new Date(deadline),
        },
      })
      .promise();
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ message: err }),
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "To do criado com sucesso!",
    }),
  };
};
