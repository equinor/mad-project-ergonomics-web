export const getText = (o) => {
  if (!o) return 'You need to give this method some object...';
  return o.currentTranslation ? o.currentTranslation.text : null;
};

export const getPlaceholderText = (o) => {
  if (!o) return 'You need to give this method some object...';
  return o.suggestedTranslation ? `${o.suggestedTranslation.text} (${o.suggestedTranslation.languageCode})` : null;
};
