import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = ({ images }: any) => {
  return (
    <div>
      <ImageList sx={{ width: '100%', height: 500 }} cols={3} rowHeight={164}>
        {images.map((image: string) => (
          <ImageListItem key={image}>
            <img
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              alt='Imagen de la nota'
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
