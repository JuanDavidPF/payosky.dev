import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/PayoskyStudio/Build/PayoskyStudio.wasm.br",
                headers: [
                    {
                        key: "Content-Type",
                        value: "application/wasm",
                    },
                    {
                        key: "Content-Encoding",
                        value: "br",
                    },
                ],
            },
            {
                source: "/PayoskyStudio/Build/PayoskyStudio.framework.js.br",
                headers: [
                    {
                        key: "Content-Type",
                        value: "application/javascript",
                    },
                    {
                        key: "Content-Encoding",
                        value: "br",
                    },
                ],
            },
            {
                source: "/PayoskyStudio/Build/PayoskyStudio.data.br",
                headers: [
                    {
                        key: "Content-Type",
                        value: "application/octet-stream",
                    },
                    {
                        key: "Content-Encoding",
                        value: "br",
                    },
                ],
            },
        ];
    },

    async redirects() {
        return [
            /*
             * ---------------------------------------------------------
             * LOCAL DEVELOPMENT
             * ---------------------------------------------------------
             *
             * es.localhost:3000/foo
             *      ↓
             * localhost:3000/foo?__locale_handoff=es
             */

            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "es.localhost",
                    },
                ],
                destination:
                    "http://localhost:3000/:path*?__locale_handoff=es",
                permanent: false,
            },

            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "en.localhost",
                    },
                ],
                destination:
                    "http://localhost:3000/:path*?__locale_handoff=en",
                permanent: false,
            },

            /*
             * ---------------------------------------------------------
             * PRODUCTION LOCALE SUBDOMAINS
             * ---------------------------------------------------------
             *
             * www.es.payosky.dev/foo
             *      ↓
             * www.payosky.dev/foo?__locale_handoff=es
             */

            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "www.es.payosky.dev",
                    },
                ],
                destination:
                    "https://www.payosky.dev/:path*?__locale_handoff=es",
                permanent: false,
            },

            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "www.en.payosky.dev",
                    },
                ],
                destination:
                    "https://www.payosky.dev/:path*?__locale_handoff=en",
                permanent: false,
            },

            /*
             * Also support locale subdomains without www.
             */

            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "es.payosky.dev",
                    },
                ],
                destination:
                    "https://www.payosky.dev/:path*?__locale_handoff=es",
                permanent: false,
            },

            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "en.payosky.dev",
                    },
                ],
                destination:
                    "https://www.payosky.dev/:path*?__locale_handoff=en",
                permanent: false,
            },

            /*
             * ---------------------------------------------------------
             * CANONICAL DOMAIN
             * ---------------------------------------------------------
             *
             * payosky.dev/foo
             *      ↓
             * www.payosky.dev/foo
             */

            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "payosky.dev",
                    },
                ],
                destination:
                    "https://www.payosky.dev/:path*",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;