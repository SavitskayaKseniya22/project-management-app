export interface SigninQueryResponse {
  token: string;
}

export interface SigninQueryRequest {
  login: string;
  password: string;
}

export interface SignupQueryRequest extends SigninQueryRequest {
  name: string;
}

export interface SignupQueryResponse extends Omit<SigninQueryRequest, 'password'> {
  id: string;
  name: string;
}

export interface BoardListRequest {
  token: string;
}
