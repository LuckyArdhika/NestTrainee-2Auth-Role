import { LogLevel } from '@nestjs/common';

export interface ConfigDatabaseInterface {
  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  logging: boolean;
  debug: boolean;
  jwtkey: string;
}

export interface ConfigJWTInterface {
  jwt_access_token_exp_in_sec: number;
  jwt_refresh_token_exp_in_sec: number;
  jwt_secret_key: string;
}

export interface ConfigUpload {
  upload_location: string;
}

// my own jwt token
export interface JWTInterface {
  id: number;
  name: string;
  iat: number;
}
