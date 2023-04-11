import React, { useMemo } from 'react';
import { sanitize } from 'isomorphic-dompurify';
import { dateIsBetween } from '../../../util/dateIsBetween';
import { isAbsoluteUrl } from '../../../util/isAbsoluteUrl';
import styles from './index.module.scss';
import { WebsiteBanner } from '../../../types';
import { useIntl } from 'react-intl';

export interface BannerProps {
  bannersIndex: WebsiteBanner;
}

const useTextContent = ({ text, link }: WebsiteBanner, bannerBtnText: string) =>
  useMemo(() => {
    if (text) {
      return (
        <p>
          <a
            href={link}
            className={styles.bannerBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            {bannerBtnText || 'Read More'}
          </a>
          {text}
        </p>
      );
    }

    return null;
  }, [text, link, bannerBtnText]);

const useHtmlContent = ({ html, link }: WebsiteBanner) =>
  useMemo(() => {
    if (html) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{ __html: sanitize(html) }}
        />
      );
    }

    return null;
  }, [html, link]);

const Banner = ({ bannersIndex }: BannerProps) => {
  const { formatMessage } = useIntl();

  const bannerBtnText = formatMessage({
    id: 'components.common.banner.button.text',
  });

  const showBanner = dateIsBetween(
    bannersIndex.startDate,
    bannersIndex.endDate
  );

  const link = !isAbsoluteUrl(bannersIndex.link)
    ? `http://nodejs.org/${bannersIndex.link}`
    : bannersIndex.link;

  const textContent = useTextContent({ ...bannersIndex, link }, bannerBtnText);
  const htmlContent = useHtmlContent({ ...bannersIndex, link });

  if (showBanner) {
    return (
      <div className={styles.banner}>
        {bannersIndex.text ? textContent : htmlContent}
      </div>
    );
  }

  return null;
};

export default Banner;