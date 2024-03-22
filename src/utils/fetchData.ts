import ShowErrorMessage from '../components/ShowErrorMessage/ShowErrorMessage';

interface Props {
  url: string;
  options: {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  };
}

const fetchData = async ({ url, options }: Props) => {
  const response = await fetch(url, options).then((data) => {
    if (!data.ok) ShowErrorMessage(data.status);
    return data;
  });
  return response.json();
};

export default fetchData;
