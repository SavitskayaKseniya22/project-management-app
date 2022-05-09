export interface SignupProps {
  name: string;
  login: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  name: string;
  login: string;
}

async function signup({ name, login, password }: SignupProps): Promise<SignupResponse> {
  const response = await fetch(`${process.env.API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  });

  const data: SignupResponse = await response.json();

  return data;
}

export default signup;
