import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import * as API from '../services/api';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query !== '') {
      addImages(query, page);
    }
  }, [query, page]);

  const addImages = async (query, page) => {
    try {
      setIsLoading(true);
      const images = await API.loadImage(query, page);

      setItems(prevState => [...prevState, ...images]);
      setIsLoading(false);

      if (images.length === 0) {
        alert(
          "Sorry, we can't find anyting for your request. Please, enter another request"
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onModalClose = () => {
    setCurrentLargeImageURL('');
  };

  const onFormSubmit = newQuery => {
    if (newQuery.trim().length === 0) {
      alert('Please, enter request');
      return;
    }
    if (query !== newQuery) {
      setPage(1);
      setItems([]);
      setQuery(newQuery);
    }
  };

  const onLoadMoreButton = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={onFormSubmit} isLoading={isLoading} />
      {error && <p>{error}</p>}
      {items.length > 0 && (
        <ImageGallery items={items} onClick={setCurrentLargeImageURL} />
      )}
      {isLoading && (
        <ThreeDots height="50" width="50" color="#303f9f" ariaLabel="loading" />
      )}
      {items.length > 0 && (
        <Button onLoadMore={onLoadMoreButton} isLoading={isLoading} />
      )}
      {currentLargeImageURL && (
        <Modal closeModal={onModalClose} url={currentLargeImageURL} />
      )}
    </Container>
  );
}
