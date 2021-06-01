import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  deleteComment(id) {

    this._comments = this.getComments().filter((comment) => comment.id !== id);

    this._notify(id);
    return this._comments;
  }

  addComment( update) {
    this._comments = [
      update,
      ...this._comments,
    ];

    this._notify(update);
    return this._comments;
  }

  static adaptCommentToClient(comments) {
    return comments.map((comment) => {
      const adaptComment = Object.assign(
        {},
        comment,
        {
          id: comment.id,
          comment: comment.comment,
          emoji: comment.emotion,
          author: comment.author,
          date: new Date(),
        });

      delete adaptComment.emotion;
      return adaptComment;
    });
  }
}
