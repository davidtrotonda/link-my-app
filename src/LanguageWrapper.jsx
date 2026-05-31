import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  detectBrowserLanguage,
  getLanguageFromPath,
  isLocalizableRoute,
  localizePath,
  normalizeLanguage,
} from './lib/i18nRoutes.js';

export function LanguageWrapper() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathLanguage = getLanguageFromPath(location.pathname);

    if (pathLanguage) {
      if (normalizeLanguage(i18n.language) !== pathLanguage) {
        i18n.changeLanguage(pathLanguage);
      }
      return;
    }

    const detectedLanguage = detectBrowserLanguage();
    const currentPath = `${location.pathname}${location.search}${location.hash}`;

    if (isLocalizableRoute(location.pathname)) {
      const localizedPath = localizePath(currentPath, detectedLanguage);

      if (localizedPath !== currentPath) {
        navigate(localizedPath, { replace: true });
        return;
      }
    }

    if (normalizeLanguage(i18n.language) !== detectedLanguage) {
      i18n.changeLanguage(detectedLanguage);
      return;
    }
  }, [location.pathname, location.search, location.hash, i18n, navigate]);

  return <Outlet />;
}
