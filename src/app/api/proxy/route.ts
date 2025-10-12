import { NextRequest, NextResponse } from 'next/server';

const handler = async (request: NextRequest) => {
  const authorization = request.headers.get('Authorization');
  const apiEndpoint = process.env.API_ENDPOINT;

  if (!apiEndpoint) {
    return NextResponse.json({ message: 'API endpoint is not configured' }, { status: 500 });
  }

  if (!authorization) {
    return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
  }

  try {
    const requestOptions: RequestInit = {
      method: request.method,
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    };

    if (request.method !== 'GET' && request.body) {
      requestOptions.body = await request.text();
    }

    const response = await fetch(apiEndpoint, requestOptions);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ message: `An error occurred: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
};

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
