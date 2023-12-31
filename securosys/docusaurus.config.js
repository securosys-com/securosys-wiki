// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Securosys - Transaction Security Broker',
  tagline: 'The complete reference for Transaction Security Broker',
  favicon: 'img/favicon.ico',  

  // Set the production url of your site here
  url: 'https://doc.cloudshsm.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'securosys-com', // Usually your GitHub org/user name.
  projectName: 'TransactionSecurityBroker', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {          
          sidebarPath: require.resolve('./sidebars.js'),          
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],  

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: '',
          src: 'img/securosys_logo.svg',
        },        
        items: [
          {
            type: 'docsVersionDropdown',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            label: 'PrimusHSM',
            to: 'docs/HSM/Setup/UserGuide/0_GetStarted/HSM-Setup-v2-11-1',
            position: 'left',
            activeBaseRegex: '^(/[^/]+)?/get-started/.*',
          },
          {
            label: 'CloudsHSM',
            to: 'docs/CloudsHSM/Get-Started/TSB-Quickstart',
            position: 'left',
            activeBaseRegex: '^(/[^/]+)?/get-started/.*',
          },
          {
            label: 'TSB',
            to: 'docs/TSB/Get-Started/TSB-Quickstart',
            position: 'left',
            activeBaseRegex: '^(/[^/]+)?/get-started/.*',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/securosys-com',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/docs/intro',
              },
              {
                label: 'Tutorial',
                to: '/docs/TSB/Tutorials/SignRequest',
              },
              {
                label: 'Quickstart',
                to: '/docs/TSB/Get-Started/TSB-Quickstart',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Securosys Support',
                href: 'https://support.securosys.com/external',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://www.securosys.com/en/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/securosys-com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Securosys SA. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
      colorMode: {
        defaultMode: 'dark',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
    }),
};

module.exports = config;
