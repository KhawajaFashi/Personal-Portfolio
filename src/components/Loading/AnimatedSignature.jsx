import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedSignature = () => {
    const ref = useRef(null);
    const isVisible = useInView(ref);
    const signatureContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const draw = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(0, 0, 0, 0)", // Start with transparent fill
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: "rgba(0, 0, 0, 1)", // Transition to red fill
            transition: {
                pathLength: {
                    delay: 0.2,
                    duration: 5.5,
                },
                fill: {
                    delay: 3, // Start filling after the drawing animation
                    duration: 1,
                    ease: "easeInOut",
                },
            },
        },
    };
    return (

        <motion.div ref={ref}>
            <motion.svg
                // SVG properties
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="451.000000pt" height="112.000000pt" viewBox="0 0 451.000000 112.000000"
                preserveAspectRatio="xMidYMid meet"
                initial="hidden"
                animate={isVisible ? 'visible' : 'initial'}
                variants={signatureContainer}
            >
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'black', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'black', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <g transform="translate(0.000000,112.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <motion.path d="M1431 1095 c-78 -37 -157 -105 -325 -280 -167 -175 -191 -193 -234
                        -171 -15 8 -44 17 -65 21 l-37 7 52 62 c142 167 204 216 277 216 50 0 46 19
                        -4 21 -17 1 -69 15 -117 30 -119 39 -206 46 -286 24 -70 -20 -174 -82 -191
                        -114 -10 -18 -13 -19 -42 -4 -44 22 -131 12 -198 -22 -61 -30 -141 -101 -181
                        -160 -90 -132 -91 -294 -3 -375 32 -29 34 -30 12 -5 -48 54 -63 95 -63 166 0
                        114 79 240 202 322 86 59 161 83 211 71 24 -7 35 -15 32 -24 -2 -8 -6 -35 -8
                        -60 -4 -36 -1 -50 16 -70 l22 -25 -14 30 c-31 67 16 138 132 198 71 38 146 57
                        217 57 53 0 174 -29 174 -41 0 -5 -6 -9 -13 -9 -24 0 -151 -96 -207 -156 -30
-33 -92 -109 -137 -168 l-83 -109 -1 39 0 39 -14 -42 c-31 -100 -105 -182
-213 -235 -37 -18 -64 -23 -124 -23 -43 0 -70 -3 -62 -8 23 -13 147 -9 192 6
23 8 42 13 42 11 0 -9 -90 -54 -111 -55 -22 0 -23 -1 -4 -9 35 -15 87 -11 134
12 61 29 137 108 245 255 l89 122 28 -15 c15 -8 52 -14 82 -14 102 0 112 -49
36 -181 -86 -149 -78 -223 28 -275 88 -44 170 -37 548 42 186 39 243 47 370
51 100 4 164 1 193 -6 l44 -12 -45 -29 c-47 -30 -71 -55 -41 -43 17 6 17 5 1
-17 -25 -37 -22 -96 6 -115 38 -24 86 -4 151 65 31 33 56 63 56 67 0 15 222
352 254 385 30 32 33 39 9 32 -10 -3 -6 2 8 10 35 21 45 47 23 63 -25 18 -31
16 -38 -13 -4 -16 -18 -30 -38 -38 l-31 -13 29 -11 29 -10 -30 -1 c-74 -2
-137 -38 -167 -95 -10 -18 -8 -18 17 2 27 22 103 48 112 39 2 -3 -11 -23 -31
-44 -19 -21 -68 -91 -109 -155 l-75 -117 -22 24 c-20 22 -21 24 -3 28 10 3 5
5 -12 4 -16 -1 -54 7 -83 17 l-54 18 30 18 c16 10 33 23 36 29 11 17 26 13 26
-7 0 -26 20 -42 49 -41 l26 0 -24 10 c-37 15 -24 51 62 172 24 34 35 59 31 70
-9 24 -19 21 -34 -10 -12 -28 -12 -28 -21 -6 -4 12 -20 25 -35 29 -81 20 -229
-141 -211 -232 4 -21 1 -24 -24 -24 -50 0 -38 35 46 140 66 82 75 100 75 146
l0 38 -27 -52 c-16 -28 -68 -99 -116 -158 -57 -68 -81 -104 -68 -99 13 4 21 2
21 -6 0 -8 -10 -9 -31 -5 -17 3 -38 6 -45 6 -20 0 -17 34 6 80 21 41 45 65 33
33 -9 -25 133 153 162 202 13 22 26 54 30 70 6 29 6 29 -7 8 -8 -13 -61 -71
-118 -130 -58 -60 -118 -128 -134 -153 -46 -69 -87 -110 -113 -110 -39 0 -30
42 23 110 118 148 126 160 142 210 l12 35 -37 -45 c-21 -25 -67 -77 -104 -115
-36 -39 -73 -82 -83 -97 -19 -29 -39 -101 -26 -93 4 3 13 -2 20 -10 18 -22 52
-18 92 9 34 23 35 23 47 4 7 -11 11 -21 9 -23 -2 -1 -31 -7 -65 -14 -34 -7
-133 -32 -219 -56 -86 -25 -159 -45 -162 -45 -4 0 7 12 24 27 17 16 23 23 14
16 -42 -33 -118 -56 -197 -61 -46 -2 -83 -1 -83 3 0 5 49 58 109 120 119 122
154 176 149 233 -4 44 -29 53 -80 28 -17 -9 -32 -16 -34 -16 -1 0 25 41 57 90
73 111 83 134 68 162 -11 21 -13 20 -31 -18 -35 -68 -225 -349 -273 -402 -44
-49 -50 -72 -20 -72 7 0 25 15 40 32 l28 33 -7 -35 c-6 -30 -2 -26 29 29 47
83 110 168 134 181 31 16 51 12 51 -10 0 -29 -27 -91 -38 -88 -10 3 -165 -190
-188 -234 -8 -15 -19 -28 -25 -28 -20 0 -69 31 -79 49 -24 47 -13 87 68 236 9
17 16 47 16 68 1 32 -6 45 -36 72 l-37 34 57 31 c40 23 114 90 252 230 198
202 235 230 301 230 45 0 98 -28 105 -56 3 -13 10 -24 14 -24 18 0 -4 42 -33
62 -47 33 -120 35 -186 3z m-567 -465 c7 -7 0 -10 -21 -10 -38 0 -63 9 -63 22
0 13 69 3 84 -12z m1286 -122 c0 -13 -5 -30 -10 -38 -8 -12 -10 -10 -10 10 -1
16 -9 2 -22 -38 -15 -46 -32 -72 -64 -102 -114 -105 -103 19 11 137 56 58 95
70 95 31z m0 -330 c0 -19 -70 -97 -101 -114 -17 -8 -39 -12 -51 -9 -34 11 -16
62 42 118 49 48 49 48 80 32 16 -8 30 -21 30 -27z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw}
                    />
                    <motion.path d="M3770 991 c-14 -5 -45 -19 -70 -32 -40 -20 -59 -23 -165 -24 -66 0
