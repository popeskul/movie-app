import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CallApi from '../api/api';

export function useCast(query) {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CallApi.get(`/movie/${params.id}/${query}`)
      .then(collection => {
        switch (query) {
          case 'credits':
            return setData(collection.cast);
          default:
            return setData(collection.results);
        }
      })
      .then(() => setLoading(false));
  }, [params.id, query]);

  return [loading, data];
}
