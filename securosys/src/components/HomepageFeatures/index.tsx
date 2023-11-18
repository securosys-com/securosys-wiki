import React, { FC }from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import './styles.css';

interface HomepageSectionProps {
  header?: string;
  description?: string;
  className?: string;
}

const HomepageSection: FC<HomepageSectionProps> = (props) => {
  const toKebabCase = (header) =>
    header &&
    header
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map((parts) => parts.toLowerCase())
      .join('-');

  return (
    <div className={clsx('homepage__section', props.className)}>
      <div className='homepage__container'>
        {props.header && (
          <h2 className='homepage__header' id={toKebabCase(props.header)}>
            {props.header}
          </h2>
        )}
        {props.description && (
          <p className='homepage__description'>{props.description}</p>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default function HomepageFeatures() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <div className='homepage'>
        <HomepageSection className='homepage__section--intro'>
          <div className='intro'>
            <div className='intro__section'>
              <h1 className='intro__header'>{siteConfig.tagline}</h1>
              <p className='intro__description'>
                Build apps capable of taking millions of users on journeys
                with Unique transaction security for financial and digital assets applications. 
                Simple. Scalable. Secure.
              </p>
              <div className='intro__buttons'>
                <Link
                  to='/docs/intro'
                  className='intro__button button button--outline button--primary'
                >
                  Introduction
                </Link>
                <Link
                  to='/docs/category/transaction-security-broker'
                  className='intro__button button button--primary'
                >
                  Start building
                </Link>
              </div>
            </div>
          </div>
        </HomepageSection>
        <HomepageSection header='Use PrimusHSM REST-API'>
          <div className='about__cards'>
            <Link
              to='/docs/intro'
              className='about__card'
            >
              <div className='about__section'>
                <h3 className='about__header'>What is TSB?</h3>
                <p className='about__description'>
                  Use Rest Technology to integrate with HSM security. 
                  The SKA-enabled Securosys HSM provides the most granular control over key actions and operations.
                </p>
              </div>
            </Link>
            <Link
              to='docs/intro'
              className='about__card'
            >
              <div className='about__section'>
                <h3 className='about__header'>What is HSM?</h3>
                <p className='about__description'>
                 Securosys HSMs provide control of the keys usage with specific and sophisticated authorizations, 
                 which is essential for the security of modern financial applications.
                </p>
              </div>
            </Link>
            <Link to='/docs/DeveloperProgram' className='about__card'>
              <div className='about__section'>
                <h3 className='about__header'>Pick Developer Account</h3>
                <p className='about__description'>
                  Signup for a developer account to start interacting with your public and private keys stored on a HSM.
                </p>
              </div>
            </Link>
          </div>
        </HomepageSection>
      </div>
    </Layout>
  );
}
