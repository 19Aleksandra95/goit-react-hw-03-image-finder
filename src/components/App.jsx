import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import fetchImages  from './services/api';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    galleryPage: 1,
    error: null,
    isLoading: false,
    showModal: null,
    totalHits: null,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const prevSearch = prevState.searchRequest;
  //   const currentSearch = this.state.searchRequest;
  //   const prevGalleryPage = prevState.galleryPage;
  //   const currentGalleryPage = this.state.galleryPage;

  //   if (
  //     prevSearch !== currentSearch ||
  //     prevGalleryPage !== currentGalleryPage
  //   ) {
  //     this.updateImages();
  //   }
  // }

  // updateImages() {
  //   const { searchRequest, galleryPage } = this.state;
  //   this.setState({ isLoading: true });
  //   setTimeout(() => {
  //     try {
  //       fetchImages(searchRequest, galleryPage).then(data => {
  //         console.log(data);
  //         if (data.totalHits === 0) {
  //           return toast.error(
  //             'There is no images found with that search request'
  //           );
            
  //         }
  //         const mappedImages = data.data.hits.map(
  //           ({ id, webformatURL, tags, largeImageURL }) => ({
  //             id,
  //             webformatURL,
  //             tags,
  //             largeImageURL,
  //           })
  //         );
  //         this.setState({
  //           images: [...this.state.images, ...mappedImages],
  //           totalHits: data.totalHits,
  //         });
  //       });
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }, 1000);
  // }

  componentDidUpdate(_, prevState) {
    const { searchRequest, galleryPage } = this.state;

    if (prevState.searchRequest !== searchRequest || prevState.galleryPage !== galleryPage) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchRequest, galleryPage } = this.state;

    this.setState({ isLoading: true, error: null });
    fetchImages(searchRequest, galleryPage)
      .then(data => {
        console.log(data);
        if (data.totalHits === 0) {
          Notiflix.Report.info('Wrong 😪', 'Try again');
        }
        this.setState(prevState => ({
          images:
            this.state.galleryPage === 1
              ? data.hits
              : [...prevState.images, ...data.hits],
          totalHits: data.totalHits,
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = searchRequest => {
    this.setState({
      searchRequest,
      images: [],
      galleryPage: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
    console.log(this.state.galleryPage)
  };

  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  render() {
    const { images, isLoading, error, showModal, totalHits } = this.state;
    return (
      <>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
          <ImageGallery images={images} handlePreview={this.showModalImage} />
        {isLoading && <Loader color={'#1dbc52'} size={32} />}
        {totalHits>images.length && (
        <Button loadMore={this.loadMore} />
        )}
        {showModal && (
          <Modal
            lgImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={this.closeModalImage}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
