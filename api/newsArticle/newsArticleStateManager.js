// only use to update shipment state
const initialState = [];

const stateManager = (state = initialState, action) => {
  const { type, article = {} } = action;
  switch (type) {
    case "addArticle":
      return [article, ...state];
    case "getArticles":
      return [...article];
    case "updateArticle":
      return [
        ...state.filter((articleObj) => articleObj.artId != article.artId),
        article,
      ];

    default:
      return state;
  }
};

export default stateManager;
