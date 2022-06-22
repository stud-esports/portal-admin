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

export interface UpdateNewsDto {
  /**
   * Название
   */
  title: string;
  /**
   * Описание
   */
  description: string;
  /**
   * Основной текст
   */
  text: string;
  /**
   * url основной картинки
   */
  mainImageUrl: string;
  /**
   * id университета
   */
  universityId: number;
  /**
   * id автора
   */
  userId: number;
  /**
   * id события
   */
  eventId: number;
}
