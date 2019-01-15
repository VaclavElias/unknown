export default abstract class Errors {
  public static readonly NoTransfomApi: string = 'The CSS transform API needed for this library to work is not available.\nQuiting now.';

  public static readonly NoEntities: string = 'No entities are loaded. Please add at least one before calling the start() method.';
}