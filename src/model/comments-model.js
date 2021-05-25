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

  deleteComment(update) {

    this._comments = this.getComments().filter((comment) => comment.id !== update.id);

    this._notify(update);
    return this._comments;
  }

  addComment(updateType, update) {
    this._tasks = [
      update,
      ...this._tasks,
    ];

    this._notify(updateType, update);
  }
}
