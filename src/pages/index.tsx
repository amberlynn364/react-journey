import { useSearchParams } from 'next/navigation';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { ApiResponse, ApiUrls } from '../services/types';
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from '../constants/constants';
import SideCardDetails from '../components/SideCardDetails/SideCardDetails';
import Home from '../components/Home/Home';

export const getServerSideProps = (async ({ query }) => {
  const { page, pageSize } = query;
  const res = await fetch(
    `${ApiUrls.DefaultUrl}?page=${page || FIRST_PAGE}&pageSize=${
      pageSize || DEFAULT_PAGE_SIZE
    }&select=id,name,images`
  );
  const data = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: ApiResponse;
}>;

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchParams = useSearchParams();
  return (
    <main>
      <Home data={data} />
      {searchParams.get('details') && <SideCardDetails />}
    </main>
  );
}
