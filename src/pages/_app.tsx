import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

import Layout from '@modules/layout/containers/Layout';
import Web3Wrapper from '@modules/web3/containers/Web3Wrapper';

import '@modules/look/styles/_resources.scss';

// export function reportWebVitals(metric) {
//   // console.log(metric)
// }

function MyApp({ Component, pageProps }: any) {
  // React query for SSR
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <Web3Wrapper>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Web3Wrapper>
  );
}

export default MyApp;
