import { Server } from 'node:http';
import { resolve } from 'node:path';
import {
  proxy,
  awsAlb,
  awsApiGatewayV1,
  awsApiGatewayV2,
} from 'h3-proxy';

const handlers = [awsAlb, awsApiGatewayV1, awsApiGatewayV2];

let server: Server | undefined;

const getRequestListener = async () => {
  const { handler } = await import(resolve('.next/standalone/server.js'));
  return handler;
};

export const handler = async (event: any, context: any) => {
  const requestListener = await getRequestListener();
  if (!server) {
    server = new Server(requestListener);
    server.listen(3000);
  }

  for (const handle of handlers) {
    const response = await handle(event, context, 'http://localhost:3000', {
      binary: true,
    });
    if (response) {
      return response;
    }
  }

  return proxy(event, 'http://localhost:3000', {
    binary: true,
  });
};