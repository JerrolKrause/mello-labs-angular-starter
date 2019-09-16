/**
 *
 */
export const slugCreateUniqueId = (value: string, classRef: any) => {
  // Create a slug from the placeholder
  let slug = String(value)
    .trim()
    .toLowerCase()
    .replace(/ /gi, '-')
    .replace(/[^A-Z0-9-]/gi, '');
  // If a dictionary of unique ID's has not yet been created, add it
  if (!classRef.uniqueIds) {
    classRef.uniqueIds = {};
  }

  // Check if this slug is available in the dictionary
  // This logic checks for duplicate slugs and will increment them in order of occurence
  // Note that the order is preserved so that fields with same names will keep the same name
  if (!classRef.uniqueIds[slug]) {
    // Add a slug, set value to one for how many instances of this slug exists
    classRef.uniqueIds[slug] = 1;
  } else {
    // Increment existing slug then add new slug to dictionary
    classRef.uniqueIds[slug]++;
    slug = slug + '-' + classRef.uniqueIds[slug];
  }
  return slug;
};
