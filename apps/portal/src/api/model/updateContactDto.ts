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

export interface UpdateContactDto {
  /**
   * Должность пользователя
   */
  position?: string;
  /**
   * Вопросы, по которым можно обратиться
   */
  questions?: string;
  /**
   * id пользователя
   */
  userId?: number;
  /**
   * Уникальный идентификатор университета
   */
  universityId?: number;
}