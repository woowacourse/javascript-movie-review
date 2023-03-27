import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { MovieList, MovieListProps } from '../MovieList';
import { SkeletonMovieList } from '../SkeletonMovieList';
import { setComponentList } from '../../core';
import { props } from 'cypress/types/bluebird';
import { Modal, ModalProps } from '../Modal';
import { MovieProps } from '../Movie';

const MovieChartActions = () => {
  const MovieListComponent = (props: MovieListProps) => {
    setComponentList(`#MovieList`, MovieList(props));

    return '';
  };

  const SkeletonMovieListComponent = () => {
    setComponentList(`#SkeletonList`, SkeletonMovieList({}));

    return '';
  };

  const ModalComponent = (props: ModalProps) => {
    setComponentList(`#Modal`, Modal(props));

    return '';
  };
  return { MovieListComponent, SkeletonMovieListComponent, ModalComponent };
};

export const { MovieListComponent, SkeletonMovieListComponent, ModalComponent } = MovieChartActions();
