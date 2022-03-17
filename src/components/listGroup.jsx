const ListGroup = (props) => {
  const { genreList, onGenreSelect, selectedGenre, idProperty, textProperty } =
    props;
  return (
    <ul className='list-group'>
      {genreList.map((genre, index) => (
        <li
          className={
            genre === selectedGenre
              ? 'list-group-item active'
              : 'list-group-item'
          }
          style={{ cursor: 'pointer' }}
          onClick={() => onGenreSelect(genre)}
          key={genre[idProperty] || genre.key}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  idProperty: '_id',
};

export default ListGroup;
