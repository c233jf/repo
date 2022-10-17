import defaultSettings from '../settings'

export function getPageTitle(pageTitle?: string) {
  return pageTitle
    ? `${pageTitle} - ${defaultSettings.title}`
    : defaultSettings.title
}
