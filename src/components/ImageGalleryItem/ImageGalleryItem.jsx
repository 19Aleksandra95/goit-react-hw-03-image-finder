import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, tags, onClick }) => {
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem_image}
          src={smallImage}
          alt={tags}
          onClick={onClick}
        />
      </li>
    );
  };
  
  ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    tags: PropTypes.string.isRequired,
    smallImage: PropTypes.string.isRequired,
  };
  
  export default ImageGalleryItem;