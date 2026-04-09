module.exports = function (eleventyConfig) {

  // ── Assets statiques ─────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Copie src/static/* vers la racine du site (_site/)
  // → src/static/photos/ma-photo.jpg devient _site/photos/ma-photo.jpg
  // → URL publique : /Salon2/photos/ma-photo.jpg (avec pathPrefix)
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Passthrough explicite pour les photos uploadées via Sveltia CMS
  // (media_folder: "/src/static/photos" dans config.yml)
  // Redondant avec la ligne ci-dessus, mais garantit la copie même
  // si le dossier est créé après le premier build.
  eleventyConfig.addPassthroughCopy("src/static/photos");

  // ── Filtre : lien actif dans la nav ──────────────────────────
  eleventyConfig.addFilter("isActive", (navUrl, pageUrl) => {
    return pageUrl === navUrl || pageUrl.startsWith(navUrl + "/");
  });

  // ── Filtre : formatage de date pour blog ─────────────────────
  eleventyConfig.addFilter("date", (value, format) => {
    const d = new Date(value);
    if (isNaN(d)) return value;
    const mois = ["janvier","février","mars","avril","mai","juin",
                  "juillet","août","septembre","octobre","novembre","décembre"];
    const moisC = ["jan.","fév.","mars","avr.","mai","juin",
                   "juil.","août","sept.","oct.","nov.","déc."];
    const j = String(d.getDate()).padStart(2,"0");
    const m = d.getMonth();
    const a = d.getFullYear();
    switch(format) {
      case "DD MMMM YYYY": return j+" "+mois[m]+" "+a;
      case "DD MMM YYYY":  return j+" "+moisC[m]+" "+a;
      case "YYYY-MM-DD":   return a+"-"+String(m+1).padStart(2,"0")+"-"+j;
      default:             return j+" "+mois[m]+" "+a;
    }
  });

  return {
    pathPrefix: "/Salon2/",
    dir: { input:"src", output:"_site", includes:"_includes", data:"_data" },
    templateFormats: ["njk","html","md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
