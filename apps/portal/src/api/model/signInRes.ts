/**
 * CyberSport Portal
 * Документация REST API
 *
 * OpenAPI spec version: 1.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { User } from './user';

export interface SignInRes {
  accessToken: string;
  refreshToken: string;
  user: User;
}