const Like = ({ liked, onLikeClick }) => {
  let classes = 'fa fa-heart';

  if (!liked) classes += '-o';

  return (
    <i
      className={classes}
      onClick={onLikeClick}
      style={{ cursor: 'pointer' }}
    ></i>
  );
};

export default Like;
