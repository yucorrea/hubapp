class FavoriteError extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'FavoriteError'
  }
}

export default FavoriteError