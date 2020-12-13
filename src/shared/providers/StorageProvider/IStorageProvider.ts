interface IStorageProvider {
  saveFile(file: string): Promise<void>;
  deleteFile(file: string): Promise<void>;
  deleteTempFile(file: string): Promise<void>;
}

export default IStorageProvider;
