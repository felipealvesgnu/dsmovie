import axios from 'axios';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import { useEffect } from 'react';
import { useState } from 'react';
import { MoviePage } from 'types/movie';
import { BASE_URL } from 'utils/requests';

function Listing() {
  const [pageNumber, setPageNumber] = useState(0);
  const [page, setPage] = useState<MoviePage>({
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true,
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=title`) //ordena pelo sort
      .then((response) => {
        const data = response.data as MoviePage;
        setPage(data);
      });
  }, [pageNumber]); // O meu useEffect depende do {pageNumber}, ou seja qdo o ele mudar, será feita uma nova requisicao

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  }

  return (
    <>
      <Pagination page={page} onChange={handlePageChange}/>
      <div className="container">
        <div className="row">
          {page.content.map(movie => (
            <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3" /* o key é exigido pelo react p/ controle interno, adicionamos o id do obj */> 
              <MovieCard movie={movie} />
            </div>
          )
          )}
        </div>
      </div>
    </>
  );
}

export default Listing;
