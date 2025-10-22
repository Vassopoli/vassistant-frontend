import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  const authorization = request.headers.get('Authorization');
  const apiEndpoint = process.env.API_ENDPOINT;

  if (!apiEndpoint) {
    return NextResponse.json({ message: 'API endpoint is not configured' }, { status: 500 });
  }

  if (!authorization) {
    return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
  }

  try {
    const response = await fetch(`${apiEndpoint}/default/VassistantBackendProxy/financial/groups/${params.groupId}/expenses`, {
      method: 'GET',
      headers: {
        Authorization: authorization,
      },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        return NextResponse.json({ message: `Backend error: ${errorBody}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('API Route Error:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: `An error occurred: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  const authorization = request.headers.get('Authorization');
  const apiEndpoint = process.env.API_ENDPOINT;

  if (!apiEndpoint) {
    return NextResponse.json({ message: 'API endpoint is not configured' }, { status: 500 });
  }

  if (!authorization) {
    return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { description, amount, category, paidBy, dateTime, participants, splitType } = body;

    const response = await fetch(`${apiEndpoint}/default/VassistantBackendProxy/financial/groups/${params.groupId}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify({
        description,
        amount,
        category,
        paidBy,
        dateTime,
        participants,
        splitType
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        return NextResponse.json({ message: `Backend error: ${errorBody}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('API Route Error:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: `An error occurred: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