-138 -6 -160 -12 -72 -22 -146 -75 -185 -131 -27 -39 -54 -63 -101 -90 -89
-50 -173 -136 -210 -216 -26 -56 -30 -75 -27 -131 1 -36 -1 -65 -6 -65 -4 0
-25 17 -46 38 -114 114 -54 323 138 484 91 77 200 115 253 89 23 -12 23 -12 4
4 -31 26 -129 15 -196 -21 -64 -35 -155 -122 -198 -189 -47 -75 -75 -174 -68
-245 l6 -57 -49 -52 c-53 -55 -32 -52 24 4 l34 33 23 -36 c13 -20 40 -47 59
-59 19 -13 48 -33 64 -46 46 -35 63 -42 38 -15 l-23 25 61 6 c33 4 77 13 97
22 l38 15 -30 -25 c-16 -14 -42 -28 -57 -32 -38 -8 -25 -23 20 -23 74 0 168
74 278 216 l55 71 63 6 c75 7 161 43 196 83 24 27 23 27 -12 -3 -42 -35 -84
-50 -172 -60 -69 -7 -71 -15 22 110 37 48 71 86 77 83 66 -25 302 -33 324 -11
7 7 -15 9 -67 6 -81 -4 -242 15 -242 29 0 5 23 36 51 70 l51 61 47 -7 c58 -8
137 -38 134 -50 -1 -5 -5 -17 -8 -26 -6 -14 -2 -18 19 -18 57 0 160 53 192 98
12 17 8 18 -44 15 -35 -3 -101 5 -171 20 l-113 24 33 21 c19 11 51 24 72 27
27 5 35 10 25 16 -16 10 -44 10 -78 0z m-356 -100 c-52 -19 -114 -49 -114 -55
0 -2 28 5 63 16 34 10 98 22 141 25 90 7 89 12 12 -79 l-38 -45 -87 4 c-57 3
-108 0 -151 -10 -36 -9 -66 -14 -68 -12 -8 8 30 65 63 93 59 52 127 80 200 80
25 0 22 -2 -21 -17z m29 -174 c-4 -7 -37 -53 -72 -100 -54 -74 -67 -86 -85
-81 -41 12 -81 41 -103 74 -13 18 -23 28 -23 23 0 -24 49 -78 88 -98 l43 -22
-41 -49 c-52 -63 -142 -138 -199 -165 -25 -11 -69 -23 -99 -26 -64 -7 -72 1
-72 67 0 137 182 303 400 364 102 28 176 34 163 13z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M4249 758 c-21 -50 -221 -347 -273 -405 -44 -49 -52 -73 -23 -73 6 0
24 12 39 27 l28 27 -6 -34 c-6 -29 -1 -23 28 31 42 80 111 175 137 189 52 27
70 -16 31 -75 -11 -16 -20 -26 -20 -21 0 4 -39 -40 -86 -99 -80 -100 -133
-189 -120 -202 3 -4 6 -1 6 7 0 7 53 67 118 134 66 66 124 131 131 144 6 12
18 22 26 22 12 0 11 -7 -5 -37 -53 -100 10 -150 101 -81 41 33 91 92 60 73 -8
-4 -27 -23 -43 -40 -35 -40 -84 -63 -100 -47 -16 16 11 71 67 137 55 64 78
107 64 116 -15 9 -49 -1 -49 -13 0 -18 -38 -63 -69 -81 l-30 -18 6 50 c5 47 4
50 -20 56 -16 4 -39 1 -58 -9 -18 -9 -33 -16 -35 -16 -1 0 23 37 53 83 71 106
87 141 73 167 -14 26 -15 26 -31 -12z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M4419 624 c-7 -14 -26 -28 -43 -33 -25 -7 -28 -10 -13 -16 27 -11 86
4 97 25 15 27 12 37 -9 43 -13 3 -23 -3 -32 -19z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M3959 545 c-27 -14 -50 -61 -64 -125 -13 -60 -42 -106 -76 -120 -38
-16 -61 -5 -65 31 -4 27 9 47 46 72 35 24 4 21 -36 -3 -33 -21 -44 -40 -49
-86 -2 -20 3 -25 31 -30 67 -12 146 19 180 71 10 15 21 51 26 81 12 81 45 122
83 108 21 -8 19 -18 -10 -52 -23 -28 -24 -30 -5 -25 33 9 61 52 49 74 -12 23
-71 25 -110 4z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M1412 533 c-63 -31 -141 -143 -142 -204 0 -56 61 -62 120 -13 l29 25
13 -28 c9 -20 21 -29 43 -30 27 -2 28 -2 8 7 -13 5 -23 15 -23 22 1 24 37 94
67 129 40 45 54 74 47 93 -9 23 -19 20 -34 -11 -9 -20 -14 -24 -17 -13 -14 41
-57 50 -111 23z m88 -25 c0 -13 -5 -30 -10 -38 -8 -12 -10 -10 -11 10 0 20 -3
17 -13 -15 -20 -63 -42 -99 -81 -134 -67 -59 -93 -31 -49 54 50 99 164 184
164 123z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M2538 530 c-91 -48 -169 -202 -123 -240 20 -17 84 1 110 30 22 25 35
26 35 2 0 -26 20 -42 49 -41 26 0 26 0 4 9 -13 5 -23 15 -23 22 1 24 37 94 67
129 40 45 54 74 47 93 -9 23 -19 20 -34 -11 -9 -20 -14 -24 -17 -13 -14 42
-58 50 -115 20z m92 -22 c0 -13 -5 -30 -10 -38 -8 -12 -10 -10 -10 10 -1 16
-9 2 -22 -38 -15 -46 -32 -72 -64 -102 -113 -104 -105 17 8 134 59 61 98 74
98 34z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M3612 533 c-65 -32 -147 -154 -140 -209 6 -53 59 -57 117 -9 l30 26
13 -28 c9 -20 21 -29 43 -30 28 -3 29 -2 6 7 -37 16 -24 52 62 173 24 34 35
59 31 70 -9 24 -19 21 -34 -10 -9 -20 -14 -24 -17 -13 -14 41 -57 50 -111 23z
m88 -25 c0 -13 -5 -30 -10 -38 -8 -12 -10 -12 -11 5 0 11 -9 -6 -20 -37 -14
-40 -33 -69 -64 -97 -113 -105 -107 16 7 133 59 61 98 74 98 34z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M2214 343 c-34 -42 -36 -45 -10 -25 33 25 61 61 53 68 -2 2 -22 -17
-43 -43z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M3788 373 c-23 -27 -30 -43 -20 -43 11 0 46 50 39 56 -2 2 -11 -4
-19 -13z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M4215 240 c3 -5 8 -10 11 -10 2 0 4 5 4 10 0 6 -5 10 -11 10 -5 0 -7
-4 -4 -10z"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        fill="none"
                        variants={draw} />
                    <motion.path d="M4275 240 c-2 -3 5 -6 15 -7 11 -1 22 2 24 5 3 4 -4 8 -15 8 -11 0
-22 -3 -24 -6z"
                        stroke="url(#gradient)"
                        strokeWidth={1}
                        fill="none"
                        variants={draw} />

                </g>
            </motion.svg>
        </motion.div>
    )
}

export default AnimatedSignature