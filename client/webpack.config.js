import { resolve } from 'path';

export const entry = './src/index.js';
export const output = {
  path: resolve(__dirname, 'dist'), // Output directory
  filename: 'bundle.js', // Output file name
};
export const module = {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'source-map-loader',
          options: {
            // Add any options if needed
          },
        },
      ],
      enforce: 'pre', // Ensure this runs before other loaders
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    // Add other loaders/rules as needed
  ],
};
export const devtool = 'source-map';
