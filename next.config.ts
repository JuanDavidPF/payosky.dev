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
};

export default nextConfig;