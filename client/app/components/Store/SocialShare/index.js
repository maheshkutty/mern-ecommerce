/**
 *
 * SocialShare
 *
 */

import React from 'react';

import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton
} from 'react-share';

import { trackProductShared } from '../../../utils/rudderstack';

const SocialShare = props => {
  const { product } = props;

  const shareMsg = `I ♥ ${
    product.name
  } product on Rudderstack Store!  Here's the link, ${
    window.location.protocol !== 'https' ? 'http' : 'https'
  }://${window.location.host}/product/${product.slug}`;

  const handleShare = (method) => {
    trackProductShared(product, method);
  };

  return (
    <ul className='d-flex flex-row mx-0 mb-0 justify-content-center justify-content-md-start share-box'>
      <li>
        <FacebookShareButton 
          url={`${shareMsg}`} 
          className='share-btn facebook'
          onClick={() => handleShare('facebook')}
        >
          <i className='fa fa-facebook'></i>
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton 
          url={`${shareMsg}`} 
          className='share-btn twitter'
          onClick={() => handleShare('twitter')}
        >
          <i className='fa fa-twitter'></i>
        </TwitterShareButton>
      </li>
      <li>
        <EmailShareButton 
          url={`${shareMsg}`} 
          className='share-btn envelope'
          onClick={() => handleShare('email')}
        >
          <i className='fa fa-envelope-o'></i>
        </EmailShareButton>
      </li>
      <li>
        <WhatsappShareButton 
          url={`${shareMsg}`} 
          className='share-btn whatsapp'
          onClick={() => handleShare('whatsapp')}
        >
          <i className='fa fa-whatsapp'></i>
        </WhatsappShareButton>
      </li>
    </ul>
  );
};

export default SocialShare;
