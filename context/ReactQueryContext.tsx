'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            /**
             * validade do cache
             */
            staleTime: 1000 * 60 * 10, // 10 minutos
            /**
             * quantidade de vezes que vai tentar fazer a requisição novamente
             * caso ocorra alguma falha
             */
            retry: 1,
          },
        },
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
