import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
// import PropTypes from 'prop-types;';

const ImageGallery = ({ images, handlePreview }) => {
    const renderGallery = () =>
      images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          className={css.ImageGalleryItem}
          key={id}
          tags={tags}
          smallImage={webformatURL}
          onClick={() => handlePreview(id)}
        />
      ));
      return (
        <div>
            <ul className={css.ImageGallery} > {images ? renderGallery() : null} </ul>
        </div>
      )
      }

      // ImageGallery.propTypes = {
      //   handlePreview: PropTypes.func.isRequired,
      //   images: PropTypes.arrayOf(
      //     PropTypes.shape({
      //       id: PropTypes.number.isRequired,
      //       webformatURL: PropTypes.string.isRequired,
      //       tags: PropTypes.string.isRequired,
      //     })
      //   ),
      // };
      
      export default ImageGallery;
