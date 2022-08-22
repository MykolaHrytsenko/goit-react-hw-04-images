import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <GalleryList>
      {items.map(item => {
        return <ImageGalleryItem key={item.id} item={item} onClick={onClick} />;
      })}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
