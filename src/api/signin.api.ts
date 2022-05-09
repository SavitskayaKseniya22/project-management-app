export interface SigninProps {
  login: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}

async function signin({ login, password }: SigninProps): Promise<SigninResponse> {
  const response = await fetch(`${process.env.API_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    }),
  });

  const data: SigninResponse = await response.json();

  return data;
}

export default signin;
