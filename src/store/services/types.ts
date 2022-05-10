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
