export const mergeContent = (fallback, db) => {
  if (!db) return fallback;
  const merged = { ...fallback };
  for (const key in db) {
    if (db[key] !== null && db[key] !== undefined) {
      if (Array.isArray(db[key]) && Array.isArray(fallback[key])) {
        merged[key] = fallback[key].map((fallbackItem, idx) => {
          const dbItem = db[key][idx];
          if (dbItem !== undefined && dbItem !== null) {
            if (typeof dbItem === "object" && typeof fallbackItem === "object") {
              return mergeContent(fallbackItem, dbItem);
            }
            return dbItem;
          }
          return fallbackItem;
        });
        // If the DB has more items than the fallback, append them
        if (db[key].length > fallback[key].length) {
          merged[key] = [...merged[key], ...db[key].slice(fallback[key].length)];
        }
      } else if (typeof db[key] === "object" && typeof fallback[key] === "object" && fallback[key] !== null) {
        merged[key] = mergeContent(fallback[key], db[key]);
      } else {
        merged[key] = db[key];
      }
    }
  }
  return merged;
};
