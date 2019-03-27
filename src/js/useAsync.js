import { useEffect, useState } from 'react';

/**
 * @typedef APIEntity
 * @type {object}
 * @property endpoiont api의 엔드포인트
 * @property defaultState 기본값
 *
 * 마운트 되자마자 호출되는 비동기
 * @param {APIEntity} entity api 호출부분과 파라미터
 * @param defaultState 기본 파라미터
 */
const useAsync = (entity, defaultState) => {
  const [status, setStatus] = useState('INIT');
  const [data, setData] = useState(defaultState);

  useEffect(() => {
    const { endpoint, params } = entity;
    setStatus('WAITING');
    endpoint
      .apply(null, params || [])
      .then(res => {
        setData(res);
        setStatus('SUCCESS');
      })
      .catch(() => {
        setStatus('FAILURE');
      });
  }, []);

  return [status, data];
};

export default useAsync;
